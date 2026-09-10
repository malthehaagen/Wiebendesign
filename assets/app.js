/* =====================================================================
   Wieben Design — Standberegner
   Al logik. Priser i pricing.js, tekster i content.js.
   ===================================================================== */
(function () {
  'use strict';

  var P = window.WD_PRIS;
  var C = window.WD_INDHOLD;
  var TRIN = ['Start', 'Profil', 'Standen', 'Inventar', 'Messeklar', 'Oplæg'];
  var GEM = 'wd-standberegner-v2';

  var s = {
    trin: 0,
    profil: { formaal: null, erfaring: null, ambition: null },
    messe: { id: 'agromek', lokation: 'dk', dato: '', km: 130, bro: false },
    stand: {
      m2: 24, aabneSider: 1, vaegtype: 'print', vaeghoejde: 3,
      grafik: 'fuld', gulv: 'taeppe', haevet: false, belysning: 'forstaerket', rig: false
    },
    kurv: {},
    kurvRoert: false,
    team: { personer: 3, dage: 3 },
    egne: { dagsats: P.egne.dagsatsStandard }
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

  function vaegpris() {
    var g = geometri();
    if (!g.vaegLbm) return { konstruktion: 0, print: 0 };
    var daekning = P.grafikdaekning[s.stand.grafik];
    if (s.stand.vaegtype === 'pixlip') {
      return {
        konstruktion: g.vaegLbm * P.vaeg.pixlipPrLbm * (s.stand.vaeghoejde / 3),
        print: g.vaegAreal * daekning * P.vaeg.pixlipPrintPrM2
      };
    }
    var h = P.vaeg.hoejder.filter(function (x) { return x.m === s.stand.vaeghoejde; })[0] || P.vaeg.hoejder[2];
    return {
      konstruktion: g.vaegLbm * (h.frame + h.pvc),
      print: g.vaegAreal * daekning * P.vaeg.printPrM2
    };
  }

  function rigpris() {
    if (!s.stand.rig) return 0;
    var g = geometri();
    var print = s.stand.grafik === 'ingen' ? 0 : g.omkreds * P.rig.frisehoejde * P.vaeg.printPrM2;
    return g.omkreds * P.rig.trussPrLbm + print;
  }

  function belysningspris() {
    var b = P.belysning[s.stand.belysning];
    return Math.ceil(s.stand.m2 / b.m2PrSpot) * b.prSpot;
  }

  function gulvpris() {
    return s.stand.m2 * (P.gulv[s.stand.gulv] + (s.stand.haevet ? P.haevetGulv : 0));
  }

  function inventarLinjer() {
    var ud = [];
    Object.keys(s.kurv).forEach(function (id) {
      var antal = s.kurv[id];
      var l = vare(id);
      if (!antal || !l) return;
      ud.push({ id: id, antal: antal, navn: C.varer[id].navn, pris: antal * l.leje });
    });
    return ud;
  }

  function projektstyring() {
    return P.projektstyring.filter(function (t) { return s.stand.m2 <= t.tilM2; })[0].pris;
  }

  function montage() {
    var m = P.montage, m2 = s.stand.m2, km = s.messe.km;
    var montoerer = Math.max(m.minMontoerer, Math.ceil(m2 / m.m2PrMontoer));
    var op = [Math.max(m.minMandtimer, m2 * m.mandtimerPrM2[0]), Math.max(m.minMandtimer, m2 * m.mandtimerPrM2[1])];
    var ned = iv.gang(op, m.nedtagningsandel);
    var vaerksted = iv.tal(Math.max(4, m2 * m.vaerkstedPrM2));
    var timer = iv.sum([op, ned, vaerksted]);
    var linjer = [{ navn: 'Opbygning, nedtagning og pakning', pris: iv.gang(timer, m.timepris),
                    note: Math.round(timer[0]) + '–' + Math.round(timer[1]) + ' mandtimer, ' + montoerer + ' montører' }];

    if (s.messe.lokation === 'oversoeisk') {
      linjer.push({ navn: 'Oversøisk fragt', pris: m.oversoeiskFragt.slice(), note: 'efter aftale med speditør' });
      linjer.push({ navn: 'Fly, montører', pris: iv.tal(m.flybillet * montoerer) });
      linjer.push({ navn: 'Ophold og fortæring', pris: iv.tal(m.overnatning * montoerer * 5 + m.fortaering * montoerer * 6) });
    } else if (km > m.egenkoerselMaxKm) {
      linjer.push({ navn: 'Fragt tur/retur', pris: [km * m.fragtPrKm[0], km * m.fragtPrKm[1]], note: km + ' km med speditør' });
      linjer.push({ navn: 'Fly, montører', pris: iv.tal(m.flybillet * montoerer) });
      linjer.push({ navn: 'Ophold og fortæring', pris: iv.tal(m.overnatning * montoerer * 4 + m.fortaering * montoerer * 5) });
    } else {
      var ture = 4;                                   /* ud og hjem, to gange */
      var koeretimer = (km / m.kmPrTime) * ture * montoerer;
      linjer.push({ navn: 'Kørsel og køretid', pris: iv.tal(
        koeretimer * m.timepris + km * m.lastbilPrKm * 2 + km * m.kmPengePrKm * ture +
        (s.messe.bro ? m.broafgift * ture : 0)),
        note: km + ' km, ' + Math.round(koeretimer) + ' køretimer' });
      var naetter = km <= 200 ? 0 : 2;
      var dage = km <= 200 ? 2 : 3;
      if (naetter || dage) linjer.push({ navn: 'Ophold og fortæring',
        pris: iv.tal(m.overnatning * montoerer * naetter + m.fortaering * montoerer * dage) });
    }
    linjer.push({ navn: 'Forsikring af transporten', pris: iv.tal(m.forsikring) });
    return linjer;
  }

  function beregn() {
    var v = vaegpris();
    var inv = inventarLinjer();
    var invSum = inv.reduce(function (a, l) { return a + l.pris; }, 0);

    var materiel = [
      { navn: 'Projektstyring', pris: iv.tal(projektstyring()), note: 'tegning, møder og bestillinger' },
    ];
    if (v.konstruktion) materiel.push({
      navn: (s.stand.vaegtype === 'pixlip' ? 'Pixlip lysvæg' : 'beMatrix vægge'), pris: iv.tal(v.konstruktion),
      note: dec(Math.round(geometri().vaegLbm * 10) / 10) + ' lbm i ' + String(s.stand.vaeghoejde).replace('.', ',') + ' m'
    });
    if (v.print) materiel.push({ navn: 'Print og grafik', pris: iv.tal(v.print),
      note: Math.round(geometri().vaegAreal * P.grafikdaekning[s.stand.grafik]) + ' m² print' });
    if (gulvpris()) materiel.push({ navn: 'Gulv' + (s.stand.haevet ? ', hævet' : ''), pris: iv.tal(gulvpris()), note: s.stand.m2 + ' m²' });
    materiel.push({ navn: 'Belysning', pris: iv.tal(belysningspris()),
      note: Math.ceil(s.stand.m2 / P.belysning[s.stand.belysning].m2PrSpot) + ' spots' });
    if (rigpris()) materiel.push({ navn: 'Truss-rig med frise', pris: iv.tal(rigpris()) });
    if (invSum) materiel.push({ navn: 'Inventar og udstyr', pris: iv.tal(invSum),
      note: inv.length + (inv.length === 1 ? ' post' : ' poster') });

    var mont = montage();
    var wiebenLinjer = materiel.concat(mont);
    var wieben = iv.sum(wiebenLinjer.map(function (l) { return l.pris; }));

    /* Messecenteret */
    var m2 = s.stand.m2;
    var trin = P.messecenter.standlejeTrin.filter(function (t) { return m2 <= t.tilM2; })[0];
    var leje = iv.gang(iv.gang(trin.perM2, m2), 1 + P.messecenter.aabenSideTillaegPct[s.stand.aabneSider]);
    var mcLinjer = [
      { navn: 'Standleje, ' + m2 + ' m²', pris: leje },
      { navn: 'Tilmeldingsgebyr', pris: P.messecenter.tilmeldingsgebyr.slice() },
      { navn: 'El, vand og internet', pris: P.messecenter.forsyning.slice() }
    ];
    var messecenter = iv.sum(mcLinjer.map(function (l) { return l.pris; }));

    /* Kundens egne — ren illustration */
    var pd = s.team.personer * s.team.dage;
    var egneLinjer = [
      { navn: 'Bemanding, ' + pd + ' persondage', pris: iv.tal(pd * s.egne.dagsats) },
      { navn: 'Rejse og ophold', pris: iv.tal(pd * P.egne.rejseOphold[s.messe.lokation]) },
      { navn: 'Invitationer og materialer', pris: P.egne.markedsfoering.slice() }
    ];
    var egne = iv.sum(egneLinjer.map(function (l) { return l.pris; }));

    var leads = iv.gang(P.leads.prM2PrDag.slice(), m2 * s.team.dage);

    return {
      wiebenLinjer: wiebenLinjer, wieben: wieben,
      mcLinjer: mcLinjer, messecenter: messecenter,
      egneLinjer: egneLinjer, egne: egne,
      total: iv.sum([wieben, messecenter, egne]),
      leads: [Math.round(leads[0]), Math.round(leads[1])],
      prLead: [wieben[0] / Math.max(1, Math.round(leads[1])), wieben[1] / Math.max(1, Math.round(leads[0]))]
    };
  }

  /* ---------- Forslag til pakke ---------- */
  function foreslaaPakke() {
    var m2 = s.stand.m2, f = s.profil.formaal, k = {};
    function s2(id, n) { if (n > 0) k[id] = n; }
    s2('expo_bar', 1);
    s2('abc_reol', 1);
    s2('depot_bord', 1);
    s2('affald', 1);
    s2('eltavle32', 1);
    s2('brochure', 1);
    s2('nespresso_l', 1);
    s2('papkrus', Math.max(1, Math.round(m2 / 20)));
    s2('barstol', 2);
    s2('staabord', Math.max(1, Math.floor(m2 / 16)));
    s2('skalstol', Math.max(2, Math.floor(m2 / 10)));
    if (m2 >= 20) { s2('mon55', 1); s2('afspiller', 1); } else { s2('mon43', 1); }
    if (m2 >= 30) { s2('expo_skab', 1); s2('koeleskab_l', 1); }
    if (m2 >= 45) { s2('vitrine', 1); s2('nespresso_s', 1); k.nespresso_l = 0; }
    if (f === 'relationer') { s2('cafebord', 1); s2('stol_arm', 4); }
    if (f === 'lancering') { s2('vitrine', 1); }
    if (f === 'brand' && m2 >= 24) { k.mon55 = 0; s2('mon65', 1); }
    Object.keys(k).forEach(function (id) { if (!k[id]) delete k[id]; });
    return k;
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
  function visTrin() {
    var ol = document.createElement('ol');
    TRIN.forEach(function (navn, i) {
      var li = document.createElement('li');
      li.textContent = (i > 0 ? i + '. ' : '') + navn;
      if (i === s.trin) li.className = 'aktiv';
      else if (i < s.trin) { li.className = 'gjort klikbar'; li.onclick = function () { gaaTil(i); }; }
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
    document.getElementById('videre-profil').disabled =
      !Object.keys(s.profil).every(function (k) { return s.profil[k]; });
  }

  function visAnbefaling() {
    var a = anbefal();
    document.getElementById('anbefaling').innerHTML =
      '<span class="mrk">Vores råd til jer</span>' +
      '<p>' + esc(a.tekst) + '</p>' +
      '<p class="anb-sub">' + esc(a.stoerrelse) + ' ' + esc(a.niveau) + '</p>';
  }

  function visMesser() {
    var sel = document.getElementById('messe');
    if (!sel.options.length) {
      C.messer.forEach(function (m) {
        var o = document.createElement('option');
        o.value = m.id; o.textContent = m.navn + ' — ' + m.sted;
        sel.appendChild(o);
      });
    }
    sel.value = s.messe.id;
    var m = C.messer.filter(function (x) { return x.id === s.messe.id; })[0];
    document.getElementById('messe-hjaelp').textContent = {
      dk: 'Vi kører selv ud fra Støvring — ca. ' + m.km + ' km hver vej.',
      norden: 'Norden. Materiellet sendes med speditør, og montørerne flyver.',
      eu: 'Europa. Materiellet sendes med speditør, og montørerne flyver.',
      oversoeisk: 'Oversøisk. Vi har lager i USA og har bygget på 72 destinationer på 5 kontinenter — fragten aftales konkret.'
    }[m.lokation];
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
      'Det giver ca. ' + dec(Math.round(g.vaegLbm * 10) / 10) + ' løbende meter væg — ' +
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
        meta: '<span class="card-pris">' + fmtKort(iv.tal(pris.konstruktion + pris.print)) + ' kr.</span> for jeres stand',
        klik: function () { s.stand.vaegtype = id; opdater(); }
      }));
    });
  }

  function seg(id, valg, aktiv, klik) {
    var v = document.getElementById(id);
    v.innerHTML = '';
    valg.forEach(function (o) {
      var b = el('<button type="button" class="seg-btn">' + esc(o.titel) + '</button>');
      if (o.vaerdi === aktiv) b.classList.add('valgt');
      b.onclick = function () { klik(o.vaerdi); };
      v.appendChild(b);
    });
  }

  function visValg() {
    seg('vaeghoejde', P.vaeg.hoejder.map(function (h) {
      return { vaerdi: h.m, titel: String(h.m).replace('.', ',') + ' m' };
    }), s.stand.vaeghoejde, function (v) { s.stand.vaeghoejde = v; opdater(); });

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
    document.getElementById('haevet').checked = s.stand.haevet;
    document.getElementById('haevet-pris').textContent =
      ' · ' + nf.format(P.haevetGulv) + ' kr./m², i alt ' + kr(P.haevetGulv * s.stand.m2) + ' kr.';

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

    document.getElementById('rig').checked = s.stand.rig;
    var gemt = s.stand.rig; s.stand.rig = true;
    var rp = rigpris(); s.stand.rig = gemt;
    document.getElementById('rig-pris').textContent = ' · ' + kr(rp) + ' kr.';
  }

  function visKatalog() {
    var v = document.getElementById('katalog');
    v.innerHTML = '';
    C.katalogGrupper.forEach(function (gr) {
      v.appendChild(el('<h3 class="grp-title">' + esc(gr.titel) + '</h3>'));
      var liste = el('<div class="varer"></div>');
      P.katalog[gr.id].forEach(function (l) {
        var t = C.varer[l.id];
        var antal = s.kurv[l.id] || 0;
        var r = el('<div class="vare' + (antal ? ' valgt' : '') + '"></div>');
        r.appendChild(el('<span class="vare-ill">' + C.svg[t.ikon] + '</span>'));
        r.appendChild(el('<span class="vare-tekst"><strong>' + esc(t.navn) + '</strong><em>' + esc(t.besk) + '</em></span>'));
        r.appendChild(el('<span class="vare-pris">' + nf.format(l.leje) + ' kr.</span>'));
        var st = el('<span class="stepper"></span>');
        var minus = el('<button type="button" aria-label="Færre">−</button>');
        minus.disabled = !antal;
        minus.onclick = function () { saetAntal(l.id, antal - 1); };
        var plus = el('<button type="button" aria-label="Flere">+</button>');
        plus.onclick = function () { saetAntal(l.id, antal + 1); };
        st.appendChild(minus);
        st.appendChild(el('<span class="antal">' + antal + '</span>'));
        st.appendChild(plus);
        r.appendChild(st);
        liste.appendChild(r);
      });
      v.appendChild(liste);
    });

    var inv = inventarLinjer();
    var sum = inv.reduce(function (a, l) { return a + l.pris; }, 0);
    document.getElementById('forslag').innerHTML =
      '<div class="forslag-tekst"><strong>' + (inv.length ? 'Vi har sat et forslag op ud fra jeres profil' : 'Ingen poster valgt endnu') + '</strong>' +
      '<span>' + (inv.length
        ? inv.length + ' poster til ' + kr(sum) + ' kr. for hele messen. Ret frit i det — det er kun et udgangspunkt.'
        : 'Vælg selv herunder, eller lad os foreslå en pakke.') + '</span></div>';
    var knap = el('<button type="button" class="btn">' + (inv.length ? 'Nulstil til vores forslag' : 'Foreslå en pakke') + '</button>');
    knap.onclick = function () { s.kurv = foreslaaPakke(); opdater(); };
    document.getElementById('forslag').appendChild(knap);
  }

  function saetAntal(id, n) {
    s.kurvRoert = true;
    if (n <= 0) delete s.kurv[id]; else s.kurv[id] = n;
    opdater();
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

  function visBudget3() {
    var r = beregn();
    var v = document.getElementById('budget3');
    v.innerHTML = '';

    function kolonne(o) {
      var k = el('<div class="bkol ' + (o.klasse || '') + '"></div>');
      if (o.badge) k.appendChild(el('<span class="bkol-badge">' + esc(o.badge) + '</span>'));
      k.appendChild(el('<h3>' + esc(o.titel) + '</h3>'));
      k.appendChild(el('<p class="bkol-hvem">' + esc(o.hvem) + '</p>'));
      var ul = el('<ul></ul>');
      o.linjer.forEach(function (l) {
        ul.appendChild(el('<li><span>' + esc(l.navn) +
          (l.note ? '<em>' + esc(l.note) + '</em>' : '') + '</span><span>' + fmtKort(l.pris) + '</span></li>'));
      });
      k.appendChild(ul);
      if (o.ekstra) k.appendChild(o.ekstra);
      k.appendChild(el('<div class="bkol-sum"><span>I alt</span><span>' + fmtKort(o.sum) + ' kr.</span></div>'));
      if (o.fod) k.appendChild(el('<p class="bkol-fod">' + esc(o.fod) + '</p>'));
      return k;
    }

    v.appendChild(kolonne({
      titel: 'Wieben Design leverer', hvem: 'Faktureres af os — beregnet på vores egne lejepriser',
      linjer: r.wiebenLinjer, sum: r.wieben,
      fod: 'Spændet skyldes montagetimerne, som først kan fastlægges på en godkendt tegning.'
    }));

    v.appendChild(kolonne({
      titel: 'Messecenteret opkræver', hvem: 'Betales direkte til arrangøren', badge: 'Anslået',
      linjer: r.mcLinjer, sum: r.messecenter,
      fod: 'Arrangørernes priser svinger fra messe til messe. Tallene her er markedsniveau, ikke et tilbud.'
    }));

    var indstil = el('<div class="dagsats"></div>');
    indstil.appendChild(el('<label for="dagsats">Jeres interne dagsats pr. person</label>'));
    var inp = el('<input type="number" id="dagsats" min="0" step="100" value="' + s.egne.dagsats + '">');
    inp.onchange = function () { s.egne.dagsats = Math.max(0, Number(inp.value) || 0); opdater(); };
    indstil.appendChild(inp);
    indstil.appendChild(el('<span>kr.</span>'));

    v.appendChild(kolonne({
      titel: 'I står selv for', hvem: 'Vores gæt, ikke jeres tal', badge: 'Groft estimat',
      klasse: 'gaet', linjer: r.egneLinjer, sum: r.egne, ekstra: indstil,
      fod: 'Vi kender ikke jeres lønninger, rejsepolitik eller markedsføringsbudget. Posterne står med, så I ikke glemmer dem — ret dagsatsen til jeres egen, og betragt resten som en huskeliste frem for et beløb.'
    }));

    document.getElementById('samlet').innerHTML =
      '<h3>Hele messen: ' + fmtKort(r.total) + ' kr.</h3>' +
      '<p>Heraf ' + fmtKort(r.wieben) + ' kr. til os. Med ' + s.stand.m2 + ' m² og ' + s.team.dage +
      ' messedage er et realistisk mål ' + r.leads[0] + '–' + r.leads[1] + ' kvalificerede leads — ' +
      fmtKort(r.prLead) + ' kr. pr. lead i standomkostning.</p>' +
      '<p class="disclaimer">Beregnet på Wieben Designs egne lejepriser. Tallene for messecenteret og jeres egne omkostninger er skøn.</p>';
  }

  function visTidslinje() {
    var v = document.getElementById('tidslinje');
    v.innerHTML = '';
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
      p.appendChild(el('<div class="tl-dato">' + esc(naar) + '</div>'));
      p.appendChild(el('<div class="tl-titel">' + esc(t.titel) + '</div>'));
      p.appendChild(el('<p class="tl-tekst">' + esc(t.tekst) + '</p>'));
      v.appendChild(p);
    });
  }

  function visOpsummering() {
    var r = beregn();
    var m = C.messer.filter(function (x) { return x.id === s.messe.id; })[0];
    var inv = inventarLinjer();
    var g = geometri();
    function linje(k, v) { return '<div class="ops-linje"><dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd></div>'; }

    document.getElementById('opsummering').innerHTML =
      '<dl class="ops-grid">' +
      linje('Messe', m.navn + (s.messe.dato ? ' · ' + new Date(s.messe.dato).toLocaleDateString('da-DK') : '')) +
      linje('Formål', (C.profilSpoergsmaal[0].valg.filter(function (x) { return x.id === s.profil.formaal; })[0] || {}).titel || '—') +
      linje('Areal', s.stand.m2 + ' m²') +
      linje('Åbne sider', s.stand.aabneSider) +
      linje('Vægge', C.vaegtyper[s.stand.vaegtype].titel + ', ' + dec(Math.round(g.vaegLbm * 10) / 10) + ' lbm i ' + String(s.stand.vaeghoejde).replace('.', ',') + ' m') +
      linje('Grafik', C.grafikdaekning[s.stand.grafik].titel) +
      linje('Gulv', C.gulv[s.stand.gulv].titel + (s.stand.haevet ? ', hævet' : '')) +
      linje('Belysning', C.belysning[s.stand.belysning].titel + (s.stand.rig ? ' · truss-rig' : '')) +
      linje('Bemanding', s.team.personer + ' personer i ' + s.team.dage + ' dage') +
      linje('Forventede leads', r.leads[0] + '–' + r.leads[1]) +
      '</dl>' +
      '<div class="ops-inventar"><dt>Inventar</dt><dd>' +
      esc(inv.length ? inv.map(function (l) { return l.antal + ' × ' + l.navn; }).join(' · ') : 'Ingen poster') +
      '</dd></div>' +
      '<div class="ops-pris"><span>Estimat, Wieben Design — leje for hele messen, ekskl. moms</span>' +
      '<strong>' + fmt(r.wieben) + '</strong>' +
      '<span>Messecenteret opkræver anslået ' + fmtKort(r.messecenter) + ' kr. oveni. Jeres egne interne omkostninger er ikke medregnet her.</span></div>';
  }

  function visPrisbar() {
    var bar = document.getElementById('prisbar');
    bar.hidden = s.trin < 2;
    if (bar.hidden) return;
    var r = beregn();
    document.getElementById('prisbar-belob').textContent = fmt(r.wieben).replace(' kr.', '');
    var h = '<ul>';
    r.wiebenLinjer.forEach(function (l) {
      h += '<li><span>' + esc(l.navn) + (l.note ? '<em>' + esc(l.note) + '</em>' : '') +
        '</span><span>' + fmtKort(l.pris) + '</span></li>';
    });
    h += '<li class="sum"><span>Wieben Design i alt</span><span>' + fmtKort(r.wieben) + ' kr.</span></li></ul>' +
      '<p class="disclaimer">Leje for hele messen, ekskl. moms, beregnet på Wieben Designs egne priser. Messecenterets standleje og jeres egne omkostninger ligger uden for beløbet — se trin 4.</p>';
    document.getElementById('prisbar-detalje').innerHTML = h;
  }

  /* =====================================================================
     OPDATERING OG NAVIGATION
     ===================================================================== */
  function opdater() {
    document.getElementById('m2-ud').textContent = s.stand.m2 + ' m²';
    document.getElementById('personer-ud').textContent = s.team.personer + (s.team.personer === 1 ? ' person' : ' personer');
    document.getElementById('dage-ud').textContent = s.team.dage + (s.team.dage === 1 ? ' dag' : ' dage');

    var sider = Math.max(2, Math.round(Math.sqrt(s.stand.m2 * 1.5)));
    document.getElementById('m2-hjaelp').textContent =
      'Ca. ' + sider + ' × ' + Math.max(2, Math.round(s.stand.m2 / sider)) + ' meter · plads til omkring ' +
      Math.max(1, Math.round(s.stand.m2 / 8)) + ' samtidige samtaler.';
    document.getElementById('personer-hjaelp').textContent =
      'Vi anbefaler ' + Math.max(2, Math.ceil(s.stand.m2 / P.leads.m2PrPerson)) + ' personer på ' + s.stand.m2 + ' m² i åbningstiden.';

    visTrin();
    visProfil();
    visAnbefaling();
    visMesser();
    visAabneSider();
    visVaegtyper();
    visValg();
    visKatalog();
    visIndsigter('indsigter-2', 2);
    visIndsigter('indsigter-3', 3);
    visBudget3();
    visTidslinje();
    visOpsummering();
    visPrisbar();
    gem();
  }

  function gaaTil(n) {
    s.trin = Math.max(0, Math.min(TRIN.length - 1, n));
    if (s.trin === 3 && !s.kurvRoert && !Object.keys(s.kurv).length) s.kurv = foreslaaPakke();
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
        kurv: s.kurv, kurvRoert: s.kurvRoert, team: s.team, egne: s.egne
      }));
    } catch (e) { /* privat browsing */ }
  }

  function hent() {
    try {
      var raa = localStorage.getItem(GEM);
      if (!raa) return;
      var g = JSON.parse(raa);
      ['profil', 'messe', 'stand', 'kurv', 'team', 'egne'].forEach(function (k) { if (g[k]) s[k] = g[k]; });
      if (g.kurvRoert) s.kurvRoert = true;
    } catch (e) { /* ignorer ugyldigt gemt data */ }
  }

  function bind() {
    document.addEventListener('click', function (e) {
      var g = e.target.closest('[data-goto]');
      if (g && !g.disabled) gaaTil(Number(g.dataset.goto));
    });

    document.getElementById('messe').addEventListener('change', function (e) {
      var m = C.messer.filter(function (x) { return x.id === e.target.value; })[0];
      s.messe = { id: m.id, lokation: m.lokation, dato: s.messe.dato, km: m.km, bro: m.bro };
      s.team.dage = m.dage;
      document.getElementById('dage').value = m.dage;
      opdater();
    });
    document.getElementById('messedato').addEventListener('change', function (e) {
      s.messe.dato = e.target.value; opdater();
    });

    function slider(id, saet) {
      document.getElementById(id).addEventListener('input', function (e) { saet(Number(e.target.value)); opdater(); });
    }
    slider('m2', function (v) { s.stand.m2 = v; });
    slider('personer', function (v) { s.team.personer = v; });
    slider('dage', function (v) { s.team.dage = v; });

    document.getElementById('haevet').addEventListener('change', function (e) { s.stand.haevet = e.target.checked; opdater(); });
    document.getElementById('rig').addEventListener('change', function (e) { s.stand.rig = e.target.checked; opdater(); });

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
      var f = e.target;
      if (!f.checkValidity()) { f.reportValidity(); return; }
      var r = beregn();
      console.log('Oplæg klar til afsendelse:', {
        kontakt: Object.fromEntries(new FormData(f).entries()),
        konfiguration: { profil: s.profil, messe: s.messe, stand: s.stand, kurv: s.kurv, team: s.team },
        estimat: { wieben: r.wieben, messecenter: r.messecenter }
      });
      f.replaceWith(el('<div class="kvittering">Tak — jeres oplæg er klar. I en færdig løsning ville det nu ligge i Wieben Designs indbakke sammen med hele konfigurationen, og I ville høre fra os inden for en arbejdsdag.</div>'));
    });
  }

  hent();
  bind();
  document.getElementById('m2').value = s.stand.m2;
  document.getElementById('personer').value = s.team.personer;
  document.getElementById('dage').value = s.team.dage;
  document.getElementById('messedato').value = s.messe.dato || '';
  gaaTil(0);
})();
