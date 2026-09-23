/**
 * Wieben Design — standberegnerens endpoint
 * ---------------------------------------------------------------------
 * Ét Google Apps Script, der gør tre ting, når en kunde sender et oplæg:
 *
 *   1. skriver en række i regnearket, så I har leadet
 *   2. sender oplægget til kunden
 *   3. sender en besked til jer med det hele
 *
 * Opsætning: se OPSAETNING.md. Der skal ikke installeres noget, og
 * API-nøglen ligger i scriptets egenskaber — aldrig i browseren.
 */

/* ---------- Indstillinger ---------- */
var MODTAGER      = 'wd@wiebendesign.dk';        // hvem hos jer får leadet
var AFSENDER      = 'Wieben Design <oplaeg@wiebendesign.dk>';  // kræver verificeret domæne i Resend
var SVAR_TIL      = 'wd@wiebendesign.dk';
var ARK           = 'Leads';                      // fanen i regnearket
var ARK_STAT      = 'Statistik';                  // fanen med de anonyme besøg

/* ---------- Værn mod misbrug ----------
   Endpointet er åbent — det skal det være, for browseren kalder det, og
   adressen står i sidens JavaScript. Derfor kan enhver sende data ind:
   rækker i regnearket og mails til vilkårlige adresser fra jeres konto.

   Tre spærrer, i den rækkefølge de virker:
     1. et lokkefelt i formularen, som kun robotter udfylder
     2. et loft pr. mailadresse, så den samme ikke kan bombarderes
     3. et loft i alt pr. time, så en storm ikke tømmer jeres mailkvote

   Rammer nogen et loft, svarer vi stadig "ok" udadtil. En angriber skal
   ikke kunne se forskel og finde grænsen. Årsagen står i Udførsler-loggen.
   ------------------------------------------------------------------- */
var MAKS_PR_MAIL   = 3;    // samme adresse pr. time
var MAKS_I_ALT     = 40;   // alle indsendelser pr. time
var MAKS_STAT      = 400;  // anonyme besøgslinjer pr. time — egen tæller,
                           // så målingen aldrig kan spise leadenes loft
var MAKS_TEGN      = { navn: 120, virksomhed: 160, email: 200, telefon: 60,
                       budget: 60, besked: 2000 };

var KOLONNER = ['Modtaget', 'Sprog', 'Navn', 'Virksomhed', 'E-mail', 'Telefon', 'Budgetramme',
                'By', 'Land', 'Messedato', 'Messedage', 'Formål', 'Erfaring', 'Ambition',
                'm²', 'Åbne sider', 'Vægge', 'Tryk', 'Grafisk arbejde', 'Gulv', 'Belysning',
                'Områder', 'Estimat fra', 'Estimat til', 'Forventede leads', 'Besked'];

var STAT_KOLONNER = ['Tidspunkt', 'Sprog', 'Nåede trin', 'Sekunder', 'Sendte oplæg', 'Enhed',
                     'Formål', 'Erfaring', 'Ambition', 'm²', 'Messedage', 'Land',
                     'Områder', 'Estimat fra', 'Estimat til'];

/* Trinnene som de hedder i beregneren — så regnearket kan læses uden at
   skulle slå tallene op. */
var TRINNAVNE = ['Forside', '1 Profil', '2 Standen', '3 Områder', '4 Messeklar', '5 Oplæg'];

/* ---------- Sprog ----------
   Beregneren findes på dansk og engelsk, og kundens valg følger med i
   feltet "sprog". Indholdet i oplægget er allerede oversat af beregneren;
   det er rammen om det, der står her. Falder sproget udenfor, bruges dansk.
   --------------------------------------------------------------------- */
