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

var KOLONNER = ['Modtaget', 'Navn', 'Virksomhed', 'E-mail', 'Telefon', 'Ønsker opkald',
                'By', 'Land', 'Messedato', 'Messedage', 'Formål', 'Erfaring', 'Ambition',
                'm²', 'Åbne sider', 'Vægge', 'Tryk', 'Gulv', 'Belysning',
                'Områder', 'Estimat fra', 'Estimat til', 'Forventede leads', 'Besked'];

/* ---------- Indgang ---------- */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (!data || !data.kontakt || !data.kontakt.email) {
      return svar({ ok: false, fejl: 'Mangler kontaktoplysninger' });
    }
    gemILead(data);
    sendTilKunde(data);
    sendTilOs(data);
    return svar({ ok: true });
  } catch (fejl) {
    console.error(fejl);
    return svar({ ok: false, fejl: String(fejl && fejl.message || fejl) });
  }
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
    new Date(), d.kontakt.navn, d.kontakt.virksomhed, d.kontakt.email, d.kontakt.telefon,
    d.kontakt.oenskerOpkald ? 'JA' : '',
    d.messe.by, d.messe.land, d.messe.dato, d.messe.dage,
    d.profil.formaal, d.profil.erfaring, d.profil.ambition,
    d.stand.m2, d.stand.aabneSider, d.stand.vaegge, d.stand.tryk, d.stand.gulv, d.stand.belysning,
    d.omraader.map(function (o) { return (o.antal > 1 ? o.antal + ' × ' : '') + o.navn; }).join(', '),
    d.estimat.fra, d.estimat.til,
    d.leads.fra + '–' + d.leads.til,
    d.kontakt.besked
  ]);
}

/* ---------- Mails ---------- */
function sendTilKunde(d) {
  sendMail(d.kontakt.email,
    'Jeres oplæg til messestand i ' + d.messe.by,
    kundeMail(d));
}

function sendTilOs(d) {
  sendMail(MODTAGER,
    (d.kontakt.oenskerOpkald ? '[RING] ' : '') + 'Nyt oplæg: ' + d.kontakt.virksomhed +
      ' — ' + d.stand.m2 + ' m² i ' + d.messe.by,
    vorestMail(d));
}

/**
 * Sender via Resend, når nøglen er sat. Ellers falder den tilbage til
 * Googles egen afsendelse, så I kan komme i gang uden Resend-konto.
 */
function sendMail(til, emne, html) {
  var noegle = PropertiesService.getScriptProperties().getProperty('RESEND_API_KEY');
  if (!noegle) {
    MailApp.sendEmail({ to: til, subject: emne, htmlBody: html, name: 'Wieben Design' });
    return;
  }
  var svar = UrlFetchApp.fetch('https://api.resend.com/emails', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + noegle },
    payload: JSON.stringify({ from: AFSENDER, to: [til], reply_to: SVAR_TIL, subject: emne, html: html }),
    muteHttpExceptions: true
  });
  if (svar.getResponseCode() >= 300) {
    throw new Error('Resend svarede ' + svar.getResponseCode() + ': ' + svar.getContentText());
  }
}

/* ---------- Skabeloner ---------- */
var BLAA = '#3D8A95', MOERK = '#1F4E59', GRAA = '#6a737a', LINJE = '#dfe6e8';

function kr(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

var MAANEDER = ['januar', 'februar', 'marts', 'april', 'maj', 'juni',
                'juli', 'august', 'september', 'oktober', 'november', 'december'];

/** 2027-01-26 bliver til 26. januar 2027 */
function dansk(iso) {
  if (!iso) return '';
  var d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.getDate() + '. ' + MAANEDER[d.getMonth()] + ' ' + d.getFullYear();
}

function ramme(indhold) {
  return '<div style="margin:0;padding:24px 12px;background:#F4F7F8;">' +
    '<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;' +
    'font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#33393d;font-size:15px;line-height:1.55;">' +
    indhold +
    '<div style="padding:18px 28px 26px;border-top:1px solid ' + LINJE + ';color:' + GRAA + ';font-size:12px;">' +
    '<p style="margin:0 0 3px;"><strong style="color:#000;">Wieben Design A/S</strong> · Porsborgparken 8B, 9530 Støvring</p>' +
    '<p style="margin:0;">70 23 11 11 · wd@wiebendesign.dk · 30 års erfaring · messer i mere end 70 lande</p>' +
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
      kr(p.fra) + '–' + kr(p.til) + ' kr.</td></tr>';
  }).join('');
  return '<table style="width:100%;border-collapse:collapse;font-size:14px;">' + raekker +
    '<tr><td style="padding:12px 0 0;border-top:2px solid ' + MOERK + ';font-weight:700;font-size:17px;">I alt</td>' +
    '<td style="padding:12px 0 0;border-top:2px solid ' + MOERK + ';text-align:right;font-weight:700;font-size:17px;white-space:nowrap;">' +
    kr(d.estimat.fra) + '–' + kr(d.estimat.til) + ' kr.</td></tr></table>';
}

function linjer(par) {
  return '<table style="width:100%;border-collapse:collapse;font-size:14px;">' +
    par.map(function (p) {
      return '<tr><td style="padding:6px 16px 6px 0;color:' + GRAA + ';vertical-align:top;white-space:nowrap;">' + p[0] + '</td>' +
        '<td style="padding:6px 0;font-weight:600;">' + (p[1] || '—') + '</td></tr>';
    }).join('') + '</table>';
}

