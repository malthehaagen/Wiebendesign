/* =====================================================================
   Wieben Design — Standberegner
   Al logik. Priser i pricing.js, tekster i content.js.
   ===================================================================== */
(function () {
  'use strict';

  var P = window.WD_PRIS;
  var K = window.WD_CONFIG || {};
  var C = window.WD_INDHOLD;

  /* ---------- Sproglag ----------
     Sproget er dansk indtil den engelske fil findes; så sættes SPROG af
     adressen (/en/) eller ?lang=. Alt andet her behøver ikke vide det.  */
  var SPROG = 'da';
  var T = (window.WD_TEKST || {})[SPROG] || {};

  /* Slår en tekst op og erstatter {navn} med værdier. Hedder tx og ikke t,
     fordi flere løkker i filen bruger "var t" om et indholdsobjekt.
     En manglende nøgle vises som ⟨sti⟩ — så er den umulig at overse,
     både i browseren og i testene. */
  function tx(sti, v) {
    var dele = sti.split('.'), x = T, i;
    for (i = 0; i < dele.length; i++) x = x && x[dele[i]];
    if (typeof x !== 'string') return '\u27e8' + sti + '\u27e9';
    if (!v) return x;
    return x.replace(/\{(\w+)\}/g, function (helt, navn) {
      return v[navn] === undefined || v[navn] === null ? helt : String(v[navn]);
    });
  }

  /* Fylder de faste tekster i markuppen. data-t sætter tekst, data-t-html
     tillader <strong> og <a> fra vores egen sprogfil (aldrig kundeinput),
     og -alt/-aria/-placeholder sætter den tilsvarende attribut.
     Teksten står kun i sprogfilen, så der er én kilde — og en engelsk
     bruger ser ikke dansk blinke forbi, før den er fyldt ind. */
  function fyldTekster() {
    [['data-t', 'tekst'], ['data-t-html', 'html'], ['data-t-alt', 'alt'],
     ['data-t-aria', 'aria-label'], ['data-t-placeholder', 'placeholder']
    ].forEach(function (par) {
      Array.prototype.forEach.call(document.querySelectorAll('[' + par[0] + ']'), function (e) {
        var v = tx(e.getAttribute(par[0]));
        if (par[1] === 'tekst') e.textContent = v;
        else if (par[1] === 'html') e.innerHTML = v;
        else e.setAttribute(par[1], v);
      });
    });
    document.documentElement.lang = T.htmlLang || 'da';
  }

  var TRIN = T.trin || [];
  var GEM = 'wd-standberegner-v5';

  var s = {
    trin: 0,
    profil: { formaal: null, erfaring: null, ambition: null },
    messe: { land: 'dk', by: 'Herning', dato: '', km: 130, bro: false, ukendt: false },
    stand: {
      m2: 24, aabneSider: 1, vaegtype: 'print', vaeghoejde: 3,
      grafik: 'fuld', gulv: 'taeppe', haevet: false, belysning: 'forstaerket'
    },
    omraader: {},
    omraadeValg: null,
    omraaderRoert: false,
    tilkoeb: { skilt: false, rigLys: false, beplantning: false, led: false },
    led: 'l',
    omraadeAreal: 0,
    ugerTilMesse: null,
    grafikarbejde: 'delvis',
    sendt: false,
    team: { dage: 3 }
  };

  /* ---------- Intervalregning ---------- */
  var iv = {
    nul: function () { return [0, 0]; },
    tal: function (v) { return [v, v]; },
    add: function (a, b) { return [a[0] + b[0], a[1] + b[1]]; },
    sum: function (l) { return l.reduce(iv.add, iv.nul()); },
    gang: function (a, f) { return [a[0] * f, a[1] * f]; }
  };

  function afrund(v) { var r = P.meta.afrunding || 250; return Math.round(v / r) * r; }
  var nf = new Intl.NumberFormat(T.locale || 'da-DK');
  function kr(v) { return nf.format(afrund(v)); }
  function fmt(a) {
    if (!a || (!a[0] && !a[1])) return '—';
    if (afrund(a[0]) === afrund(a[1])) return kr(a[0]) + ' kr.';
    return kr(a[0]) + '–' + kr(a[1]) + ' kr.';
  }
  function fmtKort(a) {
    if (!a) return '—';
    if (afrund(a[0]) === afrund(a[1])) return kr(a[0]);
    return kr(a[0]) + '–' + kr(a[1]);
  }
  function dec(v) { return v.toLocaleString(T.locale || 'da-DK', { maximumFractionDigits: 1 }); }
  function el(h) { var d = document.createElement('div'); d.innerHTML = h.trim(); return d.firstElementChild; }
  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function vare(id) {
    var g, i, l;
    for (g in P.katalog) for (i = 0; i < P.katalog[g].length; i++) {
      l = P.katalog[g][i];
      if (l.id === id) return l;
    }
    return null;
  }

  /* =====================================================================
     BEREGNING
     ===================================================================== */
  function geometri() {
    var side = Math.sqrt(s.stand.m2);
    var lukkede = 4 - s.stand.aabneSider;
    /* En ø-stand har ingen nabovægge, men skal stadig have en fritstående
       vægblok til depot, grafik og teknik */
    var lbm = lukkede ? side * lukkede : side * 1.2;
    return {
      side: side,
      lukkede: lukkede,
      vaegLbm: lbm,
      omkreds: side * 4,
      vaegAreal: lbm * s.stand.vaeghoejde
    };
  }

  /* Timerne til at gøre grafikken klar — ikke produktionen af printet.
     Uden print er der intet at sætte op. */
  function grafikarbejde() {
    var g = geometri();
    var printM2 = g.vaegAreal * P.grafikdaekning[s.stand.grafik];
    if (!printM2) return { timer: [0, 0], pris: [0, 0] };
    var n = P.grafikarbejde.niveauer[s.grafikarbejde] || P.grafikarbejde.niveauer.delvis;
    var timer = [
      Math.max(n.minTimer[0], printM2 * n.timerPrM2[0]),
      Math.max(n.minTimer[1], printM2 * n.timerPrM2[1])
    ];
    return { timer: timer, pris: iv.gang(timer, P.grafikarbejde.timepris) };
  }

  function hoejde(m) {
    return P.vaeg.hoejder.filter(function (x) { return x.m === (m || s.stand.vaeghoejde); })[0] ||
           P.vaeg.hoejder.filter(function (x) { return x.m === 3; })[0];
  }

  /* Lysvægge findes kun i de højder, Pixlip-profilen fås i */
  function hoejdeMulig(h) {
    return s.stand.vaegtype !== 'pixlip' || !!h.pixlip;
  }

  function vaegpris() {
    var g = geometri();
    if (!g.vaegLbm) return { konstruktion: 0, print: 0 };
    var daekning = P.grafikdaekning[s.stand.grafik];
    var h = hoejde();
    if (s.stand.vaegtype === 'pixlip') {
      return {
        konstruktion: g.vaegLbm * (h.pixlip || P.vaeg.hoejder.filter(function (x) { return x.m === 3; })[0].pixlip),
        print: g.vaegAreal * daekning * P.vaeg.pixlipPrintPrM2
      };
    }
    return {
      konstruktion: g.vaegLbm * (h.frame + h.pvc),
      print: g.vaegAreal * daekning * P.vaeg.printPrM2
    };
  }

  function belysningspris() {
    var b = P.belysning[s.stand.belysning];
    return Math.ceil(s.stand.m2 / b.m2PrSpot) * b.prSpot;
  }

  function gulvpris() {
    return s.stand.m2 * (P.gulv[s.stand.gulv] + (s.stand.haevet ? P.haevetGulv : 0));
  }

  /* Standardstørrelsen er den midterste, når der er flere at vælge imellem */
  function standardVariant(id) {
    var v = P.omraader[id].varianter;
    return v[Math.floor((v.length - 1) / 2)].id;
  }
  function variant(id, vid) {
    var v = P.omraader[id].varianter;
    return v.filter(function (x) { return x.id === (vid || (s.omraader[id] && s.omraader[id].variant) || standardVariant(id)); })[0] || v[0];
  }
  function omraadeTilgaengeligt(id) {
    var o = P.omraader[id];
    return !o.minStandM2 || s.stand.m2 >= o.minStandM2;
  }

  /* Et områdes pris: varerne i pakken plus dets egne vægge og dør */
  function omraadePris(id, vid) {
    var v = variant(id, vid), sum = 0;
    if (v.prM2) sum += v.m2 * v.prM2;
    Object.keys(v.dele || {}).forEach(function (navn) {
      var l = vare(navn);
      if (l) sum += l.leje * v.dele[navn];
    });
    if (v.vaegLbm) {
      var h = P.vaeg.hoejder.filter(function (x) { return x.m === P.omraadeVaeghoejde; })[0];
      sum += v.vaegLbm * (h.frame + h.pvc);
    }
    if (v.doere) sum += v.doere * P.vaeg.doer;
    return sum;
  }

  function omraadeLinjer() {
    return Object.keys(P.omraader).filter(function (id) {
      return s.omraader[id] && s.omraader[id].antal > 0 && omraadeTilgaengeligt(id);
    }).map(function (id) {
      var antal = s.omraader[id].antal, v = variant(id);
      var stoerrelse = C.omraader[id].stoerrelser[v.id];
      return {
        id: id, antal: antal, variant: v.id,
        navn: C.omraader[id].titel + (stoerrelse ? ' (' + stoerrelse.toLowerCase() + ')' : ''),
        pris: omraadePris(id) * antal, m2: v.m2 * antal
      };
    });
  }

  function omraadeAreal() {
    return omraadeLinjer().reduce(function (a, l) { return a + l.m2; }, 0);
  }

  function ledValgt() {
    return P.ledStoerrelser.filter(function (l) { return l.id === s.led; })[0] || P.ledStoerrelser[2];
  }
  function ledPris(v) {
    return v.fliser * vare('ledskin').leje + vare('novastar').leje + vare('afspiller').leje;
  }

  function tilkoebLinjer() {
    var ud = [], g = geometri();
    if (s.tilkoeb.skilt) {
      var print = s.stand.grafik === 'ingen' ? 0 : g.omkreds * P.rig.frisehoejde * P.vaeg.printPrM2;
      ud.push({ id: 'skilt', navn: C.tilkoeb.skilt.titel, pris: g.omkreds * P.rig.trussPrLbm + print });
    }
    if (s.tilkoeb.rigLys) {
      var t = P.tilkoeb.rigLys;
      ud.push({ id: 'rigLys', navn: C.tilkoeb.rigLys.titel, pris: Math.ceil(s.stand.m2 / t.m2PrSpot) * t.prSpot });
    }
    if (s.tilkoeb.led) {
      var v = ledValgt();
      ud.push({ id: 'led', navn: C.tilkoeb.led.titel + ', ' + v.navn, pris: ledPris(v) });
    }
    if (s.tilkoeb.beplantning) {
      ud.push({ id: 'beplantning', navn: C.tilkoeb.beplantning.titel, pris: P.tilkoeb.beplantning.pris });
    }
    return ud;
  }

  function elTavle() {
    /* Kun de områder, der er med i prisen — et område, standen er blevet
       for lille til, skal ikke trække en større tavle. */
    var stort = s.tilkoeb.led || s.tilkoeb.rigLys ||
      omraadeLinjer().some(function (l) {
        return P.elTavle.stortForbrug.indexOf(l.id) !== -1;
      });
    return stort ? P.elTavle.stor : P.elTavle.lille;
  }

  function projektstyring() {
    return P.projektstyring.filter(function (t) { return s.stand.m2 <= t.tilM2; })[0].pris;
  }

  /* Hvordan kommer standen frem? Én lastbil tager selv den største stand,
     så størrelsen afgør ingenting — vi kører selv, medmindre turen er så
     lang, at speditør og fly til montørerne bliver billigere.
     Både prisen og teksten under byvalget spørger her. */
  function transportmaade() {
    var m = P.montage, m2 = s.stand.m2, km = s.messe.km;
    if (s.messe.oversoeisk) return 'oversoeisk';
    if (km <= m.altidEgenKoerselKm) return 'egen';

    var montoerer = Math.max(m.minMontoerer, Math.ceil(m2 / m.m2PrMontoer));
    var fragt = (km * m.fragtPrKm[0] + km * m.fragtPrKm[1]) / 2 + m.flybillet * montoerer;
    var koersel = (km / m.kmPrTime) * m.ture * m.timepris *
                    (m.koeretidMontoerer[0] + m.koeretidMontoerer[1]) / 2 +
                  km * m.lastbilPrKm * m.ture + km * m.kmPengePrKm * m.ture +
                  (s.messe.bro ? m.broafgift * m.ture : 0);
    return fragt < koersel ? 'speditoer' : 'egen';
  }

  function montage() {
    var m = P.montage, m2 = s.stand.m2, km = s.messe.km;
    var montoerer = Math.max(m.minMontoerer, Math.ceil(m2 / m.m2PrMontoer));
    var op = [Math.max(m.minMandtimer, m2 * m.mandtimerPrM2[0]), Math.max(m.minMandtimer, m2 * m.mandtimerPrM2[1])];
    var ned = iv.gang(op, m.nedtagningsandel);
    var vaerksted = iv.tal(Math.max(4, m2 * m.vaerkstedPrM2));
    var indUd = [Math.max(2, m2 * m.indUdbaeringPrM2[0]), Math.max(3, m2 * m.indUdbaeringPrM2[1])];
    var timer = iv.sum([op, ned, vaerksted, indUd]);
    var linjer = [{ navn: tx('montage.opbygning'), pris: iv.gang(timer, m.timepris),
                    note: tx('montage.opbygningNote', { fra: Math.round(timer[0]), til: Math.round(timer[1]), montoerer: montoerer }) }];

    /* Uden for Europa kører vi ikke selv — der er kun én vej */
    if (s.messe.oversoeisk) {
      linjer.push({ navn: tx('montage.oversoeiskFragt'), pris: m.oversoeiskFragt.slice(),
        note: tx('montage.oversoeiskNote') });
      linjer.push({ navn: tx('montage.rejse'), pris: iv.tal(m.oversoeiskFlybillet * montoerer),
        note: tx('montage.rejseNote', { montoerer: montoerer }) });
      linjer.push({ navn: tx('montage.ophold'),
        pris: iv.tal(m.overnatning * montoerer * m.oversoeiskNaetter + m.fortaering * montoerer * m.oversoeiskDage) });
      linjer.push({ navn: tx('montage.forsikring'), pris: iv.tal(m.forsikring) });
      return linjer;
    }

    var speditoer = {
      pris: [km * m.fragtPrKm[0] + m.flybillet * montoerer,
             km * m.fragtPrKm[1] + m.flybillet * montoerer],
      navn: tx('montage.fragt'),
      note: tx('montage.fragtNote', { km: nf.format(km), montoerer: montoerer })
    };
    var koeretimer = (km / m.kmPrTime) * m.ture;
    var udlaeg = km * m.lastbilPrKm * m.ture + km * m.kmPengePrKm * m.ture +
                 (s.messe.bro ? m.broafgift * m.ture : 0);
    var egen = {
      pris: [koeretimer * m.koeretidMontoerer[0] * m.timepris + udlaeg,
             koeretimer * m.koeretidMontoerer[1] * m.timepris + udlaeg],
      navn: tx('montage.koersel'),
      note: tx('montage.koerselNote', { km: nf.format(km), timer: Math.round(koeretimer) })
    };
    var valgt = transportmaade() === 'speditoer' ? speditoer : egen;
    linjer.push(valgt);

    /* Tomgods: kører vi selv, tager kasserne turen hjem med bilen.
       Sender vi med speditør, skal de opbevares, mens messen kører. */
    if (valgt === speditoer) {
      linjer.push({ navn: tx('montage.tomgods'), pris: m.tomgodsPrLaes.slice(),
        note: tx('montage.tomgodsNote') });
    }

    var naetter = km <= 200 ? 0 : (km <= 600 ? 1 : 2);
    var dage = km <= 200 ? 2 : 3;
    linjer.push({ navn: tx('montage.ophold'),
      pris: iv.tal(m.overnatning * montoerer * naetter + m.fortaering * montoerer * dage) });
    linjer.push({ navn: tx('montage.forsikring'), pris: iv.tal(m.forsikring) });
    return linjer;
  }

  /* Det viste beløb er midtpunktet ± meta.spaend. Enkeltposterne er faste
     lejepriser, men montagetimer og standens endelige opbygning flytter sig,
     indtil der ligger en tegning — prisen er et udgangspunkt, ikke et tilbud. */
  function spaend(a) {
    var midt = (a[0] + a[1]) / 2 * (P.meta.prisniveau || 1);
    return [midt * (1 - P.meta.spaendNed), midt * (1 + P.meta.spaendOp)];
  }

  function beregn() {
    var v = vaegpris(), g = geometri();
    var omr = omraadeLinjer(), tilk = tilkoebLinjer();
    var tavle = elTavle();

    /* Detaljerne bruges til at bygge noterne, men vises ikke som egne linjer */
    var ga = grafikarbejde();
    var standDele = v.konstruktion + v.print + gulvpris() + belysningspris() + tavle.leje +
                    (ga.pris[0] + ga.pris[1]) / 2;
    var omraadeSum = omr.reduce(function (a, l) { return a + l.pris; }, 0) +
                     tilk.reduce(function (a, l) { return a + l.pris; }, 0);
    var mont = montage();
    var montSum = iv.sum(mont.map(function (l) { return l.pris; }));

    var meter = dec(Math.round(g.vaegLbm * 10) / 10);
    var standNote = [
      tx(s.stand.vaegtype === 'pixlip' ? 'standnote.lysvaeg' : 'standnote.vaeg', { meter: meter }),
      v.print ? tx('standnote.tryk', { areal: Math.round(g.vaegAreal * P.grafikdaekning[s.stand.grafik]) }) : null,
      ga.timer[1] ? tx('standnote.grafik', { fra: Math.round(ga.timer[0]), til: Math.round(ga.timer[1]) }) : null,
      s.stand.haevet ? tx('standnote.haevet', { gulv: C.gulv[s.stand.gulv].titel.toLowerCase() })
                     : C.gulv[s.stand.gulv].titel.toLowerCase(),
      C.belysning[s.stand.belysning].titel.toLowerCase(),
      tx('standnote.stroem')
    ].filter(Boolean).join(' · ');

    var omraadeNote = omr.concat(tilk).map(function (l) {
      return (l.antal && l.antal > 1 ? l.antal + ' × ' : '') + l.navn.toLowerCase();
    }).join(' · ') || tx('post.omraaderTom');

    var wiebenLinjer = [
      { navn: tx('post.projektstyring'), pris: iv.tal(projektstyring()),
        note: tx('post.projektstyringNote') },
      { navn: tx('post.stand'), pris: iv.tal(standDele), note: standNote },
      { navn: tx('post.omraader'), pris: iv.tal(omraadeSum), note: omraadeNote },
      { navn: tx('post.transport'), pris: montSum, note: tx('post.transportNote') }
    ].filter(function (l) { return l.pris[1] > 0; });

    var wieben = iv.sum(wiebenLinjer.map(function (l) { return l.pris; }));
    var leads = iv.gang(P.leads.prM2PrDag.slice(), s.stand.m2 * s.team.dage);
    var vist = spaend(wieben);

    return {
      wiebenLinjer: wiebenLinjer, wieben: wieben, vist: vist,
      omraader: omr, tilkoeb: tilk,
      leads: [Math.round(leads[0]), Math.round(leads[1])],
      prLead: [vist[0] / Math.max(1, Math.round(leads[1])), vist[1] / Math.max(1, Math.round(leads[0]))]
    };
  }

  /* ---------- Forslag til områder ----------
     Områderne lægges på i den rækkefølge, formålet tilsiger, indtil de
     fylder ca. 70 % af standen. Resten skal være plads at gå på.
     Listen køres igennem flere gange; hvor mange af hvert område der
     højst må komme på, står som maksIForslag i pricing.js.            */
  var PRIORITET = {
    leads:      ['reception', 'depot', 'staabord', 'bar', 'media', 'moedeAabent'],
    brand:      ['reception', 'depot', 'media', 'platform', 'staabord', 'bar', 'lounge', 'scene'],
    lancering:  ['reception', 'depot', 'platform', 'media', 'montre', 'staabord', 'bar', 'moedeAabent'],
    relationer: ['reception', 'depot', 'moede', 'lounge', 'bar', 'staabord', 'moedeAabent']
  };

  function foreslaaOmraader() {
    var raekke = PRIORITET[s.profil.formaal] || PRIORITET.leads;
    var plads = s.stand.m2 * 0.7, brugt = 0, ud = {};
    /* Hvor stor en bid ét område må tage i første runde. Uden den kunne en
       stor produktplatform sluge hele pladsen, så depotet aldrig kom med —
       og vores eget faglige tip siger, at depotet skal med. */
    var foersteRundeMaks = Math.max(4, plads / raekke.length * 2);
    /* Store stande skal kunne få flere af de områder, der kan gentages.
       Områder med loft 1 (velkomstdisk, depot, bar, scene) bliver ved én. */
    var faktor = Math.max(1, Math.ceil(s.stand.m2 / 60));

    function loft(id) {
      var maks = P.omraader[id].maksIForslag || 1;
      return maks === 1 ? 1 : maks * faktor;
    }

    function proev(id, foerste) {
      var o = P.omraader[id];
      if (!o || !omraadeTilgaengeligt(id)) return false;
      if (ud[id]) {
        /* Et område mere af samme slags — i den størrelse, der allerede er
           valgt, ellers tæller vi et andet areal end det, kunden får. */
        if (ud[id].antal >= loft(id)) return false;
        var valgt = variant(id, ud[id].variant);
        if (brugt + valgt.m2 > plads) return false;
        ud[id].antal += 1;
        brugt += valgt.m2;
        return true;
      }
      /* Første af slagsen: den største størrelse, der er plads til */
      var muligt = o.varianter.filter(function (v) {
        return brugt + v.m2 <= plads && (!foerste || v.m2 <= foersteRundeMaks);
      });
      if (!muligt.length) return false;
      var v = muligt[muligt.length - 1];
      ud[id] = { antal: 1, variant: v.id };
      brugt += v.m2;
      return true;
    }

    /* Flere runder gennem prioriteringen, så en stor stand også bliver
       fyldt op. Uden det fik 100 m² samme inventar som 60 m². */
    raekke.forEach(function (id) { proev(id, true); });
    var vaekst = true;
    while (vaekst) {
      vaekst = false;
      raekke.forEach(function (id) { if (proev(id, false)) vaekst = true; });
    }
    if (!Object.keys(ud).length) ud.reception = { antal: 1, variant: 'lille' };
    return ud;
  }

  function anbefal() {
    var p = s.profil, m2 = s.stand.m2;
    var tekst = p.formaal ? tx('raad.' + p.formaal) : '';
    var niveau = p.ambition ? tx('raad.' + p.ambition) : '';
    var stoerrelse = m2 < 12 ? tx('raad.lille')
      : m2 < 30 ? tx('raad.mellem', { m2: m2 })
      : tx('raad.stor', { m2: m2 });
    return { tekst: tekst, niveau: niveau, stoerrelse: stoerrelse };
  }

  function indsigter(maks) {
    var ud = [];
    C.indsigter.forEach(function (i) {
      var ok = false;
      try { ok = i.naar(s); } catch (e) { ok = false; }
      if (ok) ud.push(i);
    });
    ud.sort(function (a, b) { return b.vaegt - a.vaegt; });
    return ud.slice(0, maks || 3);
  }

  /* =====================================================================
     VISNING
     ===================================================================== */
  /* Hvor mange uger er der til messen? null hvis datoen ikke er sat. */
  function ugerTilMesse() {
    if (!s.messe.dato) return null;
    var d = new Date(s.messe.dato);
    if (isNaN(d.getTime())) return null;
    return Math.round((d - new Date()) / (7 * 24 * 60 * 60 * 1000));
  }

  /* Er trinnet i sig selv udfyldt? Kun to trin kræver noget af kunden. */
  function trinUdfyldt(n) {
    if (n === 1) return C.profilSpoergsmaal.every(function (sp) { return s.profil[sp.id]; });
    if (n === 3) return !!s.omraadeValg;
    return true;
  }

  /* Et trin er åbent, når alt før det er udfyldt — også forlæns. */
  function kanGaaTil(n) {
    for (var i = 0; i < n; i++) if (!trinUdfyldt(i)) return false;
    return true;
  }

  /* Hvad mangler der, før trinnet kan åbnes? */
  function hvorforLaast(n) {
    for (var i = 0; i < n; i++) {
      if (trinUdfyldt(i)) continue;
      return i === 1 ? tx('laastProfil') : tx('laastOmraader');
    }
    return '';
  }

  function visTrin() {
    var ol = document.createElement('ol');
    TRIN.forEach(function (navn, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = (i > 0 ? i + '. ' : '') + navn;
      var aaben = kanGaaTil(i);
      if (i === s.trin) li.className = 'aktiv';
      else if (!aaben) { li.className = 'laast'; b.disabled = true; b.title = hvorforLaast(i); }
      else { li.className = (i < s.trin ? 'gjort ' : '') + 'klikbar'; }
      if (aaben && i !== s.trin) b.onclick = function () { gaaTil(i); };
      li.appendChild(b);
      ol.appendChild(li);
    });
    var v = document.getElementById('steps');
    v.innerHTML = ''; v.appendChild(ol);
  }

  function kort(o) {
    var b = el('<button type="button" class="card"></button>');
    /* Visningen bygges om ved hvert valg, så knappen her erstattes af en ny.
       Nøglen gør, at fokus kan flyttes til aflaseren bagefter. */
    if (o.fokus) b.setAttribute('data-fokus', o.fokus);
    /* Fluebenet er tegnet med CSS, så en skærmlæser skal have det sagt */
    if (o.valgt !== undefined) b.setAttribute('aria-pressed', o.valgt ? 'true' : 'false');
    if (o.valgt) b.classList.add('valgt');
    if (o.svg) b.appendChild(el('<span class="ill">' + o.svg + '</span>'));
    b.appendChild(el('<span class="card-titel">' + esc(o.titel) + '</span>'));
    if (o.tekst) b.appendChild(el('<span class="card-tekst">' + esc(o.tekst) + '</span>'));
    if (o.meta) b.appendChild(el('<span class="card-meta">' + o.meta + '</span>'));
    b.onclick = o.klik;
    return b;
  }

  function visProfil() {
    var v = document.getElementById('profil');
    v.innerHTML = '';
    C.profilSpoergsmaal.forEach(function (sp) {
      var blok = el('<div class="field"></div>');
      blok.appendChild(el('<h3 class="sp-title">' + esc(sp.spoergsmaal) + '</h3>'));
      if (sp.hjaelp) blok.appendChild(el('<p class="grp-hjaelp">' + esc(sp.hjaelp) + '</p>'));
      /* Tre valg skal fylde rækken ud, ikke efterlade en tom fjerdedel */
      var c = el('<div class="cards cards-' + Math.min(4, sp.valg.length) + '"></div>');
      sp.valg.forEach(function (valg) {
        c.appendChild(kort({
          fokus: 'profil:' + sp.id + ':' + valg.id,
          titel: valg.titel, tekst: valg.tekst, valgt: s.profil[sp.id] === valg.id,
          klik: function () { s.profil[sp.id] = valg.id; opdater(); }
        }));
      });
      blok.appendChild(c);
      v.appendChild(blok);
    });
    /* Kun spørgsmålene skal besvares */
    document.getElementById('videre-profil').disabled = !trinUdfyldt(1);
  }

  function visAnbefaling() {
    var a = anbefal();
    document.getElementById('anbefaling').innerHTML =
      '<span class="mrk">' + esc(tx('raad.mrk')) + '</span>' +
      '<p>' + esc(a.tekst) + '</p>' +
      '<p class="anb-sub">' + esc(a.stoerrelse) + ' ' + esc(a.niveau) + '</p>';
  }

  function land(id) {
    return C.lande.filter(function (l) { return l.id === (id || s.messe.land); })[0] || C.lande[0];
  }
  /* Skriver kunden selv afstanden ind, kender vi ikke ruten. Men skal man
     over en bro til hver by i landet, skal man det også til den, kunden
     nævner — så tages broafgiften med. Ved „Et andet land“ ved vi intet. */
  function broForLand() {
    var byer = land().byer;
    return byer.length > 0 && byer.every(function (b) { return b.bro; });
  }
  function by(navn) {
    return land().byer.filter(function (b) { return b.navn === (navn || s.messe.by); })[0] || null;
  }

  function visSted() {
    var lv = document.getElementById('land');
    if (!lv.options.length) {
      C.lande.forEach(function (l) {
        var o = document.createElement('option');
        o.value = l.id; o.textContent = l.navn;
        lv.appendChild(o);
      });
    }
    lv.value = s.messe.land;

    var bv = document.getElementById('by');
    var l = land();
    bv.innerHTML = '';
    l.byer.forEach(function (b) {
      var o = document.createElement('option');
      o.value = b.navn; o.textContent = b.navn;
      bv.appendChild(o);
    });
    var anden = document.createElement('option');
    anden.value = '__anden__';
    anden.textContent = l.byer.length ? C.andenBy : tx('sted.andenBy');
    bv.appendChild(anden);
    bv.value = s.messe.ukendt ? '__anden__' : s.messe.by;
    bv.disabled = !l.byer.length;

    document.getElementById('km-manuel').hidden = !s.messe.ukendt;

    var h = document.getElementById('by-hjaelp');
    if (l.oversoeisk) {
      h.textContent = tx('sted.oversoeisk');
      return;
    }
    if (s.messe.ukendt && !s.messe.km) {
      h.textContent = tx('sted.skrivKm');
      return;
    }
    h.textContent = tx('sted.afstand', { km: nf.format(s.messe.km) }) + ' ' +
      (transportmaade() === 'speditoer'
        ? tx('sted.viaSpeditoer')
        : tx('sted.egenKoersel') + (s.messe.bro ? ' ' + tx('sted.broMed') : ''));
  }

  function visAabneSider() {
    var v = document.getElementById('aabneSider');
    v.innerHTML = '';
    [1, 2, 3, 4].forEach(function (n) {
      var a = C.aabneSider[n];
      v.appendChild(kort({
        fokus: 'sider:' + n,
        svg: C.svg['sider' + n], titel: a.titel, tekst: a.tekst,
        valgt: s.stand.aabneSider === n,
        klik: function () { s.stand.aabneSider = n; opdater(); }
      }));
    });
    var g = geometri();
    document.getElementById('vaeg-hjaelp').textContent =
      tx('standen.vaegflade', {
        meter: dec(Math.round(g.vaegLbm * 10) / 10),
        areal: Math.round(g.vaegAreal),
        hoejde: String(s.stand.vaeghoejde).replace('.', ',')
      }) + (g.lukkede ? '' : ' ' + tx('standen.oeStand'));
  }

  function visVaegtyper() {
    var v = document.getElementById('vaegtyper');
    v.innerHTML = '';
    Object.keys(C.vaegtyper).forEach(function (id) {
      var t = C.vaegtyper[id];
      var gemt = s.stand.vaegtype;
      s.stand.vaegtype = id;
      var pris = vaegpris();
      s.stand.vaegtype = gemt;
      v.appendChild(kort({
        fokus: 'vaegtype:' + id,
        svg: C.svg[id], titel: t.titel, tekst: t.tekst, valgt: s.stand.vaegtype === id,
        meta: '<span class="card-pris">' + fmtKort(spaend(iv.tal(pris.konstruktion + pris.print))) + ' kr.</span> ' + esc(tx('standen.forStanden')) +
              '<span class="card-teknik">' + esc(t.teknik) + '</span>',
        klik: function () {
          s.stand.vaegtype = id;
          if (!hoejdeMulig(hoejde())) {
            var muligt = P.vaeg.hoejder.filter(hoejdeMulig);
            s.stand.vaeghoejde = muligt[muligt.length - 1].m;
          }
          opdater();
        }
      }));
    });
  }

  function seg(id, valg, aktiv, klik) {
    var v = document.getElementById(id);
    v.innerHTML = '';
    valg.forEach(function (o) {
      var b = el('<button type="button" class="seg-btn">' + esc(o.titel) + '</button>');
      b.setAttribute('data-fokus', id + ':' + o.vaerdi);
      if (o.vaerdi === aktiv) b.classList.add('valgt');
      if (o.laast) { b.disabled = true; b.title = tx('standen.ikkeLysvaeg'); }
      else b.onclick = function () { klik(o.vaerdi); };
      v.appendChild(b);
    });
  }

  function visValg() {
    seg('vaeghoejde', P.vaeg.hoejder.map(function (h) {
      return { vaerdi: h.m, titel: String(h.m).replace('.', ',') + ' m', laast: !hoejdeMulig(h) };
    }), s.stand.vaeghoejde, function (v) { s.stand.vaeghoejde = v; opdater(); });
    var hh = document.getElementById('hoejde-hjaelp');
    var valgtHoejde = hoejde();
    hh.classList.toggle('advarsel', !!valgtHoejde.hoej);
    hh.textContent = valgtHoejde.hoej
      ? tx('standen.hoejOver', { fri: P.friHoejde })
      : (s.stand.vaegtype === 'pixlip'
          ? tx('standen.hoejPixlip')
          : tx('standen.hoejFri', { fri: P.friHoejde }));

    seg('grafik', Object.keys(C.grafikdaekning).map(function (k) {
      return { vaerdi: k, titel: C.grafikdaekning[k].titel };
    }), s.stand.grafik, function (v) { s.stand.grafik = v; opdater(); });
    document.getElementById('grafik-hjaelp').textContent = C.grafikdaekning[s.stand.grafik].tekst +
      (vaegpris().print
        ? ' · ' + tx('standen.forTrykket', { pris: fmtKort(spaend(iv.tal(vaegpris().print))) })
        : '');

    var gab = document.getElementById('grafikarbejde-blok');
    gab.hidden = s.stand.grafik === 'ingen';
    if (!gab.hidden) {
      var gav = document.getElementById('grafikarbejde');
      gav.innerHTML = '';
      Object.keys(C.grafikarbejde).forEach(function (id) {
        var t = C.grafikarbejde[id];
        var gemt = s.grafikarbejde;
        s.grafikarbejde = id;
        var ga2 = grafikarbejde();
        s.grafikarbejde = gemt;
        gav.appendChild(kort({
          fokus: 'grafikarbejde:' + id,
          titel: t.titel, tekst: t.tekst, valgt: s.grafikarbejde === id,
          meta: '<span class="card-pris">' + fmtKort(spaend(ga2.pris)) + ' kr.</span> · ' +
                esc(tx('standen.anslaaetTimer', { fra: Math.round(ga2.timer[0]), til: Math.round(ga2.timer[1]) })),
          klik: function () { s.grafikarbejde = id; opdater(); }
        }));
      });
    }

    var g = document.getElementById('gulv');
    g.innerHTML = '';
    Object.keys(C.gulv).forEach(function (id) {
      var t = C.gulv[id];
      g.appendChild(kort({
        fokus: 'gulv:' + id,
        titel: t.titel, tekst: t.tekst, valgt: s.stand.gulv === id,
        meta: '<span class="card-pris">' + fmtKort(spaend(iv.tal(P.gulv[id] * s.stand.m2))) + ' kr.</span> · ' +
              esc(tx('standen.prM2', { pris: nf.format(P.gulv[id]) })),
        klik: function () { s.stand.gulv = id; opdater(); }
      }));
    });
    var hv = document.getElementById('haevet');
    hv.innerHTML = '';
    [['nej', false], ['ja', true]].forEach(function (par) {
      var t = C.haevet[par[0]];
      hv.appendChild(kort({
        fokus: 'haevet:' + par[0],
        titel: t.titel, tekst: t.tekst, valgt: s.stand.haevet === par[1],
        meta: par[1]
          ? '<span class="card-pris">' + fmtKort(spaend(iv.tal(P.haevetGulv * s.stand.m2))) + ' kr.</span> ' + esc(tx('standen.oveniGulvet'))
          : esc(tx('standen.ingenUdgift')),
        klik: function () { s.stand.haevet = par[1]; opdater(); }
      }));
    });

    var b = document.getElementById('belysning');
    b.innerHTML = '';
    Object.keys(C.belysning).forEach(function (id) {
      var t = C.belysning[id];
      var def = P.belysning[id];
      b.appendChild(kort({
        fokus: 'belysning:' + id,
        titel: t.titel, tekst: t.tekst, valgt: s.stand.belysning === id,
        meta: '<span class="card-pris">' +
              fmtKort(spaend(iv.tal(Math.ceil(s.stand.m2 / def.m2PrSpot) * def.prSpot))) + ' kr.</span> · ' +
              esc(tx('standen.spots', { antal: Math.ceil(s.stand.m2 / def.m2PrSpot) })),
        klik: function () { s.stand.belysning = id; opdater(); }
      }));
    });

  }

  function visOmraader() {
    var v = document.getElementById('omraader');
    v.innerHTML = '';

    C.omraadeGrupper.forEach(function (gr) {
      var ider = Object.keys(P.omraader).filter(function (id) {
        return P.omraader[id].gruppe === gr.id && omraadeTilgaengeligt(id);
      });
      if (!ider.length) return;
      v.appendChild(el('<h3 class="sp-title">' + esc(gr.titel) + '</h3>'));
      v.appendChild(el('<p class="grp-hjaelp">' + esc(gr.hjaelp) + '</p>'));
      var raekke = el('<div class="cards cards-4"></div>');

      ider.forEach(function (id) {
        var t = C.omraader[id];
        var gemt = s.omraader[id] || {};
        var valgt = { antal: Number(gemt.antal) || 0, variant: gemt.variant || standardVariant(id) };
        var vr = variant(id, valgt.variant);
        var k = el('<div class="omraade' + (valgt.antal ? ' valgt' : '') + '"></div>');
        k.appendChild(el('<span class="ill">' + C.svg[t.ikon] + '</span>'));
        k.appendChild(el('<span class="card-titel">' + esc(t.titel) + '</span>'));
        k.appendChild(el('<span class="card-tekst">' + esc(t.tekst) + '</span>'));

        /* Størrelse vises kun, når området er valgt til, og kun hvis der er noget at vælge */
        var muligt = P.omraader[id].varianter;
        if (valgt.antal && muligt.length > 1) {
          var seg = el('<span class="stoerrelser"></span>');
          muligt.forEach(function (m) {
            var b = el('<button type="button" class="seg-btn' + (m.id === vr.id ? ' valgt' : '') + '">' +
              esc(C.stoerrelsesnavne[m.id]) + '</button>');
            b.setAttribute('data-fokus', 'stoerrelse:' + id + ':' + m.id);
            b.title = (t.stoerrelser[m.id] || '') + ' · ' + m.m2 + ' m²';
            b.onclick = function () { saetVariant(id, m.id); };
            seg.appendChild(b);
          });
          k.appendChild(seg);
        }

        var beskrivelse = t.stoerrelser[vr.id];
        k.appendChild(el('<span class="card-meta"><span class="card-pris">' +
          fmtKort(spaend(iv.tal(omraadePris(id, vr.id)))) + ' kr.</span>' +
          (beskrivelse ? ' · ' + esc(beskrivelse) : '') + ' · ' + vr.m2 + ' m²</span>'));

        var st = el('<span class="stepper"></span>');
        var minus = el('<button type="button" aria-label="' + esc(tx('omraade.faerre')) + '">−</button>');
        minus.setAttribute('data-fokus', 'minus:' + id);
        minus.disabled = !valgt.antal;
        minus.onclick = function () { saetAntal(id, valgt.antal - 1); };
        var plus = el('<button type="button" aria-label="' + esc(tx('omraade.flere')) + '">+</button>');
        plus.setAttribute('data-fokus', 'plus:' + id);
        plus.onclick = function () { saetAntal(id, valgt.antal + 1); };
        st.appendChild(minus);
        st.appendChild(el('<span class="antal">' + valgt.antal + '</span>'));
        st.appendChild(plus);
        k.appendChild(st);
        raekke.appendChild(k);
      });
      v.appendChild(raekke);
    });

    var brugt = omraadeAreal();
    var andel = s.stand.m2 ? Math.round(brugt / s.stand.m2 * 100) : 0;
    var ah = document.getElementById('areal-hjaelp');
    ah.classList.toggle('advarsel', andel > 75);
    ah.textContent = !brugt
      ? tx('omraade.vaelg')
      : andel > 100
        ? tx('omraade.forMeget', { brugt: dec(brugt), m2: s.stand.m2 })
        : tx(andel > 75 ? 'omraade.trangt' : 'omraade.passer',
             { brugt: dec(brugt), m2: s.stand.m2, andel: andel });

  }

  function visStartvalg() {
    var v = document.getElementById('startvalg');
    document.getElementById('omraadedel').hidden = !s.omraadeValg;
    v.innerHTML = '';

    if (!s.omraadeValg) {
      var forslag = foreslaaOmraader();
      var antal = Object.keys(forslag).length;
      var pris = Object.keys(forslag).reduce(function (a, id) {
        return a + omraadePris(id, forslag[id].variant) * forslag[id].antal;
      }, 0);

      var kort2 = el('<div class="cards cards-2"></div>');
      kort2.appendChild(kort({
        fokus: 'startvalg:forslag',
        titel: tx('omraade.brugForslag'), valgt: false,
        tekst: tx('omraade.brugForslagTekst', { antal: antal }),
        meta: '<span class="card-pris">' + fmtKort(spaend(iv.tal(pris))) + ' kr.</span> ' + esc(tx('omraade.forHeleMessen')),
        klik: function () { s.omraader = foreslaaOmraader(); s.omraadeValg = 'forslag'; opdater(); }
      }));
      kort2.appendChild(kort({
        fokus: 'startvalg:selv',
        titel: tx('omraade.byggSelv'), valgt: false,
        tekst: tx('omraade.byggSelvTekst'),
        meta: esc(tx('omraade.byggSelvMeta')),
        klik: function () { s.omraader = {}; s.omraadeValg = 'selv'; s.omraaderRoert = true; opdater(); }
      }));
      v.appendChild(kort2);
      return;
    }

    var linjer = omraadeLinjer().concat(tilkoebLinjer());
    var sum = linjer.reduce(function (a, l) { return a + l.pris; }, 0);
    var bar = el('<div class="forslag"></div>');
    bar.appendChild(el('<div class="forslag-tekst"><strong>' +
      esc(tx(s.omraadeValg === 'forslag' ? 'omraade.paaForslag' : 'omraade.paaSelv')) + '</strong>' +
      '<span>' + esc(linjer.length
        ? tx('omraade.valgtSum', { antal: linjer.length, pris: fmtKort(spaend(iv.tal(sum))) })
        : tx('omraade.ingenValgt')) + '</span></div>'));
    var knapper = el('<div class="forslag-knapper"></div>');
    if (s.omraadeValg === 'forslag') {
      var nulstil = el('<button type="button" class="btn">' + esc(tx('omraade.hentForslag')) + '</button>');
      nulstil.onclick = function () { s.omraader = foreslaaOmraader(); opdater(); };
      knapper.appendChild(nulstil);
    } else {
      var brug = el('<button type="button" class="btn">' + esc(tx('omraade.brugAlligevel')) + '</button>');
      brug.onclick = function () { s.omraader = foreslaaOmraader(); s.omraadeValg = 'forslag'; opdater(); };
      knapper.appendChild(brug);
    }
    var skift = el('<button type="button" class="btn btn-tekst">' + esc(tx('omraade.startForfra')) + '</button>');
    skift.onclick = function () { s.omraader = {}; s.omraadeValg = null; opdater(); };
    knapper.appendChild(skift);
    bar.appendChild(knapper);
    v.appendChild(bar);
  }

  function visTilkoeb() {
    var v = document.getElementById('tilkoeb');
    v.innerHTML = '';
    var priser = {};
    tilkoebLinjer().forEach(function (l) { priser[l.id] = l.pris; });
    Object.keys(C.tilkoeb).forEach(function (id) {
      var t = C.tilkoeb[id];
      var til = s.tilkoeb[id];
      /* Prisen skal kunne ses, også før man vælger til */
      var pris = priser[id];
      if (pris === undefined) {
        var gemt = s.tilkoeb[id];
        s.tilkoeb[id] = true;
        tilkoebLinjer().forEach(function (l) { if (l.id === id) pris = l.pris; });
        s.tilkoeb[id] = gemt;
      }
      v.appendChild(kort({
        fokus: 'tilkoeb:' + id,
        svg: C.svg[t.ikon], titel: t.titel, tekst: t.tekst, valgt: til,
        meta: '<span class="card-pris">' + fmtKort(spaend(iv.tal(pris || 0))) + ' kr.</span>' +
              (id === 'led' ? ' · ' + esc(ledValgt().navn) : ''),
        klik: function () { s.tilkoeb[id] = !s.tilkoeb[id]; opdater(); }
      }));
    });

    var boks = document.getElementById('led-valg');
    boks.hidden = !s.tilkoeb.led;
    if (s.tilkoeb.led) {
      document.getElementById('led-intro').textContent = C.ledIntro;
      var lv = document.getElementById('led-stoerrelser');
      lv.innerHTML = '';
      P.ledStoerrelser.forEach(function (l) {
        lv.appendChild(kort({
          fokus: 'led:' + l.id,
          titel: l.navn, tekst: tx('omraade.ledTekst', { areal: dec(l.m2), fliser: l.fliser }),
          valgt: s.led === l.id,
          meta: '<span class="card-pris">' + fmtKort(spaend(iv.tal(ledPris(l)))) + ' kr.</span> ' + esc(tx('omraade.ledMeta')),
          klik: function () { s.led = l.id; opdater(); }
        }));
      });
    }
  }

  function saetAntal(id, n) {
    s.omraaderRoert = true;
    if (n <= 0) { delete s.omraader[id]; }
    else if (s.omraader[id]) { s.omraader[id].antal = n; }
    else { s.omraader[id] = { antal: n, variant: standardVariant(id) }; }
    opdater();
  }

  function saetVariant(id, vid) {
    s.omraaderRoert = true;
    if (s.omraader[id]) { s.omraader[id].variant = vid; opdater(); }
  }

  function visIndsigter(id, antal) {
    var v = document.getElementById(id);
    if (!v) return;
    v.innerHTML = '';
    indsigter(antal).forEach(function (i) {
      v.appendChild(el('<div class="indsigt"><span class="indsigt-mrk">' + esc(tx('tipMrk')) + '</span>' +
        '<h4>' + esc(i.titel) + '</h4><p>' + esc(i.tekst) + '</p></div>'));
    });
  }

  function visBudget() {
    var r = beregn();
    var v = document.getElementById('budget');
    v.innerHTML = '';
    var k = el('<div class="bkol"></div>');
    k.appendChild(el('<span class="bkol-badge">' + esc(tx('budget.badge')) + '</span>'));
    k.appendChild(el('<h3>' + esc(tx('budget.titel')) + '</h3>'));
    k.appendChild(el('<p class="bkol-hvem">' + esc(tx('budget.hvem')) + '</p>'));
    var ul = el('<ul></ul>');
    r.wiebenLinjer.forEach(function (l) {
      ul.appendChild(el('<li><span>' + esc(l.navn) + '<em>' + esc(l.note) + '</em></span><span>' +
        fmtKort(spaend(l.pris)) + '</span></li>'));
    });
    k.appendChild(ul);
    k.appendChild(el('<div class="bkol-sum"><span>' + esc(tx('post.ialt')) + '</span><span>' + fmtKort(r.vist) + ' kr.</span></div>'));
    k.appendChild(el('<p class="bkol-fod">' + esc(tx('budget.fod')) + '</p>'));
    v.appendChild(k);

    document.getElementById('samlet').innerHTML =
      '<h3>' + esc(tx('budget.samlet', { pris: fmtKort(r.vist) })) + '</h3>' +
      '<p>' + esc(tx('budget.leads', {
        m2: s.stand.m2, dage: s.team.dage,
        leadFra: r.leads[0], leadTil: r.leads[1], prLead: fmtKort(r.prLead)
      })) + '</p>' +
      '<p class="disclaimer">' + esc(tx('budget.daekker')) + '</p>';
  }

  function visTidslinje() {
    var v = document.getElementById('tidslinje');
    v.innerHTML = '';
    var intro = document.getElementById('tidslinje-intro');
    if (intro) intro.textContent = C.tidslinjeIntro;
    var dato = s.messe.dato ? new Date(s.messe.dato) : null;
    C.tidslinje.forEach(function (t) {
      var p = el('<div class="tl-punkt"></div>');
      var naar;
      if (dato && !isNaN(dato)) {
        var d = new Date(dato.getTime());
        d.setDate(d.getDate() - t.uger * 7);
        naar = d.toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' });
      } else {
        naar = t.uger > 0
          ? tx(t.uger === 1 ? 'tidslinje.ugeFoer' : 'tidslinje.ugerFoer', { uger: t.uger })
          : tx(t.uger === 0 ? 'tidslinje.messeugen' : 'tidslinje.ugenEfter');
      }
      if (t.uger <= 6) p.classList.add('naer');
      p.appendChild(el('<div class="tl-dato">' + esc(naar) +
        '<span class="tl-hvem tl-' + t.hvem + '">' + esc(C.hvemLabels[t.hvem]) + '</span></div>'));
      p.appendChild(el('<div class="tl-titel">' + esc(t.titel) + '</div>'));
      p.appendChild(el('<p class="tl-tekst">' + esc(t.tekst) + '</p>'));
      v.appendChild(p);
    });
  }

  function visOpsummering() {
    var r = beregn();
    var inv = r.omraader.concat(r.tilkoeb);
    var g = geometri();
    function linje(k, v) { return '<div class="ops-linje"><dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd></div>'; }

    document.getElementById('opsummering').innerHTML =
      '<dl class="ops-grid">' +
      linje(tx('oplaeg.sted'), (s.messe.by || land().navn) + (s.messe.by ? ', ' + land().navn : '') +
        (s.messe.dato ? ' · ' + new Date(s.messe.dato).toLocaleDateString(T.locale) : '')) +
      linje(tx('oplaeg.formaal'), (C.profilSpoergsmaal[0].valg.filter(function (x) { return x.id === s.profil.formaal; })[0] || {}).titel || tx('oplaeg.intet')) +
      linje(tx('oplaeg.areal'), tx('enhed.m2', { tal: s.stand.m2 })) +
      linje(tx('oplaeg.aabneSider'), s.stand.aabneSider) +
      linje(tx('oplaeg.vaegge'), tx('oplaeg.vaeggeVaerdi', {
        type: C.vaegtyper[s.stand.vaegtype].titel,
        meter: dec(Math.round(g.vaegLbm * 10) / 10),
        hoejde: String(s.stand.vaeghoejde).replace('.', ',')
      })) +
      linje(tx('oplaeg.tryk'), C.grafikdaekning[s.stand.grafik].titel +
        (s.stand.grafik !== 'ingen' ? ' · ' + C.grafikarbejde[s.grafikarbejde].titel.toLowerCase() : '')) +
      linje(tx('oplaeg.gulv'), s.stand.haevet
        ? tx('standnote.haevet', { gulv: C.gulv[s.stand.gulv].titel })
        : C.gulv[s.stand.gulv].titel) +
      linje(tx('oplaeg.belysning'), C.belysning[s.stand.belysning].titel) +
      linje(tx('oplaeg.leads'), r.leads[0] + '–' + r.leads[1]) +
      '</dl>' +
      '<div class="ops-inventar"><dt>' + esc(tx('oplaeg.omraader')) + '</dt><dd>' +
      esc(inv.length ? inv.map(function (l) { return (l.antal > 1 ? l.antal + ' × ' : '') + l.navn; }).join(' · ') : tx('oplaeg.ingenValgt')) +
      '</dd></div>' +
      '<div class="ops-pris"><span>' + esc(tx('oplaeg.estimatLabel')) + '</span>' +
      '<strong>' + fmt(r.vist) + '</strong>' +
      '<span>' + esc(tx('oplaeg.estimatNote')) + '</span></div>' +
      '<p class="forbehold">' + esc(tx('oplaeg.forbehold')) + '</p>';
  }

  function visPrintark() {
    var r = beregn(), g = geometri();
    var dato = s.messe.dato ? new Date(s.messe.dato) : null;
    var sted = (s.messe.by || land().navn) + (s.messe.by ? ', ' + land().navn : '');
    document.getElementById('pa-undertitel').textContent =
      sted + (dato && !isNaN(dato) ? ' · ' + dato.toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' }) : '') +
      ' · ' + tx('ark.udarbejdet', { dato: new Date().toLocaleDateString(T.locale) });

    var omr = r.omraader.concat(r.tilkoeb);
    var rk = [
      [tx('oplaeg.areal'), tx(s.stand.aabneSider === 1 ? 'ark.arealEn' : 'ark.areal', { m2: s.stand.m2, sider: s.stand.aabneSider })],
      [tx('oplaeg.vaegge'), tx('ark.vaegge', {
        type: C.vaegtyper[s.stand.vaegtype].titel,
        meter: dec(Math.round(g.vaegLbm * 10) / 10),
        hoejde: String(s.stand.vaeghoejde).replace('.', ',')
      })],
      [tx('oplaeg.tryk'), C.grafikdaekning[s.stand.grafik].titel +
        (s.stand.grafik !== 'ingen' ? ' · ' + C.grafikarbejde[s.grafikarbejde].titel.toLowerCase() : '')],
      [tx('oplaeg.gulv'), s.stand.haevet
        ? tx('standnote.haevet', { gulv: C.gulv[s.stand.gulv].titel })
        : C.gulv[s.stand.gulv].titel],
      [tx('oplaeg.belysning'), C.belysning[s.stand.belysning].titel],
      [tx('oplaeg.omraader'), omr.length ? omr.map(function (l) { return (l.antal > 1 ? l.antal + ' × ' : '') + l.navn; }).join(', ') : tx('oplaeg.ingenValgt')],
      [tx('ark.messedage'), s.team.dage]
    ];
    document.getElementById('pa-konfiguration').innerHTML = rk.map(function (par) {
      return '<dt>' + esc(par[0]) + '</dt><dd>' + esc(String(par[1])) + '</dd>';
    }).join('');

    document.getElementById('pa-pris').innerHTML =
      r.wiebenLinjer.map(function (l) {
        return '<tr><td>' + esc(l.navn) + '<span>' + esc(l.note) + '</span></td><td>' + fmtKort(spaend(l.pris)) + ' kr.</td></tr>';
      }).join('') +
      '<tr class="pa-sum"><td>' + esc(tx('post.ialt')) + '</td><td>' + fmtKort(r.vist) + ' kr.</td></tr>';

    document.getElementById('pa-tidslinje-intro').textContent = C.tidslinjeIntro;
    document.getElementById('pa-tidslinje').innerHTML = C.tidslinje.map(function (t) {
      var naar;
      if (dato && !isNaN(dato)) {
        var d = new Date(dato.getTime());
        d.setDate(d.getDate() - t.uger * 7);
        naar = d.toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' });
      } else {
        naar = t.uger > 0
          ? tx(t.uger === 1 ? 'tidslinje.ugeFoer' : 'tidslinje.ugerFoer', { uger: t.uger })
          : tx(t.uger === 0 ? 'tidslinje.messeugen' : 'tidslinje.ugenEfter');
      }
      return '<tr><td class="pa-naar">' + esc(naar) + '</td><td>' + esc(t.titel) +
             '<span>' + esc(t.tekst) + '</span></td><td class="pa-hvem">' + esc(C.hvemLabels[t.hvem]) + '</td></tr>';
    }).join('');
  }

  function visPrisbar() {
    var bar = document.getElementById('prisbar');
    bar.hidden = s.trin < 2 || (K.kraevEmailForPris && !s.sendt);
    if (bar.hidden) return;
    var r = beregn();
    document.getElementById('prisbar-belob').textContent = fmt(r.vist).replace(' kr.', '');
    var h = '<ul>';
    r.wiebenLinjer.forEach(function (l) {
      h += '<li><span>' + esc(l.navn) + (l.note ? '<em>' + esc(l.note) + '</em>' : '') +
        '</span><span>' + fmtKort(spaend(l.pris)) + '</span></li>';
    });
    h += '<li class="sum"><span>' + esc(tx('post.ialt')) + '</span><span>' + fmtKort(r.vist) + ' kr.</span></li></ul>' +
      '<p class="disclaimer">' + esc(tx('prisbar.forbehold')) + '</p>';
    document.getElementById('prisbar-detalje').innerHTML = h;
  }

  /* =====================================================================
     OPDATERING OG NAVIGATION
     ===================================================================== */
  function opdater() {
    /* Alle valgkort og segmentknapper bliver bygget om herunder, så den
       knap, brugeren stod på, forsvinder og fokus falder til <body>. Med
       tastatur betyder det, at man skal tabbe forfra efter hvert valg.
       Vi husker nøglen her og finder aflaseren igen til sidst. */
    var haddeFokus = document.activeElement;
    var fokusNoegle = haddeFokus && haddeFokus.getAttribute
      ? haddeFokus.getAttribute('data-fokus') : null;

    s.omraadeAreal = omraadeAreal();
    s.ugerTilMesse = ugerTilMesse();
    document.getElementById('m2-ud').textContent = tx('enhed.m2', { tal: s.stand.m2 });
    document.getElementById('dage-ud').textContent = tx(s.team.dage === 1 ? 'enhed.dag' : 'enhed.dage', { tal: s.team.dage });

    var sider = Math.max(2, Math.round(Math.sqrt(s.stand.m2 * 1.5)));
    document.getElementById('m2-hjaelp').textContent = tx('standen.maal', {
      bredde: sider,
      dybde: Math.max(2, Math.round(s.stand.m2 / sider)),
      samtaler: Math.max(1, Math.round(s.stand.m2 / 8))
    });
    visTrin();
    visProfil();
    visAnbefaling();
    visSted();
    visAabneSider();
    visVaegtyper();
    visValg();
    visStartvalg();
    document.getElementById('videre-omraader').disabled = !trinUdfyldt(3);
    visOmraader();
    visTilkoeb();
    visIndsigter('indsigter-2', 2);
    visIndsigter('indsigter-3', 3);
    visBudget();
    visTidslinje();
    visOpsummering();
    visPrintark();
    visPrisbar();

    /* Oplægget som PDF kan gøres betinget af, at kunden har afleveret sin mail */
    var pdfknap = document.getElementById('print');
    if (pdfknap) pdfknap.hidden = !!(K.kraevEmailForOplaeg && !s.sendt);
    /* Prototypeforbeholdet gælder kun, så længe der ikke er sat et endpoint op */
    var protonote = document.getElementById('prototypenote');
    if (protonote) protonote.hidden = !!K.endpoint;
    var opsPris = document.querySelector('.ops-pris');
    if (opsPris) opsPris.classList.toggle('skjult-pris', !!(K.kraevEmailForPris && !s.sendt));

    /* Kun hvis fokus faktisk gik tabt ved ombygningen — ellers ville vi
       stjæle fokus fra den, der lige klikkede et andet sted hen. */
    if (fokusNoegle && !document.contains(haddeFokus)) {
      /* To knapper findes ikke bagefter: minus bliver slået fra ved nul, og
         startvalget forsvinder, når det er truffet. Så peges der videre på
         det nærmeste, det giver mening at stå på. */
      var kaede = ['[data-fokus="' + fokusNoegle + '"]'];
      if (fokusNoegle.indexOf('minus:') === 0) kaede.push('[data-fokus="plus:' + fokusNoegle.slice(6) + '"]');
      if (fokusNoegle.indexOf('startvalg:') === 0) kaede.push('#omraadedel .sp-title');
      for (var fi = 0; fi < kaede.length; fi++) {
        var ny = document.querySelector(kaede[fi]);
        if (!ny || ny.disabled || ny.closest('[hidden]')) continue;
        if (ny.tabIndex < 0 && !/^(BUTTON|A|INPUT|SELECT|TEXTAREA)$/.test(ny.tagName)) ny.setAttribute('tabindex', '-1');
        ny.focus({ preventScroll: true });
        break;
      }
    }
    gem();
  }

  function gaaTil(n) {
    n = Math.max(0, Math.min(TRIN.length - 1, n));
    /* Spring aldrig længere frem, end der er udfyldt til */
    while (n > 0 && !kanGaaTil(n)) n--;
    s.trin = n;
    var aktiv = null;
    Array.prototype.forEach.call(document.querySelectorAll('.step'), function (sec) {
      sec.hidden = Number(sec.dataset.step) !== s.trin;
      if (!sec.hidden) aktiv = sec;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    /* Knappen, man trykkede på, er lige blevet skjult — så uden dette
       ryger fokus til <body>, og tastaturbrugeren skal tabbe forfra. */
    if (aktiv) {
      var overskrift = aktiv.querySelector('h1, h2');
      if (overskrift) {
        overskrift.setAttribute('tabindex', '-1');
        overskrift.focus({ preventScroll: true });
      }
    }
    opdater();
  }

  function gem() {
    try {
      localStorage.setItem(GEM, JSON.stringify({
        profil: s.profil, messe: s.messe, stand: s.stand,
        omraader: s.omraader, omraadeValg: s.omraadeValg, omraaderRoert: s.omraaderRoert,
        grafikarbejde: s.grafikarbejde,
        tilkoeb: s.tilkoeb, led: s.led, team: s.team
      }));
    } catch (e) { /* privat browsing */ }
  }

  /* ---------- Indlæsning af gemt tilstand ----------
     Det gemte kan stamme fra en ældre version af beregneren, fra en
     håndredigeret localStorage eller fra en pris, der siden er fjernet
     fra kataloget. Derfor bliver intet taget for gode varer: felterne
     flettes ind i standardværdierne, tal klemmes ind i deres grænser, og
     et valg, vi ikke kender, falder tilbage på standarden.

     Alternativet er at bumpe GEM-nøglen, hver gang tilstanden ændrer form
     — men det smider kundens udfyldning væk. Det her beholder den.      */

  /* Fletter kun de nøgler, standardtilstanden selv har, og kun hvis
     typen passer. Ukendte nøgler i det gemte ignoreres. */
  function flet(maal, kilde) {
    if (!kilde || typeof kilde !== 'object') return;
    Object.keys(maal).forEach(function (k) {
      var v = kilde[k];
      if (v === undefined || v === null) return;
      if (typeof maal[k] === 'number') { var n = Number(v); if (!isNaN(n)) maal[k] = n; }
      else if (typeof maal[k] === 'boolean') maal[k] = !!v;
      else if (typeof v === 'string' || typeof v === 'number') maal[k] = v;
    });
  }
  function iTabel(vaerdi, tabel, standard) {
    return Object.prototype.hasOwnProperty.call(tabel, vaerdi) ? vaerdi : standard;
  }
  function iListe(vaerdi, liste, standard) {
    return liste.indexOf(vaerdi) !== -1 ? vaerdi : standard;
  }
  function klem(v, fra, til, standard) {
    var n = Number(v);
    if (isNaN(n)) return standard;
    return Math.min(til, Math.max(fra, Math.round(n)));
  }

  function hent() {
    try {
      var raa = localStorage.getItem(GEM);
      if (!raa) return;
      var g = JSON.parse(raa);
      if (!g || typeof g !== 'object') return;

      flet(s.profil, g.profil);
      flet(s.messe, g.messe);
      flet(s.stand, g.stand);
      flet(s.tilkoeb, g.tilkoeb);
      flet(s.team, g.team);
      if (typeof g.led === 'string') s.led = g.led;
      if (typeof g.grafikarbejde === 'string') s.grafikarbejde = g.grafikarbejde;
      if (g.omraadeValg === 'forslag' || g.omraadeValg === 'selv') s.omraadeValg = g.omraadeValg;
      if (g.omraaderRoert) s.omraaderRoert = true;

      /* Profilsvar skal være et af de svar, spørgsmålet faktisk har */
      C.profilSpoergsmaal.forEach(function (sp) {
        var ider = sp.valg.map(function (v) { return v.id; });
        if (s.profil[sp.id] && ider.indexOf(s.profil[sp.id]) === -1) s.profil[sp.id] = null;
      });

      /* Sted */
      var landIder = C.lande.map(function (l) { return l.id; });
      s.messe.land = iListe(s.messe.land, landIder, 'dk');
      var byNavne = land().byer.map(function (b) { return b.navn; });
      if (!s.messe.ukendt) {
        s.messe.by = iListe(s.messe.by, byNavne, byNavne[0] || '');
        var b = by();
        if (b) { s.messe.km = b.km; s.messe.bro = b.bro; }
      }
      s.messe.km = Math.max(0, Number(s.messe.km) || 0);
      s.messe.oversoeisk = !!land().oversoeisk;
      if (s.messe.dato && isNaN(new Date(s.messe.dato).getTime())) s.messe.dato = '';

      /* Standen — grænserne er de samme som skydernes i index.html */
      s.stand.m2 = klem(s.stand.m2, 6, 200, 24);
      s.stand.aabneSider = klem(s.stand.aabneSider, 1, 4, 1);
      s.stand.vaegtype = iTabel(s.stand.vaegtype, C.vaegtyper, 'print');
      s.stand.grafik = iTabel(s.stand.grafik, C.grafikdaekning, 'fuld');
      s.stand.gulv = iTabel(s.stand.gulv, C.gulv, 'taeppe');
      s.stand.belysning = iTabel(s.stand.belysning, C.belysning, 'forstaerket');
      var hoejder = P.vaeg.hoejder.map(function (h) { return h.m; });
      if (hoejder.indexOf(Number(s.stand.vaeghoejde)) === -1) s.stand.vaeghoejde = 3;
      else s.stand.vaeghoejde = Number(s.stand.vaeghoejde);
      if (!hoejdeMulig(hoejde())) {
        var mulige = P.vaeg.hoejder.filter(hoejdeMulig);
        s.stand.vaeghoejde = mulige[mulige.length - 1].m;
      }

      s.team.dage = klem(s.team.dage, 1, 8, 3);
      s.grafikarbejde = iTabel(s.grafikarbejde, C.grafikarbejde, 'delvis');
      s.led = iListe(s.led, P.ledStoerrelser.map(function (l) { return l.id; }), 'l');

      /* Områder: en ældre version gemte bare et tal, og et område kan
         være fjernet fra kataloget siden. */
      var rene = {};
      Object.keys(g.omraader || {}).forEach(function (id) {
        if (!P.omraader[id]) return;
        var v = g.omraader[id];
        var antal = typeof v === 'number' ? v : Number(v && v.antal);
        if (!(antal > 0)) return;
        var vid = (v && v.variant && variant(id, v.variant).id) || standardVariant(id);
        rene[id] = { antal: Math.min(99, Math.round(antal)), variant: vid };
      });
      s.omraader = rene;
    } catch (e) {
      /* Kan det gemte ikke bringes på form, er en tom beregner bedre end
         en brækket. Standardtilstanden står urørt i s. */
    }
  }

  function bind() {
    /* Et scroll hen over et fokuseret talfelt ændrer ellers værdien — så et
       uskyldigt rul ned ad siden kan sætte en pris, brugeren aldrig skrev. */
    document.addEventListener('wheel', function (e) {
      var t = e.target;
      if (t && t.tagName === 'INPUT' && t.type === 'number' && document.activeElement === t) t.blur();
    }, { passive: true });

    document.addEventListener('click', function (e) {
      var g = e.target.closest('[data-goto]');
      if (g && !g.disabled) gaaTil(Number(g.dataset.goto));
    });

    document.getElementById('land').addEventListener('change', function (e) {
      s.messe.land = e.target.value;
      var l = land();
      s.messe.oversoeisk = !!l.oversoeisk;
      if (l.byer.length) {
        s.messe.by = l.byer[0].navn;
        s.messe.km = l.byer[0].km;
        s.messe.bro = l.byer[0].bro;
        s.messe.ukendt = false;
      } else {
        s.messe.by = ''; s.messe.bro = broForLand(); s.messe.ukendt = true; s.messe.km = 0;
        document.getElementById('km').value = '';
      }
      opdater();
    });
    document.getElementById('by').addEventListener('change', function (e) {
      if (e.target.value === '__anden__') {
        /* Den gamle bys afstand skal væk, ellers regner vi videre på den
           og skriver „Ca. 130 km“ under et felt, kunden lige har tømt. */
        s.messe.ukendt = true; s.messe.by = ''; s.messe.bro = broForLand(); s.messe.km = 0;
        document.getElementById('km').value = '';
      } else {
        var b = by(e.target.value);
        s.messe.by = e.target.value;
        s.messe.ukendt = false;
        s.messe.oversoeisk = !!land().oversoeisk;
        if (b) { s.messe.km = b.km; s.messe.bro = b.bro; }
      }
      opdater();
    });
    document.getElementById('km').addEventListener('input', function (e) {
      s.messe.km = Math.max(0, Number(e.target.value) || 0);
      s.messe.bro = broForLand();
      opdater();
    });
    document.getElementById('messedato').addEventListener('change', function (e) {
      s.messe.dato = e.target.value; opdater();
    });

    function slider(id, saet) {
      document.getElementById(id).addEventListener('input', function (e) { saet(Number(e.target.value)); opdater(); });
    }
    slider('m2', function (v) { s.stand.m2 = v; });
    slider('dage', function (v) { s.team.dage = v; });


    var toggle = document.getElementById('prisbar-toggle');
    toggle.addEventListener('click', function () {
      var d = document.getElementById('prisbar-detalje');
      d.hidden = !d.hidden;
      toggle.setAttribute('aria-expanded', String(!d.hidden));
      toggle.textContent = tx(d.hidden ? 'prisbar.seSpec' : 'prisbar.skjulSpec');
    });

    document.getElementById('print').addEventListener('click', function () { window.print(); });
    document.getElementById('nulstil').addEventListener('click', function () {
      /* Et fejlklik her koster hele udfyldningen */
      if (!window.confirm(tx('send.nulstilSpoergsmaal'))) return;
      try { localStorage.removeItem(GEM); } catch (e) { /* ignorer */ }
      location.reload();
    });

    document.getElementById('kontakt').addEventListener('submit', function (e) {
      e.preventDefault();
      send(e.target);
    });
  }

  /* =====================================================================
     AFSENDELSE
     ===================================================================== */
  function oplaeg(f) {
    var r = beregn(), g = geometri();
    var felter = Object.fromEntries(new FormData(f).entries());
    return {
      modtaget: new Date().toISOString(),
      kontakt: {
        navn: felter.navn, virksomhed: felter.virksomhed,
        email: felter.email, telefon: felter.telefon || '',
        budget: felter.budget || '', besked: felter.besked || ''
      },
      messe: { by: s.messe.by, land: land().navn, dato: s.messe.dato, km: s.messe.km, dage: s.team.dage },
      profil: s.profil,
      stand: {
        m2: s.stand.m2, aabneSider: s.stand.aabneSider,
        vaegge: C.vaegtyper[s.stand.vaegtype].titel,
        vaegmeter: Math.round(g.vaegLbm * 10) / 10,
        vaeghoejde: s.stand.vaeghoejde,
        tryk: C.grafikdaekning[s.stand.grafik].titel,
        grafiskArbejde: s.stand.grafik === 'ingen' ? 'Ingen' : C.grafikarbejde[s.grafikarbejde].titel,
        gulv: s.stand.haevet ? tx('standnote.haevet', { gulv: C.gulv[s.stand.gulv].titel })
                             : C.gulv[s.stand.gulv].titel,
        belysning: C.belysning[s.stand.belysning].titel
      },
      omraader: r.omraader.concat(r.tilkoeb).map(function (l) {
        return { navn: l.navn, antal: l.antal || 1, pris: Math.round(l.pris) };
      }),
      poster: r.wiebenLinjer.map(function (l) {
        var v = spaend(l.pris);
        return { navn: l.navn, note: l.note, fra: afrund(v[0]), til: afrund(v[1]) };
      }),
      estimat: { fra: afrund(r.vist[0]), til: afrund(r.vist[1]), valuta: 'DKK', moms: 'ekskl.' },
      leads: { fra: r.leads[0], til: r.leads[1] }
    };
  }

  function send(f) {
    if (!f.checkValidity()) { f.reportValidity(); return; }
    var knap = f.querySelector('button[type=submit]');
    var data = oplaeg(f);

    /* Uden endpoint kører modulet videre som prototype */
    if (!K.endpoint) {
      console.log(tx('send.konsol'), data);
      kvittering(f, data, 'prototype');
      return;
    }

    knap.disabled = true;
    var oprindelig = knap.textContent;
    knap.textContent = tx('send.sender');
    var fejlbesked = f.querySelector('.sendefejl');
    if (fejlbesked) fejlbesked.remove();

    /* text/plain holder browseren fra at sende en preflight-forespørgsel,
       som Apps Script ikke svarer på */
    fetch(K.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data)
    }).then(function (svar) {
      if (!svar.ok) throw new Error(tx('send.serverSvar', { status: svar.status }));
      return svar.json();
    }).then(function (svar) {
      if (svar && svar.ok === false) throw new Error(svar.fejl || tx('send.ukendtFejl'));
      kvittering(f, data, 'sendt');
    }).catch(function (fejl) {
      knap.disabled = false;
      knap.textContent = oprindelig;
      f.querySelector('.form-row').insertAdjacentElement('afterend', el(
        '<p class="sendefejl">' + esc(tx('send.fejl')) + '<em>' + esc(fejl.message) + '</em></p>'));
    });
  }

  function kvittering(f, data, tilstand) {
    var boks = el('<div class="kvittering"></div>');
    boks.appendChild(el('<strong>' + esc(tx('send.tak', { email: data.kontakt.email })) + '</strong>'));
    boks.appendChild(el('<span>' + esc(tx('send.viVenderTilbage')) + '</span>'));
    if (tilstand === 'prototype') {
      boks.appendChild(el('<span class="kvit-note">' + esc(tx('send.prototype')) + '</span>'));
    }
    var knapper = el('<div class="form-row" style="margin-top:14px"></div>');
    var pdf = el('<button type="button" class="btn">' + esc(tx('send.hentPdf')) + '</button>');
    pdf.onclick = function () { window.print(); };
    knapper.appendChild(pdf);
    boks.appendChild(knapper);
    f.replaceWith(boks);
    s.sendt = true;
    opdater();
  }

  fyldTekster();
  hent();
  bind();
  document.getElementById('m2').value = s.stand.m2;
  document.getElementById('dage').value = s.team.dage;
  document.getElementById('messedato').value = s.messe.dato || '';
  document.getElementById('km').value = s.messe.ukendt && s.messe.km ? s.messe.km : '';
  gaaTil(0);
})();