var TEKST = {
  da: {
    kundeEmne:    'Jeres oplæg til messestand',
    kundeTitel:   'Jeres oplæg til messestand',
    hej:          'Hej {navn}',
    indledning:   'Her er det oplæg, I satte sammen. Alle beløb er lejepriser for hele messen, ekskl. moms — og de er et estimat. Den endelige pris lægger vi os først fast på, når vi har tegnet standen.',
    standen:      'Standen',
    pris:         'Pris',
    areal:        'Areal',
    arealVaerdi:  '{m2} m² med {sider} åbne sider',
    arealEn:      '{m2} m² med 1 åben side',
    vaegge:       'Vægge',
    vaeggeVaerdi: '{type}, {meter} meter',
    tryk:         'Tryk',
    grafisk:      'Grafisk arbejde',
    gulv:         'Gulv',
    belysning:    'Belysning',
    omraader:     'Områder',
    ingenValgt:   'Ingen valgt',
    ialt:         'I alt',
    daekker:      'Beløbet dækker standen: materiel, grafik, opbygning, transport og vores arbejde. Messearrangørens egne gebyrer er ikke med — dem aftaler I direkte med messen.',
    afslutning:   'Vi kigger oplægget igennem og vender tilbage om, hvad der kan lade sig gøre på jeres plads. Vil I hellere selv tage fat, er vi på 70 23 11 11.',
    valuta:       '{tal} kr.',
    valutaSpaend: '{fra}–{til} kr.',
    vorestEmne:   'Nyt oplæg: {virksomhed} — {m2} m² i {by}',
    kontakt:      'Kontakt',
    messeProfil:  'Messe og profil',
    navn:         'Navn', virksomhed: 'Virksomhed', email: 'E-mail', telefon: 'Telefon',
    budget:       'Budgetramme', besked: 'Besked', sted: 'Sted', dato: 'Dato',
    formaal:      'Formål', erfaring: 'Erfaring', ambition: 'Ambition',
    estimat:      'Estimat', ikkeOplyst: 'ikke oplyst', dage: 'dage',
    fodAdresse:   '· Porsborgparken 8 B, 9530 Støvring · CVR 20099607',
    fodLinje:     '+45 70 23 11 11 · wd@wiebendesign.dk · Mere end 30 års erfaring · messer i mere end 70 lande'
  },
  en: {
    kundeEmne:    'Your exhibition stand summary',
    kundeTitel:   'Your exhibition stand summary',
    hej:          'Hello {navn}',
    indledning:   'Here is the summary you put together. All amounts are rental prices for the whole show, excl. VAT — and they are an estimate. We settle the final price once we have drawn the stand.',
    standen:      'The stand',
    pris:         'Price',
    areal:        'Area',
    arealVaerdi:  '{m2} m² with {sider} open sides',
    arealEn:      '{m2} m² with 1 open side',
    vaegge:       'Walls',
    vaeggeVaerdi: '{type}, {meter} meters',
    tryk:         'Print',
    grafisk:      'Graphic work',
    gulv:         'Flooring',
    belysning:    'Lighting',
    omraader:     'Areas',
    ingenValgt:   'None selected',
    ialt:         'Total',
    daekker:      'The amount covers the stand: materials, graphics, installation, transport and our work. The show organizer\u2019s own fees are not included — you arrange those directly with the show.',
    afslutning:   'We will look the summary over and come back to you about what is possible on your space. If you would rather get in touch yourself, we are on +45 70 23 11 11.',
    valuta:       'DKK {tal}',
    valutaSpaend: 'DKK {fra}–{til}',
    vorestEmne:   'New summary: {virksomhed} — {m2} m² in {by}',
    kontakt:      'Contact',
    messeProfil:  'Show and profile',
    navn:         'Name', virksomhed: 'Company', email: 'Email', telefon: 'Phone',
    budget:       'Budget range', besked: 'Message', sted: 'Location', dato: 'Date',
    formaal:      'Goal', erfaring: 'Experience', ambition: 'Ambition',
    estimat:      'Estimate', ikkeOplyst: 'not stated', dage: 'days',
    fodAdresse:   '· Porsborgparken 8 B, 9530 Støvring, Denmark · CVR 20099607',
    fodLinje:     '+45 70 23 11 11 · wd@wiebendesign.dk · Over 30 years of trade show experience · exhibitions in more than 70 countries',
    /* Kun her: beskeden til jer selv er altid på dansk, også for et
       engelsk lead — det er jeres interne mail. Men sproget står i emnet,
       så den der svarer ved, hvad kunden skrev på. */
    internt: true
  }
};

function T(d) { return TEKST[(d && d.sprog) || 'da'] || TEKST.da; }
function flet(skabelon, v) {
  return String(skabelon).replace(/\{(\w+)\}/g, function (helt, navn) {
    return v[navn] === undefined || v[navn] === null ? helt : String(v[navn]);
  });
}

