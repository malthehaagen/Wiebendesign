/* =====================================================================
   Wieben Design — Standberegner (prototype)
   Al logik. Priser ligger i pricing.js, tekster i content.js.
   ===================================================================== */
(function () {
  'use strict';

  var P = window.WD_PRIS;
  var C = window.WD_INDHOLD;
  var TRIN = ['Start', 'Profil', 'Standen', 'Tilvalg', 'Genbrug', 'Messeklar', 'Oplæg'];
  var GEM = 'wd-standberegner-v1';

  /* ---------- Tilstand ---------- */
  var s = {
    trin: 0,
    profil: { formaal: null, frekvens: null, nuvaerende: null, ambition: null },
    messe: { id: 'agromek', lokation: 'dk', dato: '' },
    stand: { type: null, typeValgtManuelt: false, aabenhed: 'raekke', m2: 24 },
    tilvalg: new Set(['gulv', 'grafik']),
    team: { personer: 3, dage: 3 },
    tco: { antalMesser: 3 }
  };

  /* ---------- Intervalregning ---------- */
  var iv = {
    nul: function () { return [0, 0]; },
    add: function (a, b) { return [a[0] + b[0], a[1] + b[1]]; },
    sum: function (liste) { return liste.reduce(iv.add, iv.nul()); },
    gang: function (a, f) { return [a[0] * f, a[1] * f]; },
    max: function (a, b) { return [Math.max(a[0], b[0]), Math.max(a[1], b[1])]; }
  };

  function afrund(v) {
    var r = P.meta.afrunding || 500;
    return Math.round(v / r) * r;
  }
  var nf = new Intl.NumberFormat('da-DK');
  function kr(v) { return nf.format(afrund(v)); }
  function fmt(a) {
    if (!a || (a[0] === 0 && a[1] === 0)) return '—';
    if (afrund(a[0]) === afrund(a[1])) return kr(a[0]) + ' kr.';
    return kr(a[0]) + '–' + kr(a[1]) + ' kr.';
  }
  function fmtKort(a) {
    if (!a) return '—';
    return kr(a[0]) + '–' + kr(a[1]);
  }
  function el(html) {
    var d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }
  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* =====================================================================
     BEREGNING
     ===================================================================== */
  function grundprisFor(type) {
    var st = P.standtyper[type];
    var g = iv.max(iv.gang(st.perM2, s.stand.m2), st.gulvpris);
    var f = P.aabenhed[s.stand.aabenhed] * P.ambition[s.profil.ambition || 'plus'];
    return iv.gang(g, f);
  }

  function tilvalgLinjer() {
    var ud = [];
    Object.keys(P.tilvalg).forEach(function (id) {
      if (!s.tilvalg.has(id)) return;
      var t = P.tilvalg[id];
      var pris = t.type === 'perM2' ? iv.gang(t.pris, s.stand.m2) : t.pris.slice();
      ud.push({ id: id, navn: C.tilvalg[id].navn, pris: pris });
    });
    return ud;
  }

  function ydelse(def, grundlag) {
    return iv.max([grundlag[0] * def.pct[0], grundlag[1] * def.pct[1]], def.min);
  }

  function beregn() {
    var type = s.stand.type || anbefal().type;
    var grund = grundprisFor(type);
    var tv = tilvalgLinjer();
    var tvSum = iv.sum(tv.map(function (l) { return l.pris; }));
    var byg = iv.add(grund, tvSum);

    var design = ydelse(P.ydelser.design, byg);
    var projekt = ydelse(P.ydelser.projektledelse, byg);
    var montage = ydelse(P.ydelser.montage, byg);
    var transport = P.transport[s.messe.lokation].slice();
    var engangsmesse = s.profil.frekvens === '1' || s.profil.frekvens === 'foerste';
    var opbevaring = engangsmesse ? iv.nul() : P.opbevaring[type].slice();

    var wiebenLinjer = [
      { navn: C.standtyper[type].navn + ', ' + s.stand.m2 + ' m²', pris: grund }
    ].concat(tv.map(function (l) { return { navn: l.navn, pris: l.pris }; }), [
      { navn: 'Design, 3D og tegninger', pris: design },
      { navn: 'Projektledelse og koordinering', pris: projekt },
      { navn: 'Opbygning og nedtagning', pris: montage },
      { navn: 'Transport tur/retur', pris: transport }
    ]);
    if (opbevaring[1] > 0) wiebenLinjer.push({ navn: 'Opbevaring til næste messe', pris: opbevaring });

    var wieben = iv.sum(wiebenLinjer.map(function (l) { return l.pris; }));

    /* Messecenteret */
    var m2 = s.stand.m2;
    var trin = P.messecenter.standlejeTrin.filter(function (t) { return m2 <= t.tilM2; })[0];
    var leje = iv.gang(iv.gang(trin.perM2, m2), 1 + P.messecenter.aabenSideTillaegPct[s.stand.aabenhed]);
    var mcLinjer = [
      { navn: 'Standleje, ' + m2 + ' m²', pris: leje },
      { navn: 'Tilmeldingsgebyr', pris: P.messecenter.tilmeldingsgebyr },
      { navn: 'El-tilslutning', pris: P.messecenter.el },
      { navn: 'Vand og afløb', pris: P.messecenter.vand }
    ];
    var messecenter = iv.sum(mcLinjer.map(function (l) { return l.pris; }));

    /* Kunden selv */
    var pd = s.team.personer * s.team.dage;
    var egneLinjer = [
      { navn: 'Bemanding, ' + pd + ' persondage', pris: iv.gang(P.egne.bemandingPrPersonPrDag, pd) },
      { navn: 'Rejse og ophold', pris: iv.gang(P.egne.rejseOphold[s.messe.lokation], pd) },
      { navn: 'Invitationer og materialer', pris: P.egne.markedsfoering }
    ];
    var egne = iv.sum(egneLinjer.map(function (l) { return l.pris; }));

    var leads = iv.gang([P.leads.prM2PrDag[0], P.leads.prM2PrDag[1]], m2 * s.team.dage);

    return {
      type: type,
      grund: grund, byg: byg,
      wiebenLinjer: wiebenLinjer, wieben: wieben,
      mcLinjer: mcLinjer, messecenter: messecenter,
      egneLinjer: egneLinjer, egne: egne,
      total: iv.sum([wieben, messecenter, egne]),
      leads: [Math.round(leads[0]), Math.round(leads[1])],
      prLead: [wieben[0] / Math.max(1, leads[1]), wieben[1] / Math.max(1, leads[0])]
    };
  }

  /* TCO over flere messer, pr. standtype */
  function beregnTco(type, antal) {
    var st = P.standtyper[type];
    if (s.stand.m2 > st.maxM2) return null;

    var grund = grundprisFor(type);
    var tvSum = iv.sum(tilvalgLinjer().map(function (l) { return l.pris; }));
    var byg = iv.add(grund, tvSum);
    var foerste = iv.sum([
      byg,
      ydelse(P.ydelser.design, byg),
      ydelse(P.ydelser.projektledelse, byg),
      ydelse(P.ydelser.montage, byg),
      P.transport[s.messe.lokation]
    ]);

    var andel = P.genbrug[type].genbrugsandel;
    var genopbyg = [grund[0] * andel[0], grund[1] * andel[1]];
    var senere = iv.sum([
      genopbyg,
      ydelse(P.ydelser.projektledelse, genopbyg),
      ydelse(P.ydelser.montage, byg),
      P.transport[s.messe.lokation],
      P.opbevaring[type]
    ]);

    var total = iv.add(foerste, iv.gang(senere, antal - 1));
    return {
      type: type,
      foerste: foerste,
      senere: senere,
      total: total,
      prMesse: iv.gang(total, 1 / antal),
      materiale: Math.round(P.materialeforbrug[type] * s.stand.m2 * antal),
      note: P.genbrug[type].note
    };
  }

  /* Anbefaling ud fra profilen */
  function anbefal() {
    var p = s.profil, m2 = s.stand.m2;
    if (p.frekvens === 'foerste' && p.ambition !== 'signatur' && m2 <= 12) {
      return { type: 'portable', hvorfor: 'I skal prøve formatet af på en lille plads. En portabel stand koster mindst muligt at komme i gang med — og kan tages med videre til konferencer og kundebesøg.' };
    }
    if (p.ambition === 'signatur' && (p.formaal === 'brand' || p.formaal === 'lancering')) {
      return { type: 'specialbyg', hvorfor: 'I vil ejes af rummet, ikke tilpasse jer det. Når standen skal bære en position i markedet — og især ved en lancering — er specialbyg det eneste, der giver fuld kontrol over hver detalje.' };
    }
    if (p.frekvens === '4+' || p.frekvens === '2-3') {
      return { type: 'system', hvorfor: 'I er på flere messer om året. Et modulært beMatrix-system betaler sig typisk hjem allerede ved anden eller tredje messe, fordi rammerne bliver og kun grafikken skiftes — og standen kan skifte størrelse fra messe til messe.' };
    }
    if (m2 <= 12) {
      return { type: 'portable', hvorfor: 'På under 12 m² er en portabel løsning både hurtigst at rejse og billigst at transportere. I får mest muligt ud af en lille plads.' };
    }
    return { type: 'system', hvorfor: 'Et modulært system giver jer en ordentlig stand nu, uden at binde jer til én form. Skal I på flere messer senere, kan den samme ramme følge med og skifte udtryk.' };
  }

  /* Relevante faglige indsigter */
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
    v.innerHTML = '';
    v.appendChild(ol);
  }

  function visProfil() {
    var v = document.getElementById('profil');
    v.innerHTML = '';
    C.profilSpoergsmaal.forEach(function (sp) {
      var blok = el('<div class="field"></div>');
      blok.appendChild(el('<h3 class="grp-title">' + esc(sp.spoergsmaal) + '</h3>'));
      if (sp.hjaelp) blok.appendChild(el('<p class="field-hjaelp" style="margin:-6px 0 12px">' + esc(sp.hjaelp) + '</p>'));
      var kort = el('<div class="cards cards-4"></div>');
      sp.valg.forEach(function (valg) {
        var b = el('<button type="button" class="card"></button>');
        if (s.profil[sp.id] === valg.id) b.classList.add('valgt');
        b.appendChild(el('<span class="card-titel">' + esc(valg.titel) + '</span>'));
        b.appendChild(el('<span class="card-tekst">' + esc(valg.tekst) + '</span>'));
        b.onclick = function () {
          s.profil[sp.id] = valg.id;
          if (!s.stand.typeValgtManuelt) s.stand.type = null;
          opdater();
        };
        kort.appendChild(b);
      });
      blok.appendChild(kort);
      v.appendChild(blok);
    });
    var klar = Object.keys(s.profil).every(function (k) { return s.profil[k]; });
    document.querySelector('[data-next="1"]').disabled = !klar;
  }

  function visAnbefaling() {
    var a = anbefal();
    if (!s.stand.type) s.stand.type = a.type;
    var st = C.standtyper[a.type];
    document.getElementById('anbefaling').innerHTML =
      '<span class="mrk">Vores anbefaling til jer</span>' +
      '<h3>' + esc(st.navn) + '</h3>' +
      '<p>' + esc(a.hvorfor) + '</p>';
  }

  function visMesser() {
    var sel = document.getElementById('messe');
    if (sel.options.length === 0) {
      C.messer.forEach(function (m) {
        var o = document.createElement('option');
        o.value = m.id;
        o.textContent = m.navn + ' — ' + m.sted;
        sel.appendChild(o);
      });
    }
    sel.value = s.messe.id;
    var m = C.messer.filter(function (x) { return x.id === s.messe.id; })[0];
    var tekst = { dk: 'Transport inden for Danmark.', norden: 'Transport til Norden — regn med længere leveringsvindue.', eu: 'Transport i Europa. Vi håndterer told, indbæring og kontakten til messecenteret.', oversoeisk: 'Oversøisk. Vi har lager i USA og har bygget på 72 destinationer på 5 kontinenter.' }[m.lokation];
    document.getElementById('messe-hjaelp').textContent = tekst;
  }

  function visStandtyper() {
    var v = document.getElementById('standtyper');
    v.innerHTML = '';
    var anb = anbefal().type;
    Object.keys(C.standtyper).forEach(function (id) {
      var st = C.standtyper[id];
      var forStor = s.stand.m2 > P.standtyper[id].maxM2;
      var b = el('<button type="button" class="card"></button>');
      if (s.stand.type === id) b.classList.add('valgt');
      b.appendChild(el('<span class="ill">' + C.svg[id] + '</span>'));
      b.appendChild(el('<span class="card-titel">' + esc(st.navn) + (id === anb ? ' · anbefalet' : '') + '</span>'));
      b.appendChild(el('<span class="card-tekst">' + esc(st.tekst) + '</span>'));
      b.appendChild(el('<span class="card-meta">' + esc(forStor ? 'Kan ikke bygges på ' + s.stand.m2 + ' m²' : st.passer) + '</span>'));
      if (forStor) { b.disabled = true; b.style.opacity = '.45'; }
      else b.onclick = function () { s.stand.type = id; s.stand.typeValgtManuelt = true; opdater(); };
      v.appendChild(b);
    });
  }

  function visAabenhed() {
    var v = document.getElementById('aabenhed');
    v.innerHTML = '';
    Object.keys(C.aabenhed).forEach(function (id) {
      var a = C.aabenhed[id];
      var b = el('<button type="button" class="card"></button>');
      if (s.stand.aabenhed === id) b.classList.add('valgt');
      b.appendChild(el('<span class="ill">' + C.svg[id] + '</span>'));
      b.appendChild(el('<span class="card-titel">' + esc(a.navn) + '</span>'));
      b.appendChild(el('<span class="card-tekst">' + esc(a.tekst) + '</span>'));
      b.onclick = function () { s.stand.aabenhed = id; opdater(); };
      v.appendChild(b);
    });
  }

  function visTilvalg() {
    var v = document.getElementById('tilvalg');
    v.innerHTML = '';
    Object.keys(P.tilvalg).forEach(function (id) {
      var pris = P.tilvalg[id];
      if (pris.minM2 && s.stand.m2 < pris.minM2) return;
      var t = C.tilvalg[id];
      var belob = pris.type === 'perM2' ? iv.gang(pris.pris, s.stand.m2) : pris.pris;
      var b = el('<button type="button" class="card"></button>');
      if (s.tilvalg.has(id)) b.classList.add('valgt');
      b.appendChild(el('<span class="ill">' + C.svg[id] + '</span>'));
      b.appendChild(el('<span class="card-titel">' + esc(t.navn) + '</span>'));
      b.appendChild(el('<span class="card-tekst">' + esc(t.tekst) + '</span>'));
      b.appendChild(el('<span class="card-meta"><span class="card-pris">' + fmtKort(belob) + ' kr.</span></span>'));
      b.onclick = function () {
        if (s.tilvalg.has(id)) s.tilvalg.delete(id); else s.tilvalg.add(id);
        opdater();
      };
      v.appendChild(b);
    });
  }

  function visIndsigter(id, antal) {
    var v = document.getElementById(id);
    if (!v) return;
    v.innerHTML = '';
    indsigter(antal).forEach(function (i) {
      v.appendChild(el(
        '<div class="indsigt">' +
        '<span class="indsigt-mrk">Fagligt tip</span>' +
        '<h4>' + esc(i.titel) + '</h4>' +
        '<p>' + esc(i.tekst) + '</p></div>'
      ));
    });
  }

  function visTco() {
    var antal = s.tco.antalMesser;
    var v = document.getElementById('tco');
    v.innerHTML = '';
    var alle = ['portable', 'system', 'specialbyg'].map(function (t) { return beregnTco(t, antal); })
      .filter(function (x) { return x; });
    var billigst = alle.slice().sort(function (a, b) { return a.prMesse[1] - b.prMesse[1]; })[0];

    alle.forEach(function (t) {
      var k = el('<div class="tco-kort"></div>');
      if (t.type === billigst.type && antal > 1) k.classList.add('bedst');
      if (t.type === billigst.type && antal > 1) k.appendChild(el('<span class="tco-badge">Laveste pris pr. messe</span>'));
      k.appendChild(el('<div class="tco-navn">' + esc(C.standtyper[t.type].navn) + '</div>'));
      k.appendChild(el('<div class="tco-tal">' + fmtKort(t.prMesse) + ' kr.</div>'));
      k.appendChild(el('<div class="tco-under">pr. messe over ' + antal + (antal === 1 ? ' messe' : ' messer') + '</div>'));
      var ul = el('<ul class="tco-linjer"></ul>');
      ul.appendChild(el('<li><span>Første messe</span><span>' + fmtKort(t.foerste) + '</span></li>'));
      ul.appendChild(el('<li><span>Hver følgende messe</span><span>' + fmtKort(t.senere) + '</span></li>'));
      ul.appendChild(el('<li><span>Samlet</span><span>' + fmtKort(t.total) + '</span></li>'));
      k.appendChild(ul);
      k.appendChild(el('<p class="tco-note">' + esc(t.note) + '</p>'));
      v.appendChild(k);
    });

    var udeladt = ['portable', 'system', 'specialbyg'].filter(function (t) {
      return s.stand.m2 > P.standtyper[t].maxM2;
    }).map(function (t) { return C.standtyper[t].navn.toLowerCase(); });
    if (udeladt.length) {
      v.appendChild(el('<p class="tco-udeladt" style="grid-column:1/-1">' +
        (udeladt.length === 1 ? 'En ' + udeladt[0] : udeladt.join(' og ')) +
        ' er ikke med i sammenligningen — den kan ikke bygges på ' + s.stand.m2 + ' m².</p>'));
    }

    /* Materialeregnskab: valgt type mod specialbyg */
    var valgt = alle.filter(function (t) { return t.type === s.stand.type; })[0] || alle[0];
    var special = beregnTco('specialbyg', antal);
    var g = document.getElementById('baeredygtighed');
    if (!special || valgt.type === 'specialbyg') {
      var sys = beregnTco('system', antal);
      if (!sys) { g.hidden = true; return; }
      g.hidden = false;
      g.innerHTML = '<h3>Hvad et modulært system ville spare</h3>' +
        '<p>Vælger I i stedet et beMatrix-system, genbruges rammerne messe efter messe. Over ' + antal + ' messer ser regnskabet sådan ud:</p>' +
        '<div class="grn-tal">' +
        '<div><strong>' + nf.format(valgt.materiale - sys.materiale) + ' kg</strong><span>mindre kasseret materiale</span></div>' +
        '<div><strong>' + fmtKort([valgt.total[0] - sys.total[0], valgt.total[1] - sys.total[1]]) + ' kr.</strong><span>forskel i samlet omkostning</span></div>' +
        '</div>';
      return;
    }
    g.hidden = false;
    g.innerHTML = '<h3>Genbrugsregnskabet</h3>' +
      '<p>Sådan står jeres valg — ' + esc(C.standtyper[valgt.type].navn.toLowerCase()) + ' — over for en stand, der bygges forfra hver gang, målt over ' + antal + ' messer.</p>' +
      '<div class="grn-tal">' +
      '<div><strong>' + nf.format(Math.max(0, special.materiale - valgt.materiale)) + ' kg</strong><span>mindre kasseret materiale</span></div>' +
      '<div><strong>' + fmtKort([Math.max(0, special.total[0] - valgt.total[0]), Math.max(0, special.total[1] - valgt.total[1])]) + ' kr.</strong><span>sparet over perioden</span></div>' +
      '<div><strong>' + antal + '×</strong><span>samme ramme genbrugt</span></div>' +
      '</div>';
  }

  function visBudget3() {
    var r = beregn();
    var v = document.getElementById('budget3');
    v.innerHTML = '';

    function kolonne(titel, hvem, linjer, sum, klasse) {
      var k = el('<div class="bkol ' + (klasse || '') + '"></div>');
      k.appendChild(el('<h3>' + esc(titel) + '</h3>'));
      k.appendChild(el('<p class="bkol-hvem">' + esc(hvem) + '</p>'));
      var ul = el('<ul></ul>');
      linjer.forEach(function (l) {
        ul.appendChild(el('<li><span>' + esc(l.navn) + '</span><span>' + fmtKort(l.pris) + '</span></li>'));
      });
      k.appendChild(ul);
      k.appendChild(el('<div class="bkol-sum"><span>I alt</span><span>' + fmtKort(sum) + ' kr.</span></div>'));
      return k;
    }

    v.appendChild(kolonne('Wieben Design leverer', 'Faktureres af os', r.wiebenLinjer, r.wieben));
    v.appendChild(kolonne('Messecenteret opkræver', 'Betales direkte til arrangøren', r.mcLinjer, r.messecenter));
    v.appendChild(kolonne('I står selv for', 'Interne omkostninger, som sjældent kommer med i budgettet', r.egneLinjer, r.egne, 'fremhaev'));

    var samlet = el('<div class="grn" style="margin-top:20px;grid-column:1/-1"></div>');
    samlet.innerHTML = '<h3>Hele messen koster ' + fmtKort(r.total) + ' kr.</h3>' +
      '<p>Med ' + s.stand.m2 + ' m² og ' + s.team.dage + ' messedage er et realistisk mål ' + r.leads[0] + '–' + r.leads[1] +
      ' kvalificerede leads. Det svarer til ' + fmtKort([r.prLead[0], r.prLead[1]]) + ' kr. pr. lead i standomkostning.</p>';
    v.appendChild(samlet);
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
    var tv = tilvalgLinjer().map(function (l) { return l.navn; });
    var tco = beregnTco(r.type, s.tco.antalMesser);
    var v = document.getElementById('opsummering');

    function linje(k, val) { return '<div class="ops-linje"><dt>' + esc(k) + '</dt><dd>' + esc(val) + '</dd></div>'; }

    v.innerHTML =
      '<dl class="ops-grid">' +
      linje('Messe', m.navn + (s.messe.dato ? ' · ' + new Date(s.messe.dato).toLocaleDateString('da-DK') : '')) +
      linje('Formål', (C.profilSpoergsmaal[0].valg.filter(function (x) { return x.id === s.profil.formaal; })[0] || {}).titel || '—') +
      linje('Standtype', C.standtyper[r.type].navn) +
      linje('Placering', C.aabenhed[s.stand.aabenhed].navn) +
      linje('Areal', s.stand.m2 + ' m²') +
      linje('Ambitionsniveau', (s.profil.ambition || '—').replace(/^./, function (c) { return c.toUpperCase(); })) +
      linje('Bemanding', s.team.personer + ' personer i ' + s.team.dage + ' dage') +
      linje('Forventede leads', r.leads[0] + '–' + r.leads[1]) +
      '</dl>' +
      '<div class="ops-linje" style="border:none;padding-top:14px"><dt>Indhold</dt><dd style="text-align:right;font-weight:400">' +
      esc(tv.length ? tv.join(' · ') : 'Ingen tilvalg') + '</dd></div>' +
      '<div class="ops-pris">' +
      '<span>Estimat, Wieben Design — ekskl. moms</span>' +
      '<strong>' + fmt(r.wieben) + '</strong>' +
      '<span>Hele messen inkl. standleje og interne omkostninger: ' + fmt(r.total) + '.' +
      (tco ? ' Over ' + s.tco.antalMesser + ' messer: ' + fmtKort(tco.prMesse) + ' kr. pr. messe.' : '') +
      '</span></div>';
  }

  function visPrisbar() {
    var bar = document.getElementById('prisbar');
    bar.hidden = s.trin < 2;
    if (bar.hidden) return;
    var r = beregn();
    document.getElementById('prisbar-belob').textContent = fmt(r.wieben).replace(' kr.', '');
    var d = document.getElementById('prisbar-detalje');
    var html = '<ul>';
    r.wiebenLinjer.forEach(function (l) {
      html += '<li><span>' + esc(l.navn) + '</span><span>' + fmtKort(l.pris) + '</span></li>';
    });
    html += '<li class="sum"><span>Wieben Design i alt</span><span>' + fmtKort(r.wieben) + ' kr.</span></li></ul>' +
      '<p class="disclaimer">Estimat baseret på brancheerfaring, ekskl. moms. Messecenterets standleje og jeres egne omkostninger ligger uden for dette beløb — se trin 5.</p>';
    d.innerHTML = html;
  }

  /* =====================================================================
     OPDATERING OG NAVIGATION
     ===================================================================== */
  function opdater() {
    document.getElementById('m2-ud').textContent = s.stand.m2 + ' m²';
    document.getElementById('personer-ud').textContent = s.team.personer + (s.team.personer === 1 ? ' person' : ' personer');
    document.getElementById('dage-ud').textContent = s.team.dage + (s.team.dage === 1 ? ' dag' : ' dage');
    document.getElementById('antalMesser-ud').textContent = s.tco.antalMesser + (s.tco.antalMesser === 1 ? ' messe' : ' messer');

    var sider = Math.round(Math.sqrt(s.stand.m2 * 1.5));
    document.getElementById('m2-hjaelp').textContent =
      'Ca. ' + sider + ' × ' + Math.round(s.stand.m2 / sider) + ' meter · plads til omkring ' +
      Math.max(1, Math.round(s.stand.m2 / 8)) + ' samtidige samtaler.';
    var anbPers = Math.max(2, Math.ceil(s.stand.m2 / P.leads.m2PrPerson));
    document.getElementById('personer-hjaelp').textContent =
      'Vi anbefaler ' + anbPers + ' personer på ' + s.stand.m2 + ' m² i åbningstiden.';

    if (s.stand.type && s.stand.m2 > P.standtyper[s.stand.type].maxM2) { s.stand.type = null; s.stand.typeValgtManuelt = false; }

    visTrin();
    visProfil();
    visAnbefaling();
    visMesser();
    visStandtyper();
    visAabenhed();
    visTilvalg();
    visIndsigter('indsigter-2', 2);
    visIndsigter('indsigter-3', 3);
    visTco();
    visBudget3();
    visTidslinje();
    visOpsummering();
    visPrisbar();
    gem();
  }

  function gaaTil(n) {
    s.trin = Math.max(0, Math.min(TRIN.length - 1, n));
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
        tilvalg: Array.from(s.tilvalg), team: s.team, tco: s.tco
      }));
    } catch (e) { /* privat browsing — kør videre uden */ }
  }

  function hent() {
    try {
      var raa = localStorage.getItem(GEM);
      if (!raa) return;
      var g = JSON.parse(raa);
      if (g.profil) s.profil = g.profil;
      if (g.messe) s.messe = g.messe;
      if (g.stand) s.stand = g.stand;
      if (g.tilvalg) s.tilvalg = new Set(g.tilvalg);
      if (g.team) s.team = g.team;
      if (g.tco) s.tco = g.tco;
    } catch (e) { /* ignorer ugyldigt gemt data */ }
  }

  /* ---------- Hændelser ---------- */
  function bind() {
    document.addEventListener('click', function (e) {
      var g = e.target.closest('[data-goto]');
      if (g) { gaaTil(Number(g.dataset.goto)); return; }
      var n = e.target.closest('[data-next]');
      if (n) { gaaTil(Number(n.dataset.next) + 1); }
    });

    document.getElementById('messe').addEventListener('change', function (e) {
      var m = C.messer.filter(function (x) { return x.id === e.target.value; })[0];
      s.messe.id = m.id;
      s.messe.lokation = m.lokation;
      s.team.dage = m.dage;
      document.getElementById('dage').value = m.dage;
      opdater();
    });
    document.getElementById('messedato').addEventListener('change', function (e) {
      s.messe.dato = e.target.value; opdater();
    });

    function slider(id, saet) {
      document.getElementById(id).addEventListener('input', function (e) {
        saet(Number(e.target.value)); opdater();
      });
    }
    slider('m2', function (v) { s.stand.m2 = v; });
    slider('personer', function (v) { s.team.personer = v; });
    slider('dage', function (v) { s.team.dage = v; });
    slider('antalMesser', function (v) { s.tco.antalMesser = v; });

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
      /* Prototype: her ville oplægget blive sendt til Wieben Design. */
      console.log('Oplæg klar til afsendelse:', {
        kontakt: Object.fromEntries(new FormData(f).entries()),
        konfiguration: { profil: s.profil, messe: s.messe, stand: s.stand, tilvalg: Array.from(s.tilvalg), team: s.team },
        estimat: { wieben: r.wieben, total: r.total }
      });
      f.replaceWith(el('<div class="kvittering">Tak — jeres oplæg er klar. I en færdig løsning ville det nu ligge i Wieben Designs indbakke sammen med hele konfigurationen, og I ville høre fra os inden for en arbejdsdag.</div>'));
    });
  }

  /* ---------- Start ---------- */
  hent();
  bind();
  document.getElementById('m2').value = s.stand.m2;
  document.getElementById('personer').value = s.team.personer;
  document.getElementById('dage').value = s.team.dage;
  document.getElementById('antalMesser').value = s.tco.antalMesser;
  document.getElementById('messedato').value = s.messe.dato || '';
  gaaTil(0);
})();
