/* =====================================================================
   SPROGLAG — dansk. Brugerfladens tekster, som ellers lå hardkodet
   i app.js og index.html.
   ---------------------------------------------------------------------
   {navn} er en pladsholder, der bliver erstattet af et tal eller et ord.
   Derfor er hver sætning én nøgle og ikke stykket i fragmenter: engelsk
   har en anden ordstilling, og fragmenter kan ikke ombyttes.

   En engelsk version er en kopi af denne fil med samme nøgler.
   ===================================================================== */

window.WD_TEKST = window.WD_TEKST || {};
window.WD_TEKST.da = {

  kode: 'da',
  navn: 'Dansk',
  htmlLang: 'da',
  locale: 'da-DK',

  /* ---------------- Trinnavne ---------------- */
  trin: ['Start', 'Profil', 'Standen', 'Områder', 'Messeklar', 'Oplæg'],

  /* ---------------- Låste trin ---------------- */
  laastProfil: 'Svar på de tre spørgsmål om jeres messeprofil først',
  laastOmraader: 'Vælg først, om I vil bruge vores forslag eller bygge standen selv',

  /* ---------------- Prisposter ---------------- */
  post: {
    projektstyring:     'Design og projektledelse',
    projektstyringNote: 'tegning, møder, bestillinger og koordinering med messearrangøren',
    stand:              'Stand, grafik og materialer',
    omraader:           'Indretning og udstyr',
    omraaderTom:        'ingen områder valgt',
    transport:          'Transport og opbygning',
    transportNote:      'opbygning, ind- og udbæring, tomgods, nedtagning, kørsel og forsikring — vi står for det hele',
    ialt:               'I alt'
  },

  /* ---------------- Noten under "Stand, grafik og materialer" ---------------- */
  standnote: {
    vaeg:      '{meter} meter væg',
    lysvaeg:   '{meter} meter lysvæg',
    tryk:      '{areal} m² tryk',
    grafik:    'grafisk arbejde {fra}–{til} timer',
    haevet:    '{gulv}, hævet',
    stroem:    'strøm'
  },

  /* ---------------- Montage og transport ---------------- */
  montage: {
    opbygning:        'Opbygning, ind- og udbæring, nedtagning og pakning',
    opbygningNote:    'anslået {fra}–{til} mandtimer med {montoerer} montører',
    oversoeiskFragt:  'Oversøisk fragt',
    oversoeiskNote:   'hele standen i én forsendelse — aftales konkret med speditøren',
    rejse:            'Montørernes rejse',
    rejseNote:        '{montoerer} mand tur/retur',
    ophold:           'Ophold og fortæring',
    forsikring:       'Forsikring af transporten',
    fragt:            'Fragt og montørernes rejse',
    fragtNote:        'hele standen i én lastbil, {km} km med speditør · fly til {montoerer} mand',
    koersel:          'Kørsel og køretid',
    koerselNote:      '{km} km hver vej, ca. {timer} timer på vejen',
    tomgods:          'Tomgods under messen',
    tomgodsNote:      'opbevaring af de tomme kasser'
  },

  /* ---------------- Vores råd (trin 2) ---------------- */
  raad: {
    mrk:        'Vores råd til jer',
    leads:      'I skal hjem med leads. Det betyder mange korte samtaler: hold facaden åben, sæt disken tilbage i standen og brug ståborde frem for lounge — folk der sidder ned, optager pladsen længere end de bidrager.',
    brand:      'I skal ses. Prioritér grafikhøjde og lys frem for møbler. Det, der virker på tyve meters afstand, er store flader, klare budskaber og bevægelse — ikke detaljer.',
    lancering:  'I lancerer. Byg standen om ét brændpunkt: ét belyst produkt, én skærm, én sætning. Alt andet på standen skal pege derhen.',
    relationer: 'I skal holde møder. Prioritér siddepladser, afskærmning og servering. Det er ikke standens facade, der afgør succesen — det er hvor længe folk bliver.',
    basis:      'Vi holder det rent og funktionelt.',
    plus:       'Vi giver den et niveau mere på grafik og lys.',
    signatur:   'Vi går efter en stand, der bliver husket — det koster på grafik, lys og materialer.',
    lille:      'På under 12 m² er disciplin vigtigere end idéer: ét budskab, ét produkt, plads til to mennesker.',
    mellem:     'På {m2} m² har I plads til en disk, et par ståborde og et lille depot — ikke meget mere.',
    stor:       'På {m2} m² kan standen bære flere zoner: mødeplads, demo og depot hver for sig.'
  },

  /* ---------------- Sted og transport (trin 2) ---------------- */
  sted: {
    andenBy:     'Angiv afstanden herunder',
    oversoeisk:  'Uden for Europa sender vi standen med speditør, og montørerne flyver. Vi har lagerfaciliteter i både Danmark og USA og erfaring fra messer i mere end 70 lande — den præcise fragt aftaler vi konkret.',
    skrivKm:     'Skriv cirka hvor langt der er fra vores værksted i Støvring, så regner vi transporten ud fra det.',
    afstand:     'Ca. {km} km fra vores værksted i Støvring.',
    viaSpeditoer: 'På den afstand er det billigere at sende standen med speditør og flyve montørerne derned — så det regner vi med.',
    egenKoersel: 'Vi kører selv derned med standen.',
    broMed:      'Broafgift er regnet med.'
  },

  /* ---------------- Standen (trin 2) ---------------- */
  standen: {
    maal:        'Ca. {bredde} × {dybde} meter · plads til omkring {samtaler} samtidige samtaler.',
    vaegflade:   'Det giver ca. {meter} meter væg — {areal} m² vægflade i {hoejde} meters højde.',
    oeStand:     'En fritliggende stand har ingen nabovægge, så vi regner med en fritstående vægblok til depot, grafik og teknik.',
    hoejOver:    'Over {fri} meter skal messen sige god for højden. Grænsen står i udstillerhåndbogen og ligger typisk mellem 3 og 6 meter — vi tjekker den, før vi tegner.',
    hoejPixlip:  'Lysvægge fås op til 4 meter. Skal I højere op, skal væggene være almindelige.',
    hoejFri:     'Op til {fri} meter kan I regne med, at det er tilladt. Derover afhænger det af messens regler.',
    ikkeLysvaeg: 'Findes ikke som lysvæg',
    forStanden:  'for jeres stand',
    forTrykket:  '{pris} kr. for trykket',
    prM2:        '{pris} kr./m²',
    oveniGulvet: 'oveni gulvet',
    ingenUdgift: 'Ingen ekstra udgift',
    spots:       '{antal} spots',
    anslaaetTimer: 'anslået {fra}–{til} timer'
  },

  /* ---------------- Områder (trin 3) ---------------- */
  omraade: {
    faerre:      'Færre',
    flere:       'Flere',
    vaelg:       'Vælg de områder, standen skal have. Vi holder øje med, om der er plads til dem.',
    forMeget:    'Områderne fylder ca. {brugt} m² — mere end de {m2} m², I har. Noget må ud, vælges mindre, eller også skal standen være større.',
    trangt:      'Områderne fylder ca. {brugt} m² af jeres {m2} m² — omkring {andel} %. Det bliver trangt: gæsterne skal også kunne bevæge sig rundt.',
    passer:      'Områderne fylder ca. {brugt} m² af jeres {m2} m² — omkring {andel} %. Resten er plads at gå på.',
    brugForslag: 'Brug vores forslag',
    brugForslagTekst: 'Vi sætter {antal} områder op ud fra jeres formål og standens størrelse. Bagefter kan I rette i det hele — det er kun et udgangspunkt.',
    forHeleMessen: 'for hele messen',
    byggSelv:    'Jeg bygger selv',
    byggSelvTekst: 'Start med en tom stand og vælg områderne én for én. Vi holder øje med, om der er plads til dem.',
    byggSelvMeta: 'Tager et par minutter mere',
    paaForslag:  'I bygger videre på vores forslag',
    paaSelv:     'I bygger selv standen op',
    valgtSum:    '{antal} valg til {pris} kr. for hele messen. Rul ned og ret frit i det.',
    ingenValgt:  'Ingen områder valgt endnu. Rul ned og vælg dem, standen skal have.',
    hentForslag: 'Hent forslaget igen',
    brugAlligevel: 'Brug vores forslag alligevel',
    startForfra: 'Start forfra',
    ledMeta:     'inkl. styring',
    ledTekst:    '{areal} m² skærm · {fliser} moduler'
  },

  /* ---------------- Faglige tip ---------------- */
  tipMrk: 'Fagligt tip',

  /* ---------------- Messeklar (trin 4) ---------------- */
  budget: {
    badge:    'Estimat',
    titel:    'Det koster hos os',
    hvem:     'Leje af hele standen for hele messen, ekskl. moms',
    fod:      'Hver post er et spænd, ikke en fast pris. Vi lægger os først fast, når der ligger en godkendt tegning.',
    samlet:   'Cirka {pris} kr. for standen',
    leads:    'Med {m2} m² og {dage} messedage er et realistisk mål {leadFra}–{leadTil} kvalificerede leads — {prLead} kr. pr. lead i standomkostning.',
    daekker:  'Beløbet dækker standen: materiel, grafik, opbygning, transport og vores arbejde. Messearrangørens egne gebyrer er ikke med — dem aftaler I direkte med messen.'
  },

  /* ---------------- Tidslinje ---------------- */
  tidslinje: {
    ugerFoer: '{uger} uger før',
    ugeFoer:  '{uger} uge før',
    messeugen: 'Messeugen',
    ugenEfter: 'Ugen efter'
  },

  /* ---------------- Oplæg (trin 5) ---------------- */
  oplaeg: {
    sted:        'Sted',
    formaal:     'Formål',
    areal:       'Areal',
    aabneSider:  'Åbne sider',
    vaegge:      'Vægge',
    tryk:        'Tryk på væggene',
    gulv:        'Gulv',
    belysning:   'Belysning',
    leads:       'Forventede leads',
    omraader:    'Områder og udstyr',
    ingenValgt:  'Ingen valgt',
    vaeggeVaerdi: '{type}, {meter} meter i {hoejde} m højde',
    estimatLabel: 'Estimat hos os — leje for hele messen, ekskl. moms',
    estimatNote: 'Beløbet dækker standen. Messearrangørens egne gebyrer er ikke med.',
    forbehold:   'Det er et estimat, ikke et tilbud. Når vi har set standen tegnet, er der typisk noget der skal justeres — måske passer ti stole ikke til pladsen, måske skal væggen stå et andet sted. Det finder vi ud af sammen.',
    intet:       '—'
  },

  /* ---------------- PDF-arket ---------------- */
  ark: {
    udarbejdet:  'udarbejdet {dato}',
    areal:       '{m2} m² med {sider} åbne sider',
    arealEn:     '{m2} m² med 1 åben side',
    vaegge:      '{type}, {meter} meter i {hoejde} meters højde',
    messedage:   'Messedage'
  },

  /* ---------------- Prisbjælken ---------------- */
  prisbar: {
    seSpec:    'Se specifikation',
    skjulSpec: 'Skjul specifikation',
    forbehold: 'Leje for hele messen, ekskl. moms. Hver post er et spænd, fordi den endelige opbygning først ligger fast på en godkendt tegning. Messearrangørens egen pris for pladsen ligger uden for beløbet.'
  },

  /* ---------------- Afsendelse ---------------- */
  send: {
    sender:      'Sender …',
    serverSvar:  'Serveren svarede {status}',
    ukendtFejl:  'Ukendt fejl',
    fejl:        'Oplægget kunne ikke sendes lige nu. Prøv igen om et øjeblik, eller ring til os på 70 23 11 11 — vi har tallene klar.',
    tak:         'Tak — oplægget er på vej til {email}',
    viVenderTilbage: 'Vi kigger det igennem og vender tilbage om, hvad der kan lade sig gøre på jeres plads. Vil I hellere selv tage fat, er vi på 70 23 11 11.',
    prototype:   'Prototype — der er ikke sat et endpoint op endnu, så mailen bliver ikke sendt. Oplægget ligger i browserens konsol.',
    hentPdf:     'Hent oplægget som PDF',
    nulstilSpoergsmaal: 'Sletter alle jeres valg og starter forfra. Er I sikre?',
    konsol:      'Oplæg klar til afsendelse:'
  },

  /* ---------------- Enheder ---------------- */
  enhed: {
    m2:     '{tal} m²',
    dag:    '{tal} dag',
    dage:   '{tal} dage',
    kr:     '{tal} kr.'
  }
};