/* ---------- Indgang ---------- */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    /* Målingen er ikke et lead. Den har ingen kontaktoplysninger, udløser
       ingen mails og har sin egen tæller, så et travlt døgn på siden ikke
       kan spærre for et rigtigt lead. */
    if (data && data.type === 'statistik') {
      if (harPladsStat()) proev(function () { gemStatistik(data); }, 'statistiklinje');
      return svar({ ok: true });
    }

    if (!data || !data.kontakt || !data.kontakt.email) {
      return svar({ ok: false, fejl: 'Mangler kontaktoplysninger' });
    }

    /* Lokkefeltet er tomt hos mennesker. Er der skrevet i det, er det en
       robot — vi svarer venligt og gemmer ingenting. */
    if (data.website) {
      console.warn('Lokkefeltet var udfyldt — indsendelsen er kasseret.');
      return svar({ ok: true });
    }

    data.kontakt.email = String(data.kontakt.email).trim();
    if (!gyldigMail(data.kontakt.email)) {
      return svar({ ok: false, fejl: 'Mailadressen ser ikke rigtig ud' });
    }

    if (!harPlads(data.kontakt.email)) {
      console.warn('Loft ramt for ' + data.kontakt.email + ' — indsendelsen er kasseret.');
      return svar({ ok: true });
    }

    klip(data.kontakt);
    /* Leadet gemmes først — det er det, der ikke må gå tabt. Derefter
       sendes de to mails hver for sig, så en fejl i den ene ikke stopper
       den anden og ikke får kunden til at tro, at intet blev sendt. */
    gemILead(data);
    proev(function () { sendTilKunde(data); }, 'mail til kunden');
    proev(function () { sendTilOs(data); }, 'besked til os');
    return svar({ ok: true });
  } catch (fejl) {
    console.error(fejl);
    return svar({ ok: false, fejl: String(fejl && fejl.message || fejl) });
  }
}

function gyldigMail(m) {
  return typeof m === 'string' && m.length <= MAKS_TEGN.email && /^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(m);
}

/* Kapper for lange felter, så en enkelt indsendelse ikke kan fylde
   regnearket eller mailen med tusindvis af tegn. */
function klip(kontakt) {
  Object.keys(MAKS_TEGN).forEach(function (felt) {
    if (typeof kontakt[felt] === 'string' && kontakt[felt].length > MAKS_TEGN[felt]) {
      kontakt[felt] = kontakt[felt].slice(0, MAKS_TEGN[felt]) + '\u2026';
    }
  });
}

/* Tæller indsendelser i et rullende vindue på en time. CacheService
   glemmer selv posterne bagefter, så der er intet at rydde op i.
   Apps Script får ikke afsenderens IP, så vi tæller på mailadressen
   og på det samlede antal. */
function harPlads(email) {
  var cache = CacheService.getScriptCache();
  var laas = LockService.getScriptLock();
  try { laas.waitLock(5000); } catch (fejl) { return true; }  /* hellere slippe igennem end afvise en ægte kunde */
  try {
    var pr = 'mail_' + Utilities.base64EncodeWebSafe(email.toLowerCase()).slice(0, 40);
    var antalPr = Number(cache.get(pr) || 0);
    var antalAlt = Number(cache.get('i_alt') || 0);
    if (antalPr >= MAKS_PR_MAIL || antalAlt >= MAKS_I_ALT) return false;
    cache.put(pr, String(antalPr + 1), 3600);
    cache.put('i_alt', String(antalAlt + 1), 3600);
    return true;
  } finally {
    laas.releaseLock();
  }
}

/* Kører opgaven og logger, hvis den fejler, i stedet for at afbryde. */
function proev(opgave, hvad) {
  try { opgave(); }
  catch (fejl) { console.error(hvad + ' fejlede: ' + fejl); }
}

function doGet() {
  return svar({ ok: true, besked: 'Standberegnerens endpoint kører.' });
}

