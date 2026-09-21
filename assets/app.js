/* =====================================================================
   Wieben Design — Standberegner
   Al logik. Priser i pricing.js, tekster i content.js.
   ===================================================================== */
(function () {
  'use strict';

  var P = window.WD_PRIS;
  var K = window.WD_CONFIG || {};
  var C = window.WD_INDHOLD;
  var TRIN = ['Start', 'Profil', 'Standen', 'Områder', 'Messeklar', 'Oplæg'];
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
  var nf = new Intl.NumberFormat('da-DK');
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
  function dec(v) { return v.toLocaleString('da-DK', { maximumFractionDigits: 1 }); }
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
    var stort = s.tilkoeb.led || s.tilkoeb.rigLys ||
      Object.keys(s.omraader).some(function (id) {
        return s.omraader[id] && P.elTavle.stortForbrug.indexOf(id) !== -1;
      });
    return stort ? P.elTavle.stor : P.elTavle.lille;
  }

  function projektstyring() {
    return P.projektstyring.filter(function (t) { return s.stand.m2 <= t.tilM2; })[0].pris;
  }

  /* Hvordan kommer standen frem? Vi kører selv, medmindre den er for stor
     til bilen, eller turen er så lang, at speditør og fly bliver billigere.
     Både prisen og teksten under byvalget spørger her. */
  function transportmaade() {
    var m = P.montage, m2 = s.stand.m2, km = s.messe.km;
    if (s.messe.oversoeisk) return 'oversoeisk';
    if (m2 > m.egenkoerselMaxM2) return 'speditoer';
    if (km <= m.altidEgenKoerselKm) return 'egen';

    var montoerer = Math.max(m.minMontoerer, Math.ceil(m2 / m.m2PrMontoer));
    var laes = Math.ceil(m2 / m.m2PrLaes);
    var fragt = (km * m.fragtPrKm[0] * laes + km * m.fragtPrKm[1] * laes) / 2 + m.flybillet * montoerer;
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
    var linjer = [{ navn: 'Opbygning, ind- og udbæring, nedtagning og pakning', pris: iv.gang(timer, m.timepris),
                    note: 'anslået ' + Math.round(timer[0]) + '–' + Math.round(timer[1]) + ' mandtimer med ' + montoerer + ' montører' }];

    /* Uden for Europa kører vi ikke selv — der er kun én vej */
    if (s.messe.oversoeisk) {
      var laesO = Math.ceil(m2 / m.m2PrLaes);
      linjer.push({ navn: 'Oversøisk fragt',
        pris: [m.oversoeiskFragtPrLaes[0] * laesO, m.oversoeiskFragtPrLaes[1] * laesO],
        note: laesO + (laesO === 1 ? ' forsendelse' : ' forsendelser') + ' — aftales konkret med speditøren' });
      linjer.push({ navn: 'Montørernes rejse', pris: iv.tal(m.oversoeiskFlybillet * montoerer),
        note: montoerer + ' mand tur/retur' });
      linjer.push({ navn: 'Ophold og fortæring',
        pris: iv.tal(m.overnatning * montoerer * m.oversoeiskNaetter + m.fortaering * montoerer * m.oversoeiskDage) });
      linjer.push({ navn: 'Forsikring af transporten', pris: iv.tal(m.forsikring) });
      return linjer;
    }

    var laes = Math.ceil(m2 / m.m2PrLaes);
    var speditoer = {
      pris: [km * m.fragtPrKm[0] * laes + m.flybillet * montoerer,
             km * m.fragtPrKm[1] * laes + m.flybillet * montoerer],
      navn: 'Fragt og montørernes rejse',
      note: laes + ' lastbillæs, ' + nf.format(km) + ' km med speditør · fly til ' + montoerer + ' mand'
    };
    var koeretimer = (km / m.kmPrTime) * m.ture;
    var udlaeg = km * m.lastbilPrKm * m.ture + km * m.kmPengePrKm * m.ture +
                 (s.messe.bro ? m.broafgift * m.ture : 0);
    var egen = {
      pris: [koeretimer * m.koeretidMontoerer[0] * m.timepris + udlaeg,
             koeretimer * m.koeretidMontoerer[1] * m.timepris + udlaeg],
      navn: 'Kørsel og køretid',
      note: nf.format(km) + ' km hver vej, ca. ' + Math.round(koeretimer) + ' timer på vejen'
    };
    var valgt = transportmaade() === 'speditoer' ? speditoer : egen;
    linjer.push(valgt);

    /* Tomgods: kører vi selv, tager kasserne turen hjem med bilen.
       Sender vi med speditør, skal de opbevares, mens messen kører. */
    if (valgt === speditoer) {
      linjer.push({ navn: 'Tomgods under messen',
        pris: [m.tomgodsPrLaes[0] * laes, m.tomgodsPrLaes[1] * laes],
        note: 'opbevaring af de tomme kasser' });
    }

    var naetter = km <= 200 ? 0 : (km <= 600 ? 1 : 2);
    var dage = km <= 200 ? 2 : 3;
    linjer.push({ navn: 'Ophold og fortæring',
      pris: iv.tal(m.overnatning * montoerer * naetter + m.fortaering * montoerer * dage) });
    linjer.push({ navn: 'Forsikring af transporten', pris: iv.tal(m.forsikring) });
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
    var standDele = v.konstruktion + v.print + gulvpris() + belysningspris() + tavle.leje;
    var omraadeSum = omr.reduce(function (a, l) { return a + l.pris; }, 0) +
                     tilk.reduce(function (a, l) { return a + l.pris; }, 0);
    var mont = montage();
    var montSum = iv.sum(mont.map(function (l) { return l.pris; }));

    var standNote = [
      dec(Math.round(g.vaegLbm * 10) / 10) + ' meter ' + (s.stand.vaegtype === 'pixlip' ? 'lysvæg' : 'væg'),
      v.print ? Math.round(g.vaegAreal * P.grafikdaekning[s.stand.grafik]) + ' m² tryk' : null,
      C.gulv[s.stand.gulv].titel.toLowerCase() + (s.stand.haevet ? ', hævet' : ''),
      C.belysning[s.stand.belysning].titel.toLowerCase(),
      'strøm'
    ].filter(Boolean).join(' · ');

    var omraadeNote = omr.concat(tilk).map(function (l) {
      return (l.antal && l.antal > 1 ? l.antal + ' × ' : '') + l.navn.toLowerCase();
    }).join(' · ') || 'ingen områder valgt';

    var wiebenLinjer = [
      { navn: 'Design og projektledelse', pris: iv.tal(projektstyring()),
        note: 'tegning, møder, bestillinger og koordinering med messearrangøren' },
      { navn: 'Stand, grafik og materialer', pris: iv.tal(standDele), note: standNote },
      { navn: 'Indretning og udstyr', pris: iv.tal(omraadeSum), note: omraadeNote },
      { navn: 'Transport og opbygning', pris: montSum,
        note: 'opbygning, ind- og udbæring, tomgods, nedtagning, kørsel og forsikring — vi står for det hele' }
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
     fylder ca. 70 % af standen. Resten skal være plads at gå på.      */
  var PRIORITET = {
    leads:      ['reception', 'staabord', 'depot', 'bar', 'media', 'moedeAabent', 'staabord'],
    brand:      ['reception', 'media', 'depot', 'platform', 'staabord', 'bar', 'lounge', 'scene'],
    lancering:  ['reception', 'platform', 'depot', 'media', 'montre', 'staabord', 'bar', 'moedeAabent'],
    relationer: ['reception', 'moede', 'depot', 'lounge', 'bar', 'staabord', 'moedeAabent']
  };

  function foreslaaOmraader() {
    var raekke = PRIORITET[s.profil.formaal] || PRIORITET.leads;
    var plads = s.stand.m2 * 0.7, brugt = 0, ud = {};
    raekke.forEach(function (id) {
      if (!P.omraader[id] || !omraadeTilgaengeligt(id)) return;
      /* Tag den største størrelse, der stadig er plads til */
      var muligt = P.omraader[id].varianter.filter(function (v) { return brugt + v.m2 <= plads; });
      if (!muligt.length) return;
      var v = muligt[muligt.length - 1];
      if (ud[id]) { ud[id].antal += 1; }
      else { ud[id] = { antal: 1, variant: v.id }; }
      brugt += v.m2;
    });
    if (!Object.keys(ud).length) ud.reception = { antal: 1, variant: 'lille' };
    return ud;
  }

  function anbefal() {
    var p = s.profil, m2 = s.stand.m2;
    var tekst = {
      leads: 'I skal hjem med leads. Det betyder mange korte samtaler: hold facaden åben, sæt disken tilbage i standen og brug ståborde frem for lounge — folk der sidder ned, optager pladsen længere end de bidrager.',
      brand: 'I skal ses. Prioritér grafikhøjde og lys frem for møbler. Det, der virker på tyve meters afstand, er store flader, klare budskaber og bevægelse — ikke detaljer.',
      lancering: 'I lancerer. Byg standen om ét brændpunkt: ét belyst produkt, én skærm, én sætning. Alt andet på standen skal pege derhen.',
      relationer: 'I skal holde møder. Prioritér siddepladser, afskærmning og servering. Det er ikke standens facade, der afgør succesen — det er hvor længe folk bliver.'
    }[p.formaal] || '';
    var niveau = { basis: 'Vi holder det rent og funktionelt.', plus: 'Vi giver den et niveau mere på grafik og lys.', signatur: 'Vi går efter en stand, der bliver husket — det koster på grafik, lys og materialer.' }[p.ambition] || '';
    var stoerrelse = m2 < 12 ? 'På under 12 m² er disciplin vigtigere end idéer: ét budskab, ét produkt, plads til to mennesker.'
      : m2 < 30 ? 'På ' + m2 + ' m² har I plads til en disk, et par ståborde og et lille depot — ikke meget mere.'
      : 'På ' + m2 + ' m² kan standen bære flere zoner: mødeplads, demo og depot hver for sig.';
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
      return i === 1 ? 'Svar på de tre spørgsmål om jeres messeprofil først'
                     : 'Vælg først, om I vil bruge vores forslag eller bygge standen selv';
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
      blok.appendChild(el('<h3 class="grp-title">' + esc(sp.spoergsmaal) + '</h3>'));
      if (sp.hjaelp) blok.appendChild(el('<p class="grp-hjaelp">' + esc(sp.hjaelp) + '</p>'));
      var c = el('<div class="cards cards-4"></div>');
      sp.valg.forEach(function (valg) {
        c.appendChild(kort({
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
      '<span class="mrk">Vores råd til jer</span>' +
      '<p>' + esc(a.tekst) + '</p>' +
      '<p class="anb-sub">' + esc(a.stoerrelse) + ' ' + esc(a.niveau) + '</p>';
  }

  function land(id) {
    return C.lande.filter(function (l) { return l.id === (id || s.messe.land); })[0] || C.lande[0];
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
    anden.textContent = l.byer.length ? C.andenBy : 'Angiv afstanden herunder';
    bv.appendChild(anden);
    bv.value = s.messe.ukendt ? '__anden__' : s.messe.by;
    bv.disabled = !l.byer.length;

    document.getElementById('km-manuel').hidden = !s.messe.ukendt;

    var h = document.getElementById('by-hjaelp');
    if (l.oversoeisk) {
      h.textContent = 'Uden for Europa sender vi standen med speditør, og montørerne flyver. ' +
        'Vi har lager i USA og erfaring fra messer i mere end 70 lande — den præcise fragt aftaler vi konkret.';
      return;
    }
    if (s.messe.ukendt && !s.messe.km) {
      h.textContent = 'Skriv cirka hvor langt der er fra vores værksted i Støvring, så regner vi transporten ud fra det.';
      return;
    }
    h.textContent = 'Ca. ' + nf.format(s.messe.km) + ' km fra vores værksted i Støvring. ' +
      (transportmaade() === 'speditoer'
        ? 'På den afstand er det billigere at sende standen med speditør og flyve montørerne derned — så det regner vi med.'
        : 'Vi kører selv derned med standen.' + (s.messe.bro ? ' Broafgift er regnet med.' : ''));
  }

  function visAabneSider() {
    var v = document.getElementById('aabneSider');
    v.innerHTML = '';
    [1, 2, 3, 4].forEach(function (n) {
      var a = C.aabneSider[n];
      v.appendChild(kort({
        svg: C.svg['sider' + n], titel: a.titel, tekst: a.tekst,
        valgt: s.stand.aabneSider === n,
        klik: function () { s.stand.aabneSider = n; opdater(); }
      }));
    });
    var g = geometri();
    document.getElementById('vaeg-hjaelp').textContent =
      'Det giver ca. ' + dec(Math.round(g.vaegLbm * 10) / 10) + ' meter væg — ' +
      Math.round(g.vaegAreal) + ' m² vægflade i ' + String(s.stand.vaeghoejde).replace('.', ',') + ' meters højde.' +
      (g.lukkede ? '' : ' En fritliggende stand har ingen nabovægge, så vi regner med en fritstående vægblok til depot, grafik og teknik.');
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
        svg: C.svg[id], titel: t.titel, tekst: t.tekst, valgt: s.stand.vaegtype === id,
        meta: '<span class="card-pris">' + fmtKort(iv.tal(pris.konstruktion + pris.print)) + ' kr.</span> for jeres stand' +
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
      if (o.vaerdi === aktiv) b.classList.add('valgt');
      if (o.laast) { b.disabled = true; b.title = 'Findes ikke som lysvæg'; }
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
      ? 'Over ' + P.friHoejde + ' meter skal messen sige god for højden. Grænsen står i udstillerhåndbogen og ligger typisk mellem 3 og 6 meter — vi tjekker den, før vi tegner.'
      : (s.stand.vaegtype === 'pixlip'
          ? 'Lysvægge fås op til 4 meter. Skal I højere op, skal væggene være almindelige.'
          : 'Op til ' + P.friHoejde + ' meter kan I regne med, at det er tilladt. Derover afhænger det af messens regler.');

    seg('grafik', Object.keys(C.grafikdaekning).map(function (k) {
      return { vaerdi: k, titel: C.grafikdaekning[k].titel };
    }), s.stand.grafik, function (v) { s.stand.grafik = v; opdater(); });
    document.getElementById('grafik-hjaelp').textContent = C.grafikdaekning[s.stand.grafik].tekst +
      (vaegpris().print ? ' · ' + fmtKort(iv.tal(vaegpris().print)) + ' kr.' : '');

    var g = document.getElementById('gulv');
    g.innerHTML = '';
    Object.keys(C.gulv).forEach(function (id) {
      var t = C.gulv[id];
      g.appendChild(kort({
        titel: t.titel, tekst: t.tekst, valgt: s.stand.gulv === id,
        meta: P.gulv[id] ? '<span class="card-pris">' + nf.format(P.gulv[id]) + ' kr./m²</span>' : 'Ingen udgift',
        klik: function () { s.stand.gulv = id; opdater(); }
      }));
    });
    var hv = document.getElementById('haevet');
    hv.innerHTML = '';
    [['nej', false], ['ja', true]].forEach(function (par) {
      var t = C.haevet[par[0]];
      hv.appendChild(kort({
        titel: t.titel, tekst: t.tekst, valgt: s.stand.haevet === par[1],
        meta: par[1]
          ? '<span class="card-pris">' + fmtKort(spaend(iv.tal(P.haevetGulv * s.stand.m2))) + ' kr.</span> oveni gulvet'
          : 'Ingen ekstra udgift',
        klik: function () { s.stand.haevet = par[1]; opdater(); }
      }));
    });

    var b = document.getElementById('belysning');
    b.innerHTML = '';
    Object.keys(C.belysning).forEach(function (id) {
      var t = C.belysning[id];
      var def = P.belysning[id];
      b.appendChild(kort({
        titel: t.titel, tekst: t.tekst, valgt: s.stand.belysning === id,
        meta: '<span class="card-pris">' + kr(Math.ceil(s.stand.m2 / def.m2PrSpot) * def.prSpot) + ' kr.</span> · ' +
              Math.ceil(s.stand.m2 / def.m2PrSpot) + ' spots',
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
      v.appendChild(el('<h3 class="grp-title">' + esc(gr.titel) + '</h3>'));
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
        var minus = el('<button type="button" aria-label="Færre">−</button>');
        minus.disabled = !valgt.antal;
        minus.onclick = function () { saetAntal(id, valgt.antal - 1); };
        var plus = el('<button type="button" aria-label="Flere">+</button>');
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
      ? 'Vælg de områder, standen skal have. Vi holder øje med, om der er plads til dem.'
      : andel > 100
        ? 'Områderne fylder ca. ' + dec(brugt) + ' m² — mere end de ' + s.stand.m2 +
          ' m², I har. Noget må ud, vælges mindre, eller også skal standen være større.'
        : andel > 75
          ? 'Områderne fylder ca. ' + dec(brugt) + ' m² af jeres ' + s.stand.m2 + ' m² — omkring ' + andel +
            ' %. Det bliver trangt: gæsterne skal også kunne bevæge sig rundt.'
          : 'Områderne fylder ca. ' + dec(brugt) + ' m² af jeres ' + s.stand.m2 + ' m² — omkring ' + andel +
            ' %. Resten er plads at gå på.';

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
        titel: 'Brug vores forslag', valgt: false,
        tekst: 'Vi sætter ' + antal + ' områder op ud fra jeres formål og standens størrelse. Bagefter kan I rette i det hele — det er kun et udgangspunkt.',
        meta: '<span class="card-pris">' + fmtKort(spaend(iv.tal(pris))) + ' kr.</span> for hele messen',
        klik: function () { s.omraader = foreslaaOmraader(); s.omraadeValg = 'forslag'; opdater(); }
      }));
      kort2.appendChild(kort({
        titel: 'Jeg bygger selv', valgt: false,
        tekst: 'Start med en tom stand og vælg områderne én for én. Vi holder øje med, om der er plads til dem.',
        meta: 'Tager et par minutter mere',
        klik: function () { s.omraader = {}; s.omraadeValg = 'selv'; s.omraaderRoert = true; opdater(); }
      }));
      v.appendChild(kort2);
      return;
    }

    var linjer = omraadeLinjer().concat(tilkoebLinjer());
    var sum = linjer.reduce(function (a, l) { return a + l.pris; }, 0);
    var bar = el('<div class="forslag"></div>');
    bar.appendChild(el('<div class="forslag-tekst"><strong>' +
      (s.omraadeValg === 'forslag' ? 'I bygger videre på vores forslag' : 'I bygger selv standen op') + '</strong>' +
      '<span>' + (linjer.length
        ? linjer.length + ' valg til ' + fmtKort(spaend(iv.tal(sum))) + ' kr. for hele messen. Rul ned og ret frit i det.'
        : 'Ingen områder valgt endnu. Rul ned og vælg dem, standen skal have.') + '</span></div>'));
    var knapper = el('<div class="forslag-knapper"></div>');
    if (s.omraadeValg === 'forslag') {
      var nulstil = el('<button type="button" class="btn">Hent forslaget igen</button>');
      nulstil.onclick = function () { s.omraader = foreslaaOmraader(); opdater(); };
      knapper.appendChild(nulstil);
    } else {
      var brug = el('<button type="button" class="btn">Brug vores forslag alligevel</button>');
      brug.onclick = function () { s.omraader = foreslaaOmraader(); s.omraadeValg = 'forslag'; opdater(); };
      knapper.appendChild(brug);
    }
    var skift = el('<button type="button" class="btn btn-tekst">Start forfra</button>');
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
        svg: C.svg[t.ikon], titel: t.titel, tekst: t.tekst, valgt: til,
        meta: '<span class="card-pris">' + fmtKort(spaend(iv.tal(pris || 0))) + ' kr.</span>',
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
          titel: l.navn, tekst: l.m2 + ' m² skærmflade · ' + l.fliser + ' fliser',
          valgt: s.led === l.id,
          meta: '<span class="card-pris">' + fmtKort(spaend(iv.tal(ledPris(l)))) + ' kr.</span> inkl. styring',
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
      v.appendChild(el('<div class="indsigt"><span class="indsigt-mrk">Fagligt tip</span>' +
        '<h4>' + esc(i.titel) + '</h4><p>' + esc(i.tekst) + '</p></div>'));
    });
  }

  function visBudget() {
    var r = beregn();
    var v = document.getElementById('budget');
    v.innerHTML = '';
    var k = el('<div class="bkol"></div>');
    k.appendChild(el('<span class="bkol-badge">Estimat</span>'));
    k.appendChild(el('<h3>Det koster hos os</h3>'));
    k.appendChild(el('<p class="bkol-hvem">Leje af hele standen for hele messen, ekskl. moms</p>'));
    var ul = el('<ul></ul>');
    r.wiebenLinjer.forEach(function (l) {
      ul.appendChild(el('<li><span>' + esc(l.navn) + '<em>' + esc(l.note) + '</em></span><span>' +
        fmtKort(spaend(l.pris)) + '</span></li>'));
    });
    k.appendChild(ul);
    k.appendChild(el('<div class="bkol-sum"><span>I alt</span><span>' + fmtKort(r.vist) + ' kr.</span></div>'));
    k.appendChild(el('<p class="bkol-fod">Hver post er et spænd, ikke en fast pris. Vi lægger os først fast, når der ligger en godkendt tegning.</p>'));
    v.appendChild(k);

    document.getElementById('samlet').innerHTML =
      '<h3>Cirka ' + fmtKort(r.vist) + ' kr. for standen</h3>' +
      '<p>Med ' + s.stand.m2 + ' m² og ' + s.team.dage + ' messedage er et realistisk mål ' +
      r.leads[0] + '–' + r.leads[1] + ' kvalificerede leads — ' + fmtKort(r.prLead) + ' kr. pr. lead i standomkostning.</p>' +
      '<p class="disclaimer">Beløbet dækker standen: materiel, grafik, opbygning, transport og vores arbejde. Messearrangørens egne gebyrer er ikke med — dem aftaler I direkte med messen.</p>';
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
        naar = t.uger > 0 ? t.uger + ' uger før' : (t.uger === 0 ? 'Messeugen' : 'Ugen efter');
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
      linje('Sted', (s.messe.by || land().navn) + (s.messe.by ? ', ' + land().navn : '') +
        (s.messe.dato ? ' · ' + new Date(s.messe.dato).toLocaleDateString('da-DK') : '')) +
      linje('Formål', (C.profilSpoergsmaal[0].valg.filter(function (x) { return x.id === s.profil.formaal; })[0] || {}).titel || '—') +
      linje('Areal', s.stand.m2 + ' m²') +
      linje('Åbne sider', s.stand.aabneSider) +
      linje('Vægge', C.vaegtyper[s.stand.vaegtype].titel + ', ' + dec(Math.round(g.vaegLbm * 10) / 10) + ' meter i ' + String(s.stand.vaeghoejde).replace('.', ',') + ' m højde') +
      linje('Tryk på væggene', C.grafikdaekning[s.stand.grafik].titel) +
      linje('Gulv', C.gulv[s.stand.gulv].titel + (s.stand.haevet ? ', hævet' : '')) +
      linje('Belysning', C.belysning[s.stand.belysning].titel) +
      linje('Forventede leads', r.leads[0] + '–' + r.leads[1]) +
      '</dl>' +
      '<div class="ops-inventar"><dt>Områder og udstyr</dt><dd>' +
      esc(inv.length ? inv.map(function (l) { return (l.antal > 1 ? l.antal + ' × ' : '') + l.navn; }).join(' · ') : 'Ingen valgt') +
      '</dd></div>' +
      '<div class="ops-pris"><span>Estimat hos os — leje for hele messen, ekskl. moms</span>' +
      '<strong>' + fmt(r.vist) + '</strong>' +
      '<span>Beløbet dækker standen. Messearrangørens egne gebyrer er ikke med.</span></div>' +
      '<p class="forbehold">Det er et skøn, ikke et tilbud. Når vi har set standen tegnet, er der typisk noget der skal justeres — måske passer ti stole ikke til pladsen, måske skal væggen stå et andet sted. Det finder vi ud af sammen.</p>';
  }

  function visPrintark() {
    var r = beregn(), g = geometri();
    var dato = s.messe.dato ? new Date(s.messe.dato) : null;
    var sted = (s.messe.by || land().navn) + (s.messe.by ? ', ' + land().navn : '');
    document.getElementById('pa-undertitel').textContent =
      sted + (dato && !isNaN(dato) ? ' · ' + dato.toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' }) : '') +
      ' · udarbejdet ' + new Date().toLocaleDateString('da-DK');

    var omr = r.omraader.concat(r.tilkoeb);
    var rk = [
      ['Areal', s.stand.m2 + ' m² med ' + s.stand.aabneSider + (s.stand.aabneSider === 1 ? ' åben side' : ' åbne sider')],
      ['Vægge', C.vaegtyper[s.stand.vaegtype].titel + ', ' + dec(Math.round(g.vaegLbm * 10) / 10) + ' meter i ' + String(s.stand.vaeghoejde).replace('.', ',') + ' meters højde'],
      ['Tryk på væggene', C.grafikdaekning[s.stand.grafik].titel],
      ['Gulv', C.gulv[s.stand.gulv].titel + (s.stand.haevet ? ', hævet' : '')],
      ['Belysning', C.belysning[s.stand.belysning].titel],
      ['Områder', omr.length ? omr.map(function (l) { return (l.antal > 1 ? l.antal + ' × ' : '') + l.navn; }).join(', ') : 'Ingen valgt'],
      ['Messedage', s.team.dage]
    ];
    document.getElementById('pa-konfiguration').innerHTML = rk.map(function (par) {
      return '<dt>' + esc(par[0]) + '</dt><dd>' + esc(String(par[1])) + '</dd>';
    }).join('');

    document.getElementById('pa-pris').innerHTML =
      r.wiebenLinjer.map(function (l) {
        return '<tr><td>' + esc(l.navn) + '<span>' + esc(l.note) + '</span></td><td>' + fmtKort(spaend(l.pris)) + ' kr.</td></tr>';
      }).join('') +
      '<tr class="pa-sum"><td>I alt</td><td>' + fmtKort(r.vist) + ' kr.</td></tr>';

    document.getElementById('pa-tidslinje-intro').textContent = C.tidslinjeIntro;
    document.getElementById('pa-tidslinje').innerHTML = C.tidslinje.map(function (t) {
      var naar;
      if (dato && !isNaN(dato)) {
        var d = new Date(dato.getTime());
        d.setDate(d.getDate() - t.uger * 7);
        naar = d.toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' });
      } else {
        naar = t.uger > 0 ? t.uger + ' uger før' : (t.uger === 0 ? 'Messeugen' : 'Ugen efter');
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
    h += '<li class="sum"><span>I alt</span><span>' + fmtKort(r.vist) + ' kr.</span></li></ul>' +
      '<p class="disclaimer">Leje for hele messen, ekskl. moms. Hver post er et spænd, fordi den endelige opbygning først ligger fast på en godkendt tegning. Messearrangørens egen pris for pladsen ligger uden for beløbet.</p>';
    document.getElementById('prisbar-detalje').innerHTML = h;
  }

  /* =====================================================================
     OPDATERING OG NAVIGATION
     ===================================================================== */
  function opdater() {
    s.omraadeAreal = omraadeAreal();
    s.ugerTilMesse = ugerTilMesse();
    document.getElementById('m2-ud').textContent = s.stand.m2 + ' m²';
    document.getElementById('dage-ud').textContent = s.team.dage + (s.team.dage === 1 ? ' dag' : ' dage');

    var sider = Math.max(2, Math.round(Math.sqrt(s.stand.m2 * 1.5)));
    document.getElementById('m2-hjaelp').textContent =
      'Ca. ' + sider + ' × ' + Math.max(2, Math.round(s.stand.m2 / sider)) + ' meter · plads til omkring ' +
      Math.max(1, Math.round(s.stand.m2 / 8)) + ' samtidige samtaler.';
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
    var opsPris = document.querySelector('.ops-pris');
    if (opsPris) opsPris.classList.toggle('skjult-pris', !!(K.kraevEmailForPris && !s.sendt));
    gem();
  }

  function gaaTil(n) {
    n = Math.max(0, Math.min(TRIN.length - 1, n));
    /* Spring aldrig længere frem, end der er udfyldt til */
    while (n > 0 && !kanGaaTil(n)) n--;
    s.trin = n;
    Array.prototype.forEach.call(document.querySelectorAll('.step'), function (sec) {
      sec.hidden = Number(sec.dataset.step) !== s.trin;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    opdater();
  }

  function gem() {
    try {
      localStorage.setItem(GEM, JSON.stringify({
        profil: s.profil, messe: s.messe, stand: s.stand,
        omraader: s.omraader, omraadeValg: s.omraadeValg, omraaderRoert: s.omraaderRoert,
        tilkoeb: s.tilkoeb, led: s.led, team: s.team
      }));
    } catch (e) { /* privat browsing */ }
  }

  function hent() {
    try {
      var raa = localStorage.getItem(GEM);
      if (!raa) return;
      var g = JSON.parse(raa);
      ['profil', 'messe', 'stand', 'omraader', 'omraadeValg', 'tilkoeb', 'led', 'team'].forEach(function (k) { if (g[k]) s[k] = g[k]; });
      if (g.omraaderRoert) s.omraaderRoert = true;
      /* Gemt tilstand kan stamme fra en tidligere version, hvor et område
         bare var et tal. Bring den på nuværende form frem for at knække. */
      var rene = {};
      Object.keys(s.omraader || {}).forEach(function (id) {
        if (!P.omraader[id]) return;
        var v = s.omraader[id];
        var antal = typeof v === 'number' ? v : Number(v && v.antal);
        if (!(antal > 0)) return;
        var vid = (v && v.variant && variant(id, v.variant).id) || standardVariant(id);
        rene[id] = { antal: Math.round(antal), variant: vid };
      });
      s.omraader = rene;
    } catch (e) { /* ignorer ugyldigt gemt data */ }
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
        s.messe.by = ''; s.messe.bro = false; s.messe.ukendt = true; s.messe.km = 0;
        document.getElementById('km').value = '';
      }
      opdater();
    });
    document.getElementById('by').addEventListener('change', function (e) {
      if (e.target.value === '__anden__') {
        s.messe.ukendt = true; s.messe.by = ''; s.messe.bro = false;
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
      var km = Math.max(0, Number(e.target.value) || 0);
      if (km) { s.messe.km = km; s.messe.bro = false; }
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
      toggle.textContent = d.hidden ? 'Se specifikation' : 'Skjul specifikation';
    });

    document.getElementById('print').addEventListener('click', function () { window.print(); });
    document.getElementById('nulstil').addEventListener('click', function () {
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
        budget: felter.budget || '', besked: felter.besked || '',
        oenskerOpkald: !!felter.opkald
      },
      messe: { by: s.messe.by, land: land().navn, dato: s.messe.dato, km: s.messe.km, dage: s.team.dage },
      profil: s.profil,
      stand: {
        m2: s.stand.m2, aabneSider: s.stand.aabneSider,
        vaegge: C.vaegtyper[s.stand.vaegtype].titel,
        vaegmeter: Math.round(g.vaegLbm * 10) / 10,
        vaeghoejde: s.stand.vaeghoejde,
        tryk: C.grafikdaekning[s.stand.grafik].titel,
        gulv: C.gulv[s.stand.gulv].titel + (s.stand.haevet ? ', hævet' : ''),
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
      console.log('Oplæg klar til afsendelse:', data);
      kvittering(f, data, 'prototype');
      return;
    }

    knap.disabled = true;
    var oprindelig = knap.textContent;
    knap.textContent = 'Sender …';
    var fejlbesked = f.querySelector('.sendefejl');
    if (fejlbesked) fejlbesked.remove();

    /* text/plain holder browseren fra at sende en preflight-forespørgsel,
       som Apps Script ikke svarer på */
    fetch(K.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data)
    }).then(function (svar) {
      if (!svar.ok) throw new Error('Serveren svarede ' + svar.status);
      return svar.json();
    }).then(function (svar) {
      if (svar && svar.ok === false) throw new Error(svar.fejl || 'Ukendt fejl');
      kvittering(f, data, 'sendt');
    }).catch(function (fejl) {
      knap.disabled = false;
      knap.textContent = oprindelig;
      f.querySelector('.form-row').insertAdjacentElement('afterend', el(
        '<p class="sendefejl">Oplægget kunne ikke sendes lige nu. Prøv igen om et øjeblik, ' +
        'eller ring til os på 70 23 11 11 — vi har tallene klar.<em>' + esc(fejl.message) + '</em></p>'));
    });
  }

  function kvittering(f, data, tilstand) {
    var opkald = data.kontakt.oenskerOpkald;
    var boks = el('<div class="kvittering"></div>');
    boks.appendChild(el('<strong>Tak — oplægget er på vej til ' + esc(data.kontakt.email) + '</strong>'));
    boks.appendChild(el('<span>' + (opkald
      ? 'Vi ringer inden for en arbejdsdag og taler om, hvad der kan lade sig gøre på jeres plads.'
      : 'I hører ikke mere fra os, medmindre I selv tager fat. Får I brug for at vende det, er vi på 70 23 11 11.') + '</span>'));
    if (tilstand === 'prototype') {
      boks.appendChild(el('<span class="kvit-note">Prototype — der er ikke sat et endpoint op endnu, så mailen bliver ikke sendt. Oplægget ligger i browserens konsol.</span>'));
    }
    var knapper = el('<div class="form-row" style="margin-top:14px"></div>');
    var pdf = el('<button type="button" class="btn">Hent oplægget som PDF</button>');
    pdf.onclick = function () { window.print(); };
    knapper.appendChild(pdf);
    boks.appendChild(knapper);
    f.replaceWith(boks);
    s.sendt = true;
    opdater();
  }

  hent();
  bind();
  document.getElementById('m2').value = s.stand.m2;
  document.getElementById('dage').value = s.team.dage;
  document.getElementById('messedato').value = s.messe.dato || '';
  document.getElementById('km').value = s.messe.ukendt && s.messe.km ? s.messe.km : '';
  gaaTil(0);
})();
