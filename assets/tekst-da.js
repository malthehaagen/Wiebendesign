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
    afstandMidt: 'Ca. {km} km fra vores værksted i Støvring — regnet til midten af {land}. Kender I afstanden bedre, kan I rette den herunder.',
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
    spots:       '{antal} spots'
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

  /* ---------------- Faste tekster i index.html ----------------
     Fyldes ind via data-t (tekst) og data-t-html (må indeholde <strong>).
     Teksten står IKKE også i markuppen: én kilde, og ingen dansk tekst der
     blinker forbi, før den engelske udgave er fyldt ind.               */
  ui: {
    titel:        'Standberegner — Wieben Design',
    logoAlt:      'Wieben Design',
    brandSub:     'Standberegner',
    prototype:    'Prototype',
    trinNav:      'Trin',

    heroEyebrow:  'Mere end 30 års erfaring · messer i mere end 70 lande',
    heroTitel:    'Hvad skal jeres messestand kunne?',
    heroLead:     'Svar på nogle få spørgsmål om jeres brand, produkter og mål. Undervejs får I vores erfaring med, hvad der virker på en stand — og til sidst en sammensat løsning, en pris og en plan frem mod messedagen.',
    heroPunkt1:   '<strong>4 minutter</strong> fra start til færdigt estimat',
    heroPunkt2:   '<strong>Vores egne priser</strong> — beregnet på det, vi rent faktisk lejer ud',
    heroPunkt3:   '<strong>Hele standen</strong> — materialer, grafik, opbygning og transport i ét tal',
    heroKnap:     'Kom i gang',

    tilbage:      'Tilbage',
    videre:       'Videre',

    profilTitel:  'Jeres messeprofil',

    standenTitel: 'Standen',
    hvorMesse:    'Hvor holdes messen?',
    land:         'Land',
    by:           'By',
    foersteDag:   'Første messedag',
    hvorLangt:    'Cirka hvor langt er der fra Støvring?',
    kmEksempel:   'F.eks. 700',
    kmHverVej:    'km hver vej',
    stoerrelse:   'Størrelse og varighed',
    areal:        'Areal',
    messedage:    'Messedage',
    sider:        'Hvor mange sider af standen er åbne?',
    siderHjaelp:  'Antallet af åbne sider afgør, hvor mange vægge vi skal bygge — og dermed en stor del af prisen.',
    vaeggeGrafik: 'Vægge og grafik',
    vaeghoejde:   'Væghøjde',
    grafikdaekning: 'Grafikdækning',
    grafikTitel:  'Hvor langt er I med grafikken?',
    grafikHjaelp: 'I kan få hjælp til hele det grafiske arbejde eller blot den del, der mangler. Det afgør, hvor mange timer der går med at gøre materialet klar til fladerne.',
    gulv:         'Gulv',
    haevetTitel:  'Skal gulvet hæves?',
    haevetHjaelp: 'Et hævet gulv giver plads til kabler under gulvet og markerer tydeligt, hvor jeres stand begynder.',
    belysning:    'Belysning',
    videreInventar: 'Videre til inventar',

    omraaderTitel: 'Hvad skal standen kunne?',
    omraaderIntro: 'Vælg de områder, jeres stand skal have — og hvor mange af hver.',
    omraaderForbehold: 'Det er et udgangspunkt, ikke en plantegning. Når vi tegner standen, finder vi ud af, hvad der rent faktisk kan være, og hvordan områderne skal ligge i forhold til hinanden.',
    tilkoebTitel:  'Skal der være noget af det her?',
    ledTitel:      'Hvor stor skal LED-væggen være?',
    viderePlanen:  'Videre til planen',

    messeklarTitel: 'Messeklar',
    messeklarIntro: 'Hvad standen koster hos os, og hvad der sker hvornår.',
    messeklarForbehold: 'Alt herunder er et estimat. Også vores egne tal: den endelige pris afhænger af, hvordan standen faktisk kommer til at se ud, og hvor lang tid den tager at bygge. Beregningen er et sted at starte samtalen fra — ikke et tilbud.',
    tidslinjeTitel: 'Tidslinje frem mod messen',
    seOpsummering:  'Se opsummering',

    oplaegTitel:  'Jeres oplæg',
    formTitel:    'Lad os se på mulighederne',
    formIntro:    'Fortæl os kort, hvem I er. Så kigger vi oplægget igennem og vender tilbage med, hvad der kan lade sig gøre på præcis jeres plads — og I får det hele som PDF med prisestimat, indhold og tidslinje, I kan tage med videre internt. Det forpligter jer ikke til noget.',
    navn:         'Navn',
    virksomhed:   'Virksomhed',
    email:        'E-mail',
    telefon:      'Telefon',
    budgetLabel:  'Har I en budgetramme?',
    valgfrit:     'Valgfrit',
    budgetTom:    'Ikke oplyst',
    budget1:      'Under 75.000 kr.',
    budget2:      '75.000–150.000 kr.',
    budget3:      '150.000–300.000 kr.',
    budget4:      'Over 300.000 kr.',
    budget5:      'Det ved vi ikke endnu',
    besked:       'Noget vi skal vide?',
    samtykkeMrk:  'Når I sender',
    samtykke:     'får I oplægget som PDF i indbakken, og <strong>vi vender tilbage om jeres messe</strong> — en mail eller et opkald om, hvad der kan lade sig gøre på jeres plads.',
    persondata:   'Vi bruger kun jeres oplysninger til det, og vi videregiver dem ikke. I kan altid bede os om at slette dem. Læs mere i vores <a href="https://wiebendesign.dk/privatlivspolitik/" target="_blank" rel="noopener">privatlivspolitik</a>.',
    sendKnap:     'Send oplægget til mig',
    selvFoerst:   'Vil I helst kigge på det selv først?',
    prototypeNote: 'Prototype — formularen sender ikke data nogen steder hen endnu.',
    startForfra:  'Start forfra',

    prisbarLabel: 'Estimat, Wieben Design',
    prisbarNote:  'kr. ekskl. moms',

    arkTitel:     'Oplæg til messestand',
    arkStanden:   'Standen',
    arkPris:      'Pris',
    arkNote:      'Alle beløb er lejepriser for hele messen, ekskl. moms, og er et estimat. Den endelige pris afhænger af standens opbygning og fastlægges, når der ligger en godkendt tegning. Beløbet dækker standen; messearrangørens egne gebyrer er ikke med.',
    arkFrem:      'Frem mod messen',

    firma:        'Wieben Design A/S',
    adresse:      '· Porsborgparken 8 B, 9530 Støvring · CVR 20099607',
    arkFod:       '+45 70 23 11 11 · wd@wiebendesign.dk · Fra idé til færdig messestand — i Danmark og på messer verden over',
    bundAdresse:  '· Porsborgparken 8 B, 9530 Støvring · +45 70 23 11 11 · wd@wiebendesign.dk · CVR 20099607',
    bundNote:     'Beløbene er uforpligtende estimater beregnet på Wieben Designs egne lejepriser og erstattes af et konkret tilbud. <a href="https://wiebendesign.dk/privatlivspolitik/" target="_blank" rel="noopener">Privatlivspolitik</a> · <a href="https://wiebendesign.dk/handelsbetingelser/" target="_blank" rel="noopener">Handelsbetingelser</a>'
  },

  /* Valutaen. Dansk sætter "kr." efter tallet; engelsk sætter "DKK" foran.
     Derfor en skabelon og ikke et suffiks. */
  valuta: '{tal} kr.',

  /* ---------------- Enheder ---------------- */
  enhed: {
    m2:     '{tal} m²',
    dag:    '{tal} dag',
    dage:   '{tal} dage',
    kr:     '{tal} kr.'
  }
};