function svar(objekt) {
  return ContentService.createTextOutput(JSON.stringify(objekt))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ---------- Regnearket ---------- */
function gemILead(d) {
  var bog = SpreadsheetApp.getActiveSpreadsheet();
  var ark = bog.getSheetByName(ARK) || bog.insertSheet(ARK);
  if (ark.getLastRow() === 0) {
    ark.appendRow(KOLONNER);
    ark.getRange(1, 1, 1, KOLONNER.length).setFontWeight('bold').setBackground('#F4F7F8');
    ark.setFrozenRows(1);
  }
  ark.appendRow([
    new Date(), (d.sprog || 'da').toUpperCase(), d.kontakt.navn, d.kontakt.virksomhed, d.kontakt.email, d.kontakt.telefon,
    d.kontakt.budget || '',
    d.messe.by, d.messe.land, d.messe.dato, d.messe.dage,
    d.profil.formaal, d.profil.erfaring, d.profil.ambition,
    d.stand.m2, d.stand.aabneSider, d.stand.vaegge, d.stand.tryk,
    d.stand.grafiskArbejde || '', d.stand.gulv, d.stand.belysning,
    d.omraader.map(function (o) { return (o.antal > 1 ? o.antal + ' × ' : '') + o.navn; }).join(', '),
    d.estimat.fra, d.estimat.til,
    d.leads.fra + '–' + d.leads.til,
    d.kontakt.besked
  ]);
}

/* Én linje pr. besøg. Ingen navn, ingen mail, ingen IP og intet id —
   vi kan ikke se, om to linjer er det samme menneske, og det skal vi
   heller ikke. Linjen svarer på ét spørgsmål: hvor falder folk fra? */
function gemStatistik(d) {
  var bog = SpreadsheetApp.getActiveSpreadsheet();
  var ark = bog.getSheetByName(ARK_STAT) || bog.insertSheet(ARK_STAT);
  if (ark.getLastRow() === 0) {
    ark.appendRow(STAT_KOLONNER);
    ark.getRange(1, 1, 1, STAT_KOLONNER.length).setFontWeight('bold').setBackground('#F4F7F8');
    ark.setFrozenRows(1);
  }
  var trin = Number(d.naaetTrin) || 0;
  ark.appendRow([
    new Date(), String(d.sprog || 'da').toUpperCase(),
    TRINNAVNE[trin] || trin,
    Number(d.sekunder) || 0,
    d.sendt ? 'Ja' : 'Nej',
    tekst(d.enhed, 20),
    tekst(d.formaal, 20), tekst(d.erfaring, 20), tekst(d.ambition, 20),
    Number(d.m2) || 0, Number(d.dage) || 0, tekst(d.land, 10),
    Number(d.omraader) || 0,
    Number(d.fra) || 0, Number(d.til) || 0
  ]);
}

/* Målingen har sit eget loft. Rammer det, taber vi en linje statistik —
   aldrig et lead. */
function harPladsStat() {
  var cache = CacheService.getScriptCache();
  var antal = Number(cache.get('stat_i_alt') || 0);
  if (antal >= MAKS_STAT) return false;
  cache.put('stat_i_alt', String(antal + 1), 3600);
  return true;
}

/* Kort tekst uden overraskelser — statistikken skal aldrig kunne bruges
   til at skrive noget langt eller mærkeligt ind i regnearket. */
function tekst(v, maks) {
  return String(v === undefined || v === null ? '' : v).slice(0, maks);
}

/* ---------- Mails ---------- */
function sendTilKunde(d) {
  sendMail(d.kontakt.email,
    T(d).kundeEmne + ' — ' + d.messe.by,
    kundeMail(d));
}

function sendTilOs(d) {
  sendMail(MODTAGER,
    flet(T(d).vorestEmne, { virksomhed: d.kontakt.virksomhed, m2: d.stand.m2, by: d.messe.by }) +
      (d.sprog === 'en' ? ' [EN]' : ''),
    vorestMail(d));
}

/**
 * Sender via Resend, når nøglen er sat. Ellers falder den tilbage til
 * Googles egen afsendelse, så I kan komme i gang uden Resend-konto.
 */
function sendMail(til, emne, html) {
  var noegle = PropertiesService.getScriptProperties().getProperty('RESEND_API_KEY');
  if (!noegle) { viaGoogle(til, emne, html); return; }

  var svar;
  try {
    svar = UrlFetchApp.fetch('https://api.resend.com/emails', {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: 'Bearer ' + noegle },
      payload: JSON.stringify({ from: AFSENDER, to: [til], reply_to: SVAR_TIL, subject: emne, html: html }),
      muteHttpExceptions: true
    });
  } catch (fejl) {
    console.error('Resend kunne ikke n\u00e5s: ' + fejl);
    viaGoogle(til, emne, html);
    return;
  }

  if (svar.getResponseCode() >= 300) {
    /* Den hyppigste årsag er, at domænet endnu ikke er verificeret — det kan
       tage timer efter DNS er lagt ind. Så skal kunden ikke se en fejl:
       mailen går gennem Google i stedet, og årsagen står i scriptets log. */
    console.error('Resend svarede ' + svar.getResponseCode() + ': ' + svar.getContentText());
    viaGoogle(til, emne, html);
  }
}

function viaGoogle(til, emne, html) {
  MailApp.sendEmail({ to: til, subject: emne, htmlBody: html, name: 'Wieben Design' });
}

/* ---------- Skabeloner ---------- */
var BLAA = '#3D8A95', MOERK = '#1F4E59', GRAA = '#6a737a', LINJE = '#dfe6e8';