function kundeMail(d) {
  var omr = d.omraader.map(function (o) { return (o.antal > 1 ? o.antal + ' × ' : '') + o.navn; }).join(' · ') || 'Ingen valgt';
  return ramme(
    overskrift('Jeres oplæg til messestand',
      d.messe.by + (d.messe.dato ? ' · ' + dansk(d.messe.dato) : '') + ' · ' + d.stand.m2 + ' m²') +
    '<div style="padding:26px 28px;">' +
      '<p style="margin:0 0 20px;">Hej ' + d.kontakt.navn + '</p>' +
      '<p style="margin:0 0 22px;">Her er det oplæg, I satte sammen. Alle beløb er lejepriser for hele messen, ekskl. moms — og de er et skøn. Den endelige pris lægger vi os først fast på, når vi har tegnet standen.</p>' +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:0 0 10px;">Standen</h2>' +
      linjer([
        ['Areal', d.stand.m2 + ' m² med ' + d.stand.aabneSider + (d.stand.aabneSider === 1 ? ' åben side' : ' åbne sider')],
        ['Vægge', d.stand.vaegge + ', ' + String(d.stand.vaegmeter).replace('.', ',') + ' meter'],
        ['Tryk', d.stand.tryk],
        ['Gulv', d.stand.gulv],
        ['Belysning', d.stand.belysning],
        ['Områder', omr]
      ]) +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:26px 0 10px;">Pris</h2>' +
      posterTabel(d) +
      '<p style="margin:22px 0 0;padding:14px 16px;background:#eaf3f4;border-radius:8px;font-size:13px;">' +
      'Beløbet dækker standen: materiel, grafik, opbygning, transport og vores arbejde. Messearrangørens egne gebyrer er ikke med — dem aftaler I direkte med messen.</p>' +
      '<p style="margin:22px 0 0;">' + (d.kontakt.oenskerOpkald
        ? 'Vi ringer til jer inden for en arbejdsdag.'
        : 'Vil I vende det med os, er I velkomne til at ringe på 70 23 11 11.') + '</p>' +
    '</div>');
}

function vorestMail(d) {
  var omr = d.omraader.map(function (o) {
    return '<li style="margin-bottom:3px;">' + (o.antal > 1 ? o.antal + ' × ' : '') + o.navn +
      ' <span style="color:' + GRAA + ';">(' + kr(o.pris) + ' kr.)</span></li>';
  }).join('');
  return ramme(
    overskrift((d.kontakt.oenskerOpkald ? '📞 ' : '') + d.kontakt.virksomhed,
      d.stand.m2 + ' m² i ' + d.messe.by + ' · ' + kr(d.estimat.fra) + '–' + kr(d.estimat.til) + ' kr.') +
    '<div style="padding:26px 28px;">' +
      (d.kontakt.oenskerOpkald
        ? '<p style="margin:0 0 20px;padding:12px 16px;background:#eaf3f4;border-left:3px solid ' + BLAA +
          ';border-radius:0 8px 8px 0;font-weight:600;">De har bedt om at blive ringet op.</p>'
        : '<p style="margin:0 0 20px;color:' + GRAA + ';font-size:13px;">De har ikke bedt om at blive ringet op.</p>') +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:0 0 10px;">Kontakt</h2>' +
      linjer([
        ['Navn', d.kontakt.navn],
        ['Virksomhed', d.kontakt.virksomhed],
        ['E-mail', '<a href="mailto:' + d.kontakt.email + '" style="color:' + BLAA + ';">' + d.kontakt.email + '</a>'],
        ['Telefon', d.kontakt.telefon],
        ['Besked', d.kontakt.besked]
      ]) +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:26px 0 10px;">Messe og profil</h2>' +
      linjer([
        ['Sted', d.messe.by + ', ' + d.messe.land + ' (' + d.messe.km + ' km)'],
        ['Dato', (dansk(d.messe.dato) || 'ikke oplyst') + ' · ' + d.messe.dage + ' dage'],
        ['Formål', d.profil.formaal],
        ['Erfaring', d.profil.erfaring],
        ['Ambition', d.profil.ambition]
      ]) +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:26px 0 10px;">Standen</h2>' +
      linjer([
        ['Areal', d.stand.m2 + ' m², ' + d.stand.aabneSider + ' åbne sider'],
        ['Vægge', d.stand.vaegge + ', ' + String(d.stand.vaegmeter).replace('.', ',') + ' m i ' + String(d.stand.vaeghoejde).replace('.', ',') + ' m'],
        ['Tryk', d.stand.tryk],
        ['Gulv', d.stand.gulv],
        ['Belysning', d.stand.belysning]
      ]) +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:26px 0 10px;">Områder</h2>' +
      '<ul style="margin:0;padding-left:20px;font-size:14px;">' + (omr || '<li>Ingen valgt</li>') + '</ul>' +
      '<h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:' + BLAA + ';margin:26px 0 10px;">Estimat</h2>' +
      posterTabel(d) +
      '<p style="margin:18px 0 0;color:' + GRAA + ';font-size:13px;">Forventede leads: ' +
      d.leads.fra + '–' + d.leads.til + '. Rækken ligger også i regnearket.</p>' +
    '</div>');
}
