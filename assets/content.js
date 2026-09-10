/* =====================================================================
   INDHOLD — tekster, messer, faglige indsigter og illustrationer.
   Priser ligger IKKE her, men i assets/pricing.js.
   Nøgler her skal matche nøglerne i pricing.js.
   ===================================================================== */

window.WD_INDHOLD = {

  /* ---------------- Lande og byer ----------------
     Kun de messebyer, Wieben Design realistisk kører til. Listen er bevidst
     kort — den udvides, efterhånden som der er brug for det.
     km = omtrentlig køreafstand fra Støvring, én vej.
     bro = broafgift over Storebælt eller Øresund.
     Tallene er cirkatal til et estimat, ikke ruteberegning.            */
  lande: [
    { id: 'dk', navn: 'Danmark', byer: [
      { navn: 'Aalborg',     km: 25,  bro: false },
      { navn: 'Aarhus',      km: 105, bro: false },
      { navn: 'Herning',     km: 130, bro: false },
      { navn: 'Fredericia',  km: 185, bro: false },
      { navn: 'Odense',      km: 250, bro: false },
      { navn: 'Roskilde',    km: 380, bro: true  },
      { navn: 'København',   km: 400, bro: true  }
    ]},
    { id: 'de', navn: 'Tyskland', byer: [
      { navn: 'Hamborg',     km: 380,  bro: false },
      { navn: 'Bremen',      km: 490,  bro: false },
      { navn: 'Hannover',    km: 620,  bro: false },
      { navn: 'Berlin',      km: 640,  bro: false },
      { navn: 'Düsseldorf',  km: 720,  bro: false },
      { navn: 'Köln',        km: 750,  bro: false },
      { navn: 'Frankfurt',   km: 900,  bro: false },
      { navn: 'Nürnberg',    km: 1000, bro: false },
      { navn: 'München',     km: 1150, bro: false }
    ]},
    { id: 'se', navn: 'Sverige', byer: [
      { navn: 'Malmø',       km: 430, bro: true },
      { navn: 'Göteborg',    km: 560, bro: true },
      { navn: 'Jönköping',   km: 640, bro: true },
      { navn: 'Stockholm',   km: 900, bro: true }
    ]},
    { id: 'no', navn: 'Norge', byer: [
      { navn: 'Oslo',        km: 860, bro: true },
      { navn: 'Lillestrøm',  km: 880, bro: true }
    ]},
    { id: 'nl', navn: 'Holland', byer: [
      { navn: 'Amsterdam',   km: 700, bro: false },
      { navn: 'Utrecht',     km: 730, bro: false },
      { navn: 'Rotterdam',   km: 780, bro: false }
    ]},
    { id: 'be', navn: 'Belgien', byer: [
      { navn: 'Kortrijk',    km: 880, bro: false },
      { navn: 'Bruxelles',   km: 900, bro: false }
    ]},
    { id: 'gb', navn: 'Storbritannien', byer: [
      { navn: 'London',      km: 1100, bro: false },
      { navn: 'Birmingham',  km: 1250, bro: false }
    ]},
    { id: 'fr', navn: 'Frankrig', byer: [
      { navn: 'Paris',       km: 1200, bro: false },
      { navn: 'Lyon',        km: 1550, bro: false }
    ]},
    { id: 'it', navn: 'Italien', byer: [
      { navn: 'Milano',      km: 1550, bro: false },
      { navn: 'Verona',      km: 1650, bro: false },
      { navn: 'Bologna',     km: 1750, bro: false }
    ]},
    { id: 'andet', navn: 'Et andet land', byer: [] }
  ],

  /* Vises som sidste valg under hvert land */
  andenBy: 'En anden by',

  /* ---------------- Trin 1: Messeprofil ---------------- */
  profilSpoergsmaal: [
    {
      id: 'formaal',
      spoergsmaal: 'Hvad skal messen først og fremmest give jer?',
      hjaelp: 'Formålet afgør, hvordan standen skal indrettes — ikke omvendt.',
      valg: [
        { id: 'leads',      titel: 'Kvalificerede leads',          tekst: 'I skal hjem med konkrete emner i pipeline.' },
        { id: 'brand',      titel: 'Synlighed og brand',           tekst: 'I skal ses, huskes og tages alvorligt i branchen.' },
        { id: 'lancering',  titel: 'Produktlancering',             tekst: 'Ét produkt skal have hele opmærksomheden.' },
        { id: 'relationer', titel: 'Pleje af eksisterende kunder', tekst: 'Møder, aftaler og fortrolige samtaler.' }
      ]
    },
    {
      id: 'erfaring',
      spoergsmaal: 'Hvor godt kender I messeformatet?',
      valg: [
        { id: 'foerste',  titel: 'Det er vores første',   tekst: 'Vi skal have hjælp til det hele.' },
        { id: 'enkelte',  titel: 'Vi har prøvet det',     tekst: 'Et par messer, men ingen fast rutine.' },
        { id: 'rutine',   titel: 'Vi har fast rutine',    tekst: 'Messer er en kernekanal for os.' }
      ]
    },
    {
      id: 'ambition',
      spoergsmaal: 'Hvor højt skal ambitionsniveauet ligge?',
      hjaelp: 'Det påvirker grafik, lys og materialer — ikke om standen virker.',
      valg: [
        { id: 'basis',    titel: 'Basis',    tekst: 'Ordentligt, rent og funktionelt. Pengene skal bruges rigtigt.' },
        { id: 'plus',     titel: 'Plus',     tekst: 'Standen skal skille sig ud på gangen.' },
        { id: 'signatur', titel: 'Signatur', tekst: 'Standen skal være det, folk taler om efter messen.' }
      ]
    }
  ],

  /* ---------------- Åbne sider ---------------- */
  aabneSider: {
    1: { titel: '1 åben side',  tekst: 'Naboer på begge sider og bagvæg. Tre sider skal bygges.' },
    2: { titel: '2 åbne sider', tekst: 'Typisk for enden af en række. To sider skal bygges.' },
    3: { titel: '3 åbne sider', tekst: 'Kun én nabo. Én side skal bygges.' },
    4: { titel: '4 åbne sider', tekst: 'Fritliggende i hallen. Ingen vægge mod naboer.' }
  },

  /* ---------------- Vægge, gulv, lys ---------------- */
  vaegtyper: {
    print:  { titel: 'Almindelige vægge',  tekst: 'Hvide vægge, hvor jeres billeder og budskaber printes direkte på. Det, de fleste stande er bygget af.', teknik: 'beMatrix rammesystem' },
    pixlip: { titel: 'Lysvægge',           tekst: 'Væggene lyser indefra, så billederne står som på en skærm. Dyrere, men ingen anden væg trækker blikket på samme måde.', teknik: 'Pixlip backlit' }
  },
  grafikdaekning: {
    ingen:  { titel: 'Ingenting',              tekst: 'Rene hvide vægge uden tryk.' },
    delvis: { titel: 'De vigtigste flader',    tekst: 'Tryk der hvor folk kigger — cirka halvdelen af væggene.' },
    fuld:   { titel: 'Det hele',               tekst: 'Tryk på alle vægflader.' }
  },
  gulv: {
    ingen:  { titel: 'Hallens gulv',  tekst: 'Ingen belægning.' },
    taeppe: { titel: 'Tæppe',         tekst: 'Antracitgråt tæppe med blødt underlag. Det mest almindelige valg.' },
    vinyl:  { titel: 'Vinyl',         tekst: 'Hvidt, glat gulv. Skarpt og lyst.' },
    trae:   { titel: 'Trægulv',       tekst: 'Naturtræ. Det varmeste udtryk — og det dyreste.' }
  },
  belysning: {
    standard:    { titel: 'Almindeligt',  tekst: 'Spots på væggene. Nok til at standen er ordentligt oplyst.' },
    forstaerket: { titel: 'Ekstra lys',   tekst: 'Flere og kraftigere spots. Mærkbart lysere end nabostandene.' },
    pro:         { titel: 'Kraftigt lys', tekst: 'Store projektører til høje vægge og store flader.' }
  },

  /* ---------------- Katalog: navne og beskrivelser ---------------- */
  katalogGrupper: [
    { id: 'diske',   titel: 'Diske, depot og opbevaring' },
    { id: 'moebler', titel: 'Møbler' },
    { id: 'teknik',  titel: 'Skærme og teknik' },
    { id: 'kaffe',   titel: 'Kaffe og køkken' }
  ],
  varer: {
    expo_bar:    { navn: 'Bardisk',                  besk: 'i barhøjde, 1 meter bred',          ikon: 'disk' },
    expo_skab:   { navn: 'Disk med aflåst skab',     besk: '1 meter bred — tasker og værdier',  ikon: 'disk' },
    expo_hylde:  { navn: 'Disk med hylder',          besk: '1 meter bred',                      ikon: 'disk' },
    izi_disk:    { navn: 'Infodisk',                 besk: 'til at tage imod ved',              ikon: 'disk' },
    ubord:       { navn: 'U-formet bord',            besk: 'plads til flere rundt om',          ikon: 'bord' },
    vitrine:     { navn: 'Glasmontre med lys',       besk: '50 × 50 cm, 2 meter høj',           ikon: 'vitrine' },
    abc_reol:    { navn: 'Reol til depotet',         besk: 'til kasser og materialer',          ikon: 'reol' },
    depot_bord:  { navn: 'Arbejdsbord til depotet',  besk: '1 meter',                           ikon: 'bord' },

    staabord:    { navn: 'Ståbord',                  besk: 'rundt, 70 cm',                      ikon: 'bord' },
    cafebord:    { navn: 'Cafébord i siddehøjde',    besk: 'rundt, 80 cm',                      ikon: 'bord' },
    barstol:     { navn: 'Barstol',                  besk: 'til ståbordene',                    ikon: 'stol' },
    skalstol:    { navn: 'Stol uden armlæn',         besk: 'hvid',                              ikon: 'stol' },
    stol_arm:    { navn: 'Stol med armlæn',          besk: 'lyst træ, polstret',                ikon: 'stol' },
    loungestol:  { navn: 'Lænestol',                 besk: 'til møder der tager tid',           ikon: 'lounge' },
    loungebord:  { navn: 'Sofabord',                 besk: 'sort eller hvidt',                  ikon: 'bord' },
    sofa:        { navn: 'Sofa',                     besk: '2-personers',                       ikon: 'lounge' },
    brochure:    { navn: 'Brochurestativ',           besk: 'står på gulvet',                    ikon: 'brochure' },
    stumtjener:  { navn: 'Stativ til overtøj',       besk: 'med bøjler',                        ikon: 'knage' },
    affald:      { navn: 'Skraldespand',             besk: '90 cm høj, poser med',              ikon: 'affald' },

    mon32:       { navn: 'Skærm, 32 tommer',         besk: 'ophæng med i prisen',               ikon: 'skaerm' },
    mon43:       { navn: 'Skærm, 43 tommer',         besk: 'ophæng med i prisen',               ikon: 'skaerm' },
    mon55:       { navn: 'Skærm, 55 tommer',         besk: 'ophæng med i prisen',               ikon: 'skaerm' },
    mon65:       { navn: 'Skærm, 65 tommer',         besk: 'ophæng med i prisen',               ikon: 'skaerm' },
    mon75:       { navn: 'Skærm, 75 tommer',         besk: 'ophæng med i prisen',               ikon: 'skaerm' },
    stander:     { navn: 'Gulvstander til skærm',    besk: 'hvis skærmen ikke skal på væggen',  ikon: 'skaerm' },
    afspiller:   { navn: 'Afspiller til skærmen',    besk: 'kører jeres video i sløjfe',        ikon: 'teknik' },
    ledskin:     { navn: 'LED-væg, pr. flise',       besk: '50 × 50 cm — bygges som en mur',    ikon: 'led' },
    novastar:    { navn: 'Styring til LED-væggen',   besk: 'én pr. LED-væg',                    ikon: 'teknik' },

    nespresso_s: { navn: 'Espressomaskine, stor',    besk: 'Nespresso — til travle stande',     ikon: 'kaffe' },
    nespresso_l: { navn: 'Espressomaskine, lille',   besk: 'Nespresso',                         ikon: 'kaffe' },
    bonamat:     { navn: 'Filterkaffemaskine',       besk: '12 kopper ad gangen',               ikon: 'kaffe' },
    vandkoger:   { navn: 'Elkedel',                  besk: 'til te og instant',                 ikon: 'kaffe' },
    koeleskab_h: { navn: 'Køleskab, højt',           besk: '170 cm med glaslåge',               ikon: 'koel' },
    koeleskab_l: { navn: 'Køleskab, lavt',           besk: 'under disken, med glaslåge',        ikon: 'koel' },
    vask:        { navn: 'Vask med afløb',           besk: 'indbygget i et bordmodul',          ikon: 'koel' },
    papkrus:     { navn: 'Papkrus',                  besk: '50 stk.',                           ikon: 'kaffe' }
  },

  /* ---------------- Faglige indsigter ---------------- */
  indsigter: [
    { id: 'depot', vaegt: 9,
      naar: s => s.stand.m2 >= 15 && !s.kurv.abc_reol && !s.kurv.expo_skab,
      titel: 'Hvor skal kasserne stå?',
      tekst: 'Afsæt 15–20 % af arealet til aflåst depot. Uden det ender emballage, jakker og brochurekasser bag disken — og det er det første, gæsten ser. En ABC-reol og en bordplade koster under 700 kr. for hele messen.' },

    { id: 'aabneSider', vaegt: 8,
      naar: s => s.stand.aabneSider === 1 && s.stand.m2 >= 20,
      titel: 'Spørg efter en ekstra åben side',
      tekst: 'Med én åben side skal I bygge tre vægge — og gæsten kan kun komme ind ét sted. To åbne sider fanger trafik fra begge retninger og sparer jer en hel vægflade. Merprisen hos arrangøren er typisk 5–10 %.' },

    { id: 'treSekunder', vaegt: 10,
      naar: s => s.stand.grafik === 'ingen',
      titel: '3-sekundersreglen',
      tekst: 'En gæst går forbi jeres stand på tre sekunder. På den tid skal hun kunne se hvem I er, og hvilket problem I løser — på fem meters afstand. Rene vægge svarer til at møde op uden skilt.' },

    { id: 'lys', vaegt: 7,
      naar: s => s.stand.belysning === 'standard',
      titel: 'Lys er den billigste opgradering',
      tekst: 'Messehaller er mørkere, end folk husker. Går I fra standard- til forstærket lys, koster det typisk et par tusind kroner for hele messen — og det løfter standen mere end noget andet beløb i samme størrelse.' },

    { id: 'kaffe', vaegt: 8,
      naar: s => !s.kurv.nespresso_s && !s.kurv.nespresso_l && !s.kurv.bonamat && s.stand.m2 >= 15,
      titel: 'Kaffe holder folk stående',
      tekst: 'Den simpleste måde at forlænge en samtale fra 40 sekunder til fire minutter. Fire minutter er forskellen på en hilsen og et lead. En Nespresso koster 500 kr. for hele messen.' },

    { id: 'siddeplads', vaegt: 7,
      naar: s => s.profil.formaal === 'relationer' && !s.kurv.cafebord && !s.kurv.loungestol && !s.kurv.sofa,
      titel: 'Møder kræver et sted at sidde',
      tekst: 'I vil pleje kunderelationer. Den samtale foregår ikke ved et ståbord to meter fra jeres konkurrent. Et loungehjørne eller et siddebord med fire stole er ikke luksus — det er formålet med at være der.' },

    { id: 'lancering', vaegt: 7,
      naar: s => s.profil.formaal === 'lancering' && !s.kurv.vitrine && !s.kurv.mon55 && !s.kurv.mon65 && !s.kurv.mon75,
      titel: 'Ét produkt, ét brændpunkt',
      tekst: 'Ved en lancering skal alt andet træde tilbage. Et belyst vitrineskab eller én stor skærm midt i standen slår ti produkter på hylder — hver gang.' },

    { id: 'skaerm', vaegt: 6,
      naar: s => s.stand.m2 >= 24 && !s.kurv.mon43 && !s.kurv.mon55 && !s.kurv.mon65 && !s.kurv.mon75 && !s.kurv.ledskin,
      titel: 'Bevægelse fanger øjet',
      tekst: 'Fra ca. 24 m² kan standen bære en stor skærm. Bevægelse er det eneste, der trækker blikket på lang afstand i en messehal — og en 55-tommer koster 2.750 kr. for hele messen.' },

    { id: 'bemanding', vaegt: 8,
      naar: s => s.team.personer * WD_PRIS.leads.m2PrPerson < s.stand.m2,
      titel: 'I er for få på standen',
      tekst: 'Regn med én person pr. ca. 5 m² i åbningstiden, og aldrig færre end to. En optaget sælger koster jer den næste gæst — og gæster går ikke ind på en tom stand.' },

    { id: 'pixlip', vaegt: 6,
      naar: s => s.profil.ambition === 'signatur' && s.stand.vaegtype === 'print',
      titel: 'Der findes et niveau over almindelige vægge',
      tekst: 'I har sat ambitionen til signatur. Lysvægge lyser indefra, så billederne står som på en skærm hele vejen rundt. De koster mærkbart mere pr. meter — prøv at slå dem til og se forskellen.' },

    { id: 'opfoelgning', vaegt: 4,
      naar: () => true,
      titel: 'Messen vindes ugen efter',
      tekst: 'Hovedparten af messeleads lukkes efter messen — men kun hvis de bliver fulgt op hurtigt. Aftal opfølgningsprocessen, før I kører til messen, ikke efter.' }
  ],

  /* ---------------- Tidslinje (uger før messen) ---------------- */
  tidslinje: [
    { uger: 32, titel: 'Book plads og placering',      tekst: 'De gode hjørne- og ø-pladser bliver taget først. Meld jer til, så snart standplanen åbner.' },
    { uger: 20, titel: 'Koncept og designoplæg',       tekst: 'Formål, budskab og indretning på plads. Her træffes de valg, der binder resten.' },
    { uger: 14, titel: 'Godkendelse af tegning',       tekst: 'Endelig godkendelse af 3D og plantegning. Herefter reserveres materiellet.' },
    { uger: 10, titel: 'Bestil el, vand og internet',  tekst: 'Bestilles hos messecenteret — sent bestilt bliver dyrere bestilt.' },
    { uger: 6,  titel: 'Deadline for grafikfiler',     tekst: 'Print skal produceres og monteres. Efter denne dato bliver ændringer dyre.' },
    { uger: 4,  titel: 'Møbler og udstyr låst',        tekst: 'Møbelleje, skærme og kaffeløsning reserveres til levering direkte på standen.' },
    { uger: 3,  titel: 'Bemanding og leadproces',      tekst: 'Hvem står hvornår? Hvordan registreres et lead? Hvem følger op — og hvornår?' },
    { uger: 2,  titel: 'Kundeinvitationer sendt',      tekst: 'De vigtigste møder bookes før messen. Standen er rammen, ikke rekrutteringen.' },
    { uger: 1,  titel: 'Pakning på værkstedet',        tekst: 'Standen pakkes og køres afsted. Vi håndterer levering, indbæring og opbygning.' },
    { uger: 0,  titel: 'Opbygning og messe',           tekst: 'Vi bygger typisk op 1–2 dage før åbning og tager ned umiddelbart efter lukning.' },
    { uger: -1, titel: 'Opfølgning på leads',          tekst: 'Alle leads kontaktet inden for fem hverdage.' }
  ],

  /* ---------------- Illustrationer ----------------
     Placeholdere. Erstattes med fotos — se README.md.  */
  svg: {
    sider1: '<svg viewBox="0 0 100 70"><rect class="hal" x="6" y="6" width="88" height="58"/><rect class="stand" x="28" y="16" width="44" height="38"/><line class="aaben" x1="28" y1="54" x2="72" y2="54"/><rect class="nabo" x="10" y="16" width="16" height="38"/><rect class="nabo" x="74" y="16" width="16" height="38"/></svg>',
    sider2: '<svg viewBox="0 0 100 70"><rect class="hal" x="6" y="6" width="88" height="58"/><rect class="stand" x="46" y="16" width="44" height="38"/><line class="aaben" x1="46" y1="54" x2="90" y2="54"/><line class="aaben" x1="46" y1="16" x2="46" y2="54"/><rect class="nabo" x="10" y="16" width="28" height="38"/></svg>',
    sider3: '<svg viewBox="0 0 100 70"><rect class="hal" x="6" y="6" width="88" height="58"/><rect class="stand" x="30" y="16" width="44" height="38"/><line class="aaben" x1="30" y1="54" x2="74" y2="54"/><line class="aaben" x1="30" y1="16" x2="30" y2="54"/><line class="aaben" x1="74" y1="16" x2="74" y2="54"/><rect class="nabo" x="30" y="8" width="44" height="6"/></svg>',
    sider4: '<svg viewBox="0 0 100 70"><rect class="hal" x="6" y="6" width="88" height="58"/><rect class="stand" x="30" y="18" width="40" height="34"/><line class="aaben" x1="30" y1="52" x2="70" y2="52"/><line class="aaben" x1="30" y1="18" x2="70" y2="18"/><line class="aaben" x1="30" y1="18" x2="30" y2="52"/><line class="aaben" x1="70" y1="18" x2="70" y2="52"/></svg>',

    print:  '<svg viewBox="0 0 100 70"><rect class="stand" x="18" y="12" width="64" height="40"/><line class="nabo" x1="50" y1="12" x2="50" y2="52"/><line class="aaben" x1="28" y1="26" x2="42" y2="26"/><line class="aaben" x1="28" y1="34" x2="38" y2="34"/><line class="nabo" x1="18" y1="58" x2="82" y2="58"/></svg>',
    pixlip: '<svg viewBox="0 0 100 70"><rect class="glo" x="18" y="12" width="64" height="40"/><rect class="stand" x="18" y="12" width="64" height="40"/><line class="aaben" x1="28" y1="24" x2="72" y2="24"/><line class="aaben" x1="28" y1="34" x2="60" y2="34"/><line class="nabo" x1="18" y1="58" x2="82" y2="58"/></svg>',

    disk:     '<svg viewBox="0 0 100 70"><path class="stand" d="M22 52 L22 32 Q22 26 30 26 L70 26 Q78 26 78 32 L78 52 Z"/><line class="aaben" x1="18" y1="52" x2="82" y2="52"/></svg>',
    bord:     '<svg viewBox="0 0 100 70"><ellipse class="stand" cx="50" cy="24" rx="26" ry="7"/><line class="aaben" x1="50" y1="26" x2="50" y2="50"/><line class="aaben" x1="38" y1="54" x2="62" y2="54"/></svg>',
    stol:     '<svg viewBox="0 0 100 70"><path class="stand" d="M36 16 L64 16 L60 40 L40 40 Z"/><line class="aaben" x1="40" y1="40" x2="38" y2="56"/><line class="aaben" x1="60" y1="40" x2="62" y2="56"/></svg>',
    lounge:   '<svg viewBox="0 0 100 70"><rect class="stand" x="22" y="26" width="56" height="20" rx="4"/><rect class="nabo" x="22" y="16" width="56" height="12" rx="4"/><line class="aaben" x1="28" y1="46" x2="28" y2="54"/><line class="aaben" x1="72" y1="46" x2="72" y2="54"/></svg>',
    vitrine:  '<svg viewBox="0 0 100 70"><rect class="stand" x="34" y="10" width="32" height="50"/><line class="nabo" x1="34" y1="26" x2="66" y2="26"/><line class="nabo" x1="34" y1="42" x2="66" y2="42"/><line class="aaben" x1="38" y1="6" x2="62" y2="6"/></svg>',
    reol:     '<svg viewBox="0 0 100 70"><rect class="stand" x="26" y="12" width="48" height="46"/><line class="nabo" x1="26" y1="27" x2="74" y2="27"/><line class="nabo" x1="26" y1="42" x2="74" y2="42"/></svg>',
    brochure: '<svg viewBox="0 0 100 70"><path class="stand" d="M34 12 L66 12 L66 56 L34 56 Z"/><line class="aaben" x1="34" y1="24" x2="66" y2="24"/><line class="aaben" x1="34" y1="36" x2="66" y2="36"/></svg>',
    knage:    '<svg viewBox="0 0 100 70"><line class="aaben" x1="50" y1="12" x2="50" y2="52"/><line class="aaben" x1="30" y1="20" x2="70" y2="20"/><path class="stand" d="M40 20 L40 30 M60 20 L60 30"/><line class="nabo" x1="38" y1="56" x2="62" y2="56"/></svg>',
    affald:   '<svg viewBox="0 0 100 70"><path class="stand" d="M34 20 L66 20 L62 56 L38 56 Z"/><line class="aaben" x1="30" y1="16" x2="70" y2="16"/></svg>',
    skaerm:   '<svg viewBox="0 0 100 70"><rect class="stand" x="18" y="14" width="64" height="36" rx="2"/><line class="aaben" x1="50" y1="50" x2="50" y2="58"/><line class="aaben" x1="36" y1="58" x2="64" y2="58"/></svg>',
    teknik:   '<svg viewBox="0 0 100 70"><rect class="stand" x="26" y="22" width="48" height="28" rx="3"/><circle class="aaben" cx="38" cy="36" r="4"/><line class="nabo" x1="50" y1="30" x2="66" y2="30"/><line class="nabo" x1="50" y1="42" x2="66" y2="42"/></svg>',
    led:      '<svg viewBox="0 0 100 70"><rect class="stand" x="22" y="14" width="26" height="20"/><rect class="stand" x="52" y="14" width="26" height="20"/><rect class="stand" x="22" y="38" width="26" height="20"/><rect class="glo" x="52" y="38" width="26" height="20"/><rect class="stand" x="52" y="38" width="26" height="20"/></svg>',
    kaffe:    '<svg viewBox="0 0 100 70"><path class="stand" d="M32 24 L68 24 L64 50 L36 50 Z"/><path class="aaben" d="M68 28 Q80 30 76 40 Q72 44 66 42"/><line class="nabo" x1="28" y1="56" x2="72" y2="56"/></svg>',
    koel:     '<svg viewBox="0 0 100 70"><rect class="stand" x="30" y="10" width="40" height="50" rx="3"/><line class="nabo" x1="30" y1="28" x2="70" y2="28"/><line class="aaben" x1="62" y1="18" x2="62" y2="24"/><line class="aaben" x1="62" y1="34" x2="62" y2="40"/></svg>',
    el:       '<svg viewBox="0 0 100 70"><rect class="stand" x="28" y="14" width="44" height="42" rx="3"/><path class="aaben" d="M52 22 L42 38 L50 38 L46 50"/></svg>'
  }
};