/* Tusindtalsseparator efter sprog: dansk bruger punktum, engelsk komma */
function kr(n, d) {
  var sep = (d && d.sprog === 'en') ? ',' : '.';
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}
/* Beløb med valuta. Dansk sætter "kr." efter tallet, engelsk "DKK" foran —
   og et spænd skal have enheden om hele spændet, ikke om det første tal. */
function belob(n, d) { return flet(T(d).valuta, { tal: kr(n, d) }); }
function spaend(fra, til, d) {
  return flet(T(d).valutaSpaend, { fra: kr(fra, d), til: kr(til, d) });
}
/* Decimaltal: dansk komma, engelsk punktum */
function tal(v, d) {
  return (d && d.sprog === 'en') ? String(v) : String(v).replace('.', ',');
}

var MAANEDER = {
  da: ['januar', 'februar', 'marts', 'april', 'maj', 'juni',
       'juli', 'august', 'september', 'oktober', 'november', 'december'],
  en: ['January', 'February', 'March', 'April', 'May', 'June',
       'July', 'August', 'September', 'October', 'November', 'December']
};

/** 2027-01-26 bliver til 26. januar 2027 — eller 26 January 2027 */
function dansk(iso, d) {
  if (!iso) return '';
  var dato = new Date(iso);
  if (isNaN(dato.getTime())) return iso;
  var en = d && d.sprog === 'en';
  var m = (MAANEDER[en ? 'en' : 'da'])[dato.getMonth()];
  return dato.getDate() + (en ? ' ' : '. ') + m + ' ' + dato.getFullYear();
}

function ramme(indhold, d) {
  return '<div style="margin:0;padding:24px 12px;background:#F4F7F8;">' +
    '<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;' +
    'font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#33393d;font-size:15px;line-height:1.55;">' +
    indhold +
    '<div style="padding:18px 28px 26px;border-top:1px solid ' + LINJE + ';color:' + GRAA + ';font-size:12px;">' +
    '<p style="margin:0 0 3px;"><strong style="color:#000;">Wieben Design A/S</strong> ' + T(d).fodAdresse + '</p>' +
    '<p style="margin:0;">' + T(d).fodLinje + '</p>' +
    '</div></div></div>';
}

function overskrift(titel, under) {
  return '<div style="background:' + MOERK + ';padding:26px 28px;">' +
    '<h1 style="margin:0;color:#fff;font-size:21px;line-height:1.25;">' + titel + '</h1>' +
    (under ? '<p style="margin:6px 0 0;color:#a9c0c6;font-size:13px;">' + under + '</p>' : '') +
    '</div>';
}

function posterTabel(d) {
  var raekker = d.poster.map(function (p) {
    return '<tr>' +
      '<td style="padding:9px 0;border-bottom:1px solid ' + LINJE + ';">' + p.navn +
      '<div style="color:' + GRAA + ';font-size:12px;margin-top:2px;">' + p.note + '</div></td>' +
      '<td style="padding:9px 0;border-bottom:1px solid ' + LINJE + ';text-align:right;white-space:nowrap;font-weight:600;">' +
      spaend(p.fra, p.til, d) + '</td></tr>';
  }).join('');
  return '<table style="width:100%;border-collapse:collapse;font-size:14px;">' + raekker +
    '<tr><td style="padding:12px 0 0;border-top:2px solid ' + MOERK + ';font-weight:700;font-size:17px;">' + T(d).ialt + '</td>' +
    '<td style="padding:12px 0 0;border-top:2px solid ' + MOERK + ';text-align:right;font-weight:700;font-size:17px;white-space:nowrap;">' +
    spaend(d.estimat.fra, d.estimat.til, d) + '</td></tr></table>';
}

function linjer(par) {
  return '<table style="width:100%;border-collapse:collapse;font-size:14px;">' +
    par.map(function (p) {
      return '<tr><td style="padding:6px 16px 6px 0;color:' + GRAA + ';vertical-align:top;white-space:nowrap;">' + p[0] + '</td>' +
        '<td style="padding:6px 0;font-weight:600;">' + (p[1] || '—') + '</td></tr>';
    }).join('') + '</table>';
}

