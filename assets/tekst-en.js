/* =====================================================================
   LANGUAGE LAYER — English. Mirrors assets/tekst-da.js key for key.
   ---------------------------------------------------------------------
   Wording follows wiebendesign.dk's own English pages; see
   docs/tone-of-voice-en.md. The rules that matter:
     · "exhibition stand", never "booth"
     · US spelling: color, meter, organize, authorized
     · "you / your" (singular), "we" for Wieben Design
     · the triad is "your brand, products, and goals"
     · prices in DKK only — Wieben invoices in DKK
   ===================================================================== */

window.WD_TEKST = window.WD_TEKST || {};
window.WD_TEKST.en = {

  kode: 'en',
  navn: 'English',
  htmlLang: 'en',
  /* en-GB, not en-US: thousands separators read the same, but dates come
     out as "20 April 2027" instead of "4/20/2027", which a European
     reader cannot misread. The spelling stays American, as on the site. */
  locale: 'en-GB',

  trin: ['Start', 'Profile', 'The stand', 'Areas', 'Show-ready', 'Summary'],

  laastProfil: 'Answer the three questions about your exhibition profile first',
  laastOmraader: 'First choose whether to use our suggestion or build the stand yourself',

  post: {
    projektstyring:     'Design and project management',
    projektstyringNote: 'drawings, meetings, orders and coordination with the show organizer',
    stand:              'Stand, graphics, and materials',
    omraader:           'Furnishings and technology',
    omraaderTom:        'no areas selected',
    transport:          'Transportation and installation',
    transportNote:      'installation, carrying in and out, empty crates, dismantling, transport and insurance — we handle all of it',
    ialt:               'Total'
  },

  standnote: {
    vaeg:    '{meter} meters of wall',
    lysvaeg: '{meter} meters of backlit wall',
    tryk:    '{areal} m² of print',
    grafik:  'graphic work {fra}–{til} hours',
    haevet:  '{gulv}, raised',
    stroem:  'power'
  },

  montage: {
    opbygning:        'Installation, carrying in and out, dismantling and packing',
    opbygningNote:    'an estimated {fra}–{til} man-hours with {montoerer} installers',
    oversoeiskFragt:  'Overseas freight',
    oversoeiskNote:   'the whole stand in one shipment — agreed with the freight forwarder case by case',
    rejse:            'Installers’ travel',
    rejseNote:        '{montoerer} people, return trip',
    ophold:           'Accommodation and meals',
    forsikring:       'Transport insurance',
    fragt:            'Freight and installers’ travel',
    fragtNote:        'the whole stand in one truck, {km} km by freight forwarder · flights for {montoerer} people',
    koersel:          'Driving and travel time',
    koerselNote:      '{km} km each way, around {timer} hours on the road',
    tomgods:          'Empty crate storage during the show',
    tomgodsNote:      'storing the empty crates'
  },

  raad: {
    mrk:        'Our advice',
    leads:      'You are there for leads. That means many short conversations: keep the front open, set the counter back into the stand and use high tables rather than a lounge — people who sit down hold the space longer than they contribute.',
    brand:      'You are there to be seen. Prioritize graphic height and lighting over furniture. What works at twenty meters is large surfaces, clear messages and movement — not detail.',
    lancering:  'You are launching. Build the stand around one focal point: one lit product, one screen, one sentence. Everything else on the stand should point there.',
    relationer: 'You are there to hold meetings. Prioritize seating, screening and refreshments. It is not the front of the stand that decides the outcome — it is how long people stay.',
    basis:      'We keep it clean and functional.',
    plus:       'We take the graphics and lighting a level further.',
    signatur:   'We aim for a stand people remember — that costs on graphics, lighting and materials.',
    lille:      'Under 12 m², discipline matters more than ideas: one message, one product, room for two people.',
    mellem:     'At {m2} m² you have room for a counter, a couple of high tables and a small storage room — not much more.',
    stor:       'At {m2} m² the stand can carry several zones: meeting space, demo and storage each in their own place.'
  },

  sted: {
    andenBy:      'Enter the distance below',
    oversoeisk:   'Outside Europe we ship the stand by freight forwarder and the installers fly. We have warehouse facilities in both Denmark and the United States and experience from exhibitions in more than 70 countries — the exact freight cost is agreed case by case.',
    skrivKm:      'Enter roughly how far it is from our workshop in Støvring, Denmark, and we will calculate the transport from that.',
    afstand:      'About {km} km from our workshop in Støvring, Denmark.',
    afstandMidt:  'About {km} km from our workshop in Støvring, Denmark — measured to the middle of {land}. If you know the distance, you can correct it below.',
    viaSpeditoer: 'At that distance it is cheaper to ship the stand by freight forwarder and fly the installers out — so that is what we have assumed.',
    egenKoersel:  'We drive the stand there ourselves.',
    broMed:       'Bridge tolls are included.'
  },

  standen: {
    maal:          'About {bredde} × {dybde} meters · room for around {samtaler} conversations at once.',
    vaegflade:     'That gives about {meter} meters of wall — {areal} m² of wall surface at {hoejde} meters high.',
    oeStand:       'An island stand has no neighboring walls, so we allow for a free-standing wall block for storage, graphics and technology.',
    hoejOver:      'Above {fri} meters the show has to approve the height. The limit is in the exhibitor manual and is usually between 3 and 6 meters — we check it before we draw.',
    hoejPixlip:    'Backlit walls are available up to 4 meters. To go higher, the walls have to be standard ones.',
    hoejFri:       'Up to {fri} meters you can assume it is allowed. Above that it depends on the show’s rules.',
    ikkeLysvaeg:   'Not available as a backlit wall',
    forStanden:    'for your stand',
    forTrykket:    'DKK {pris} for the print',
    prM2:          'DKK {pris} per m²',
    oveniGulvet:   'on top of the flooring',
    ingenUdgift:   'No extra cost',
    spots:         '{antal} spots'
  },

  omraade: {
    faerre:           'Fewer',
    flere:            'More',
    vaelg:            'Choose the areas the stand needs. We keep an eye on whether there is room for them.',
    forMeget:         'The areas take up about {brugt} m² — more than the {m2} m² you have. Something has to go, be chosen smaller, or the stand has to be bigger.',
    trangt:           'The areas take up about {brugt} m² of your {m2} m² — around {andel} %. It will be tight: visitors also need to be able to move around.',
    passer:           'The areas take up about {brugt} m² of your {m2} m² — around {andel} %. The rest is room to walk.',
    brugForslag:      'Use our suggestion',
    brugForslagTekst: 'We will set up {antal} areas based on your goals and the size of the stand. You can change all of it afterwards — it is only a starting point.',
    forHeleMessen:    'for the whole show',
    byggSelv:         'I will build it myself',
    byggSelvTekst:    'Start with an empty stand and choose the areas one by one. We keep an eye on whether there is room for them.',
    byggSelvMeta:     'Takes a couple of minutes longer',
    paaForslag:       'You are building on our suggestion',
    paaSelv:          'You are building the stand yourself',
    valgtSum:         '{antal} choices at DKK {pris} for the whole show. Scroll down and change anything.',
    ingenValgt:       'No areas selected yet. Scroll down and choose the ones the stand needs.',
    hentForslag:      'Load the suggestion again',
    brugAlligevel:    'Use our suggestion after all',
    startForfra:      'Start over',
    ledMeta:          'controller included',
    ledTekst:         '{areal} m² of screen · {fliser} panels'
  },

  tipMrk: 'From experience',

  budget: {
    badge:   'Estimate',
    titel:   'What it costs with us',
    hvem:    'Rental of the whole stand for the whole show, excl. VAT',
    fod:     'Every line is a range, not a fixed price. We commit once there is an approved drawing.',
    samlet:  'Around DKK {pris} for the stand',
    leads:   'At {m2} m² over {dage} show days, a realistic target is {leadFra}–{leadTil} qualified leads — DKK {prLead} per lead in stand cost.',
    daekker: 'The amount covers the stand: materials, graphics, installation, transport and our work. The show organizer’s own fees are not included — you arrange those directly with the show.'
  },

  tidslinje: {
    ugerFoer:  '{uger} weeks before',
    ugeFoer:   '{uger} week before',
    messeugen: 'Show week',
    ugenEfter: 'The week after'
  },

  oplaeg: {
    sted:         'Location',
    formaal:      'Goal',
    areal:        'Area',
    aabneSider:   'Open sides',
    vaegge:       'Walls',
    tryk:         'Print on the walls',
    gulv:         'Flooring',
    belysning:    'Lighting',
    leads:        'Expected leads',
    omraader:     'Areas and equipment',
    ingenValgt:   'None selected',
    vaeggeVaerdi: '{type}, {meter} meters at {hoejde} m high',
    estimatLabel: 'Estimate with us — rental for the whole show, excl. VAT',
    estimatNote:  'The amount covers the stand. The show organizer’s own fees are not included.',
    forbehold:    'This is an estimate, not a quote. Once we have seen the stand drawn, there is usually something to adjust — perhaps ten chairs will not fit the space, perhaps the wall should stand somewhere else. We work that out together.',
    intet:        '—'
  },

  ark: {
    udarbejdet: 'prepared {dato}',
    areal:      '{m2} m² with {sider} open sides',
    arealEn:    '{m2} m² with 1 open side',
    vaegge:     '{type}, {meter} meters at {hoejde} meters high',
    messedage:  'Show days'
  },

  prisbar: {
    seSpec:    'See breakdown',
    skjulSpec: 'Hide breakdown',
    forbehold: 'Rental for the whole show, excl. VAT. Every line is a range, because the final build is only settled on an approved drawing. The show organizer’s own price for the space is not included.'
  },

  send: {
    sender:             'Sending …',
    serverSvar:         'The server replied {status}',
    ukendtFejl:         'Unknown error',
    fejl:               'The summary could not be sent right now. Try again in a moment, or call us on +45 70 23 11 11 — we have the figures ready.',
    tak:                'Thank you — your summary is on its way to {email}',
    viVenderTilbage:    'We will look it over and come back to you about what is possible on your space. If you would rather get in touch yourself, we are on +45 70 23 11 11.',
    prototype:          'Prototype — no endpoint is set up yet, so the email is not sent. The summary is in the browser console.',
    hentPdf:            'Download the summary as a PDF',
    nulstilSpoergsmaal: 'This deletes all your choices and starts over. Are you sure?',
    konsol:             'Summary ready to send:'
  },

  ui: {
    titel:    'Stand calculator — Wieben Design',
    logoAlt:  'Wieben Design',
    brandSub: 'Stand calculator',
    prototype: 'Prototype',
    trinNav:  'Steps',

    heroEyebrow: 'Over 30 years of trade show experience · exhibitions in more than 70 countries',
    heroTitel:   'What does your exhibition stand need to do?',
    heroLead:    'Answer a few questions about your brand, products, and goals. Along the way you get our experience of what works on a stand — and at the end a complete solution, a price estimate, and a plan leading up to the show.',
    heroPunkt1:  '<strong>4 minutes</strong> from start to finished estimate',
    heroPunkt2:  '<strong>Our own prices</strong> — calculated on the equipment we actually rent out',
    heroPunkt3:  '<strong>The whole stand</strong> — materials, graphics, installation and transport in one figure',
    heroKnap:    'Get started',

    tilbage: 'Back',
    videre:  'Continue',

    profilTitel: 'Your exhibition profile',

    standenTitel:   'The stand',
    hvorMesse:      'Where is the show held?',
    land:           'Country',
    by:             'City',
    foersteDag:     'First show day',
    hvorLangt:      'Roughly how far is it from Støvring, Denmark?',
    kmEksempel:     'e.g. 700',
    kmHverVej:      'km each way',
    stoerrelse:     'Size and duration',
    areal:          'Area',
    messedage:      'Show days',
    sider:          'How many sides of the stand are open?',
    siderHjaelp:    'The number of open sides decides how many walls we build — and with it a large part of the price.',
    vaeggeGrafik:   'Walls and graphics',
    vaeghoejde:     'Wall height',
    grafikdaekning: 'Graphic coverage',
    grafikTitel:    'How far along is your artwork?',
    grafikHjaelp:   'You can get help with the full graphic design process or only the part that is missing. That decides how many hours go into making the material ready for the surfaces.',
    gulv:           'Flooring',
    haevetTitel:    'Should the floor be raised?',
    haevetHjaelp:   'A raised floor makes room for cables underneath and marks clearly where your stand begins.',
    belysning:      'Lighting',
    videreInventar: 'Continue to furnishings',

    omraaderTitel:     'What does the stand need to do?',
    omraaderIntro:     'Choose the areas your stand needs — and how many of each.',
    omraaderForbehold: 'This is a starting point, not a floor plan. When we draw the stand we work out what will actually fit, and how the areas should sit in relation to each other.',
    tilkoebTitel:      'Do you need any of these?',
    ledTitel:          'How large should the LED wall be?',
    viderePlanen:      'Continue to the plan',

    messeklarTitel:     'Show-ready',
    messeklarIntro:     'What the stand costs with us, and what happens when.',
    messeklarForbehold: 'Everything below is an estimate. Our own figures too: the final price depends on how the stand actually turns out, and how long it takes to build. The calculation is a place to start the conversation from — not a quote.',
    tidslinjeTitel:     'Timeline up to the show',
    seOpsummering:      'See summary',

    oplaegTitel: 'Your summary',
    formTitel:   'Let us explore the possibilities',
    formIntro:   'Tell us briefly who you are. Then we will look your summary over and come back to you with what is possible on your exact space — and you get all of it as a PDF with the price estimate, contents and timeline that you can take further internally. It does not commit you to anything.',
    navn:        'Name',
    virksomhed:  'Company',
    email:       'Email',
    telefon:     'Phone',
    budgetLabel: 'Do you have a budget range?',
    valgfrit:    'Optional',
    budgetTom:   'Not stated',
    budget1:     'Under DKK 75,000',
    budget2:     'DKK 75,000–150,000',
    budget3:     'DKK 150,000–300,000',
    budget4:     'Over DKK 300,000',
    budget5:     'We do not know yet',
    besked:      'Anything we should know?',
    samtykkeMrk: 'When you send',
    samtykke:    'you get the summary as a PDF in your inbox, and <strong>we will come back to you about your show</strong> — an email or a call about what is possible on your space.',
    persondata:  'We use your details only for that, and we do not pass them on. You can always ask us to delete them. Read more in our <a href="https://wiebendesign.dk/en/privacy-policy/" target="_blank" rel="noopener">privacy policy</a>.',
    sendKnap:    'Send me the summary',
    selvFoerst:  'Would you rather look at it yourself first?',
    prototypeNote: 'Prototype — the form does not send data anywhere yet.',
    startForfra: 'Start over',

    prisbarLabel: 'Estimate, Wieben Design',
    prisbarNote:  'DKK, excl. VAT',

    arkTitel:   'Exhibition stand summary',
    arkStanden: 'The stand',
    arkPris:    'Price',
    arkNote:    'All amounts are rental prices for the whole show, excl. VAT, and are an estimate. The final price depends on how the stand is built and is settled once there is an approved drawing. The amount covers the stand; the show organizer’s own fees are not included.',
    arkFrem:    'Up to the show',

    firma:       'Wieben Design A/S',
    adresse:     '· Porsborgparken 8 B, 9530 Støvring, Denmark · CVR 20099607',
    arkFod:      '+45 70 23 11 11 · wd@wiebendesign.dk · From idea to finished exhibition stand — in Denmark and at shows around the world',
    bundAdresse: '· Porsborgparken 8 B, 9530 Støvring, Denmark · +45 70 23 11 11 · wd@wiebendesign.dk · CVR 20099607',
    bundNote:    'The amounts are non-binding estimates calculated on Wieben Design’s own rental prices and are replaced by a specific quote. <a href="https://wiebendesign.dk/en/privacy-policy/" target="_blank" rel="noopener">Privacy policy</a> · <a href="https://wiebendesign.dk/en/terms-and-conditions/" target="_blank" rel="noopener">Terms and conditions</a>'
  },

  /* English puts the currency in front of the figure */
  valuta: 'DKK {tal}',

  enhed: {
    m2:   '{tal} m²',
    dag:  '{tal} day',
    dage: '{tal} days',
    kr:   'DKK {tal}'
  }
};