function kundeMail(d) {
  var t = T(d);
  var omr = d.omraader.map(function (o) { return (o.antal > 1 ? o.antal + ' × ' : '') + o.navn; }).join(' · ') || t.ingenValgt;
  return ramme(
    overskrift(t.kundeTitel,
      d.messe.by + (d.messe.dato ? ' · ' + dansk(d.messe.dato, d) : '') + ' · ' + d.stand.m2 + ' m²') +
    '<div style="padding:26px 28px;">' +
      '<p style="margin:0 0 20px;">' + flet(t.hej, { navn: d.kontakt.navn }) + '</p>' +
      '<p style="margin:0 0 22px;">' + t.indledning + '</p>' +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:0 0 10px;">' + t.standen + '</h2>' +
      linjer([
        [t.areal, flet(d.stand.aabneSider === 1 ? t.arealEn : t.arealVaerdi, { m2: d.stand.m2, sider: d.stand.aabneSider })],
        [t.vaegge, flet(t.vaeggeVaerdi, { type: d.stand.vaegge, meter: tal(d.stand.vaegmeter, d) })],
        [t.tryk, d.stand.tryk],
        [t.grafisk, d.stand.grafiskArbejde],
        [t.gulv, d.stand.gulv],
        [t.belysning, d.stand.belysning],
        [t.omraader, omr]
      ]) +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:26px 0 10px;">' + t.pris + '</h2>' +
      posterTabel(d) +
      '<p style="margin:22px 0 0;padding:14px 16px;background:#eaf3f4;border-radius:8px;font-size:13px;">' + t.daekker + '</p>' +
      '<p style="margin:22px 0 0;">' + t.afslutning + '</p>' +
    '</div>', d);
}

function vorestMail(d) {
  var omr = d.omraader.map(function (o) {
    return '<li style="margin-bottom:3px;">' + (o.antal > 1 ? o.antal + ' × ' : '') + o.navn +
      ' <span style="color:' + GRAA + ';">(' + belob(o.pris, d) + ')</span></li>';
  }).join('');
  return ramme(
    overskrift(d.kontakt.virksomhed,
      d.stand.m2 + ' m² i ' + d.messe.by + ' · ' + spaend(d.estimat.fra, d.estimat.til, d)) +
    '<div style="padding:26px 28px;">' +
      (d.sprog === 'en'
        ? '<p style="margin:0 0 20px;padding:12px 16px;background:#eaf3f4;border-left:3px solid ' + BLAA +
          ';border-radius:0 8px 8px 0;font-weight:600;">Leadet er udfyldt p\u00e5 engelsk \u2014 svar p\u00e5 engelsk.</p>'
        : '') +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:0 0 10px;">Kontakt</h2>' +
      linjer([
        ['Navn', d.kontakt.navn],
        ['Virksomhed', d.kontakt.virksomhed],
        ['E-mail', '<a href="mailto:' + d.kontakt.email + '" style="color:' + BLAA + ';">' + d.kontakt.email + '</a>'],
        ['Telefon', d.kontakt.telefon],
        ['Budgetramme', d.kontakt.budget],
        ['Besked', d.kontakt.besked]
      ]) +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:26px 0 10px;">Messe og profil</h2>' +
      linjer([
        ['Sted', d.messe.by + ', ' + d.messe.land + ' (' + d.messe.km + ' km)'],
        ['Dato', (dansk(d.messe.dato, d) || 'ikke oplyst') + ' · ' + d.messe.dage + ' dage'],
        ['Formål', d.profil.formaal],
        ['Erfaring', d.profil.erfaring],
        ['Ambition', d.profil.ambition]
      ]) +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:26px 0 10px;">Standen</h2>' +
      linjer([
        ['Areal', d.stand.m2 + ' m², ' + d.stand.aabneSider + ' åbne sider'],
        ['Vægge', d.stand.vaegge + ', ' + String(d.stand.vaegmeter).replace('.', ',') + ' m i ' + String(d.stand.vaeghoejde).replace('.', ',') + ' m'],
        ['Tryk', d.stand.tryk],
        ['Grafisk arbejde', d.stand.grafiskArbejde],
        ['Gulv', d.stand.gulv],
        ['Belysning', d.stand.belysning]
      ]) +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:26px 0 10px;">Områder</h2>' +
      '<ul style="margin:0;padding-left:20px;font-size:14px;">' + (omr || '<li>Ingen valgt</li>') + '</ul>' +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:26px 0 10px;">Estimat</h2>' +
      posterTabel(d) +
      '<p style="margin:18px 0 0;color:' + GRAA + ';font-size:13px;">Forventede leads: ' +
      d.leads.fra + '–' + d.leads.til + '. Rækken ligger også i regnearket.</p>' +
    '</div>', d);
}
