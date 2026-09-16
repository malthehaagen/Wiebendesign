/* =====================================================================
   INDHOLD — tekster, messer, faglige indsigter og illustrationer.
   Priser ligger IKKE her, men i assets/pricing.js.
   Nøgler her skal matche nøglerne i pricing.js.
   ===================================================================== */

window.WD_INDHOLD = {

  /* ---------------- Lande og byer ----------------
     Messebyerne Wieben Design realistisk kører til, udvidet efter
     messekalenderen. Rækkefølgen er efter afstand fra Støvring.
     km = omtrentlig køreafstand én vej, bro = broafgift over Storebælt
     eller Øresund. Tallene er cirkatal til et estimat, ikke ruteberegning.
     oversoeisk på landet betyder, at fragten aftales konkret.        */
  lande: [
    { id: 'dk', navn: 'Danmark', byer: [
      { navn: 'Aalborg',      km: 25,  bro: false },
      { navn: 'Viborg',       km: 60,  bro: false },
      { navn: 'Aarhus',       km: 105, bro: false },
      { navn: 'Herning',      km: 130, bro: false },
      { navn: 'Horsens',      km: 140, bro: false },
      { navn: 'Vejle',        km: 165, bro: false },
      { navn: 'Billund',      km: 165, bro: false },
      { navn: 'Fredericia',   km: 185, bro: false },
      { navn: 'Kolding',      km: 195, bro: false },
      { navn: 'Esbjerg',      km: 215, bro: false },
      { navn: 'Odense',       km: 250, bro: false },
      { navn: 'Roskilde',     km: 380, bro: true  },
      { navn: 'Brøndby',      km: 395, bro: true  },
      { navn: 'København',    km: 400, bro: true  }
    ]},
    { id: 'de', navn: 'Tyskland', byer: [
      { navn: 'Hamborg',      km: 380,  bro: false },
      { navn: 'Oldenburg',    km: 480,  bro: false },
      { navn: 'Bremen',       km: 490,  bro: false },
      { navn: 'Hannover',     km: 620,  bro: false },
      { navn: 'Berlin',       km: 640,  bro: false },
      { navn: 'Dortmund',     km: 690,  bro: false },
      { navn: 'Essen',        km: 700,  bro: false },
      { navn: 'Düsseldorf',   km: 720,  bro: false },
      { navn: 'Köln',         km: 750,  bro: false },
      { navn: 'Leipzig',      km: 760,  bro: false },
      { navn: 'Frankfurt',    km: 900,  bro: false },
      { navn: 'Nürnberg',     km: 1000, bro: false },
      { navn: 'Stuttgart',    km: 1050, bro: false },
      { navn: 'München',      km: 1150, bro: false }
    ]},
    { id: 'se', navn: 'Sverige', byer: [
      { navn: 'Malmø',        km: 430, bro: true },
      { navn: 'Göteborg',     km: 560, bro: true },
      { navn: 'Jönköping',    km: 640, bro: true },
      { navn: 'Stockholm',    km: 900, bro: true }
    ]},
    { id: 'no', navn: 'Norge', byer: [
      { navn: 'Oslo',         km: 860,  bro: true },
      { navn: 'Lillestrøm',   km: 880,  bro: true },
      { navn: 'Stavanger',    km: 1050, bro: true },
      { navn: 'Bergen',       km: 1200, bro: true },
      { navn: 'Trondheim',    km: 1300, bro: true }
    ]},
    { id: 'fi', navn: 'Finland', byer: [
      { navn: 'Helsinki',     km: 1500, bro: true }
    ]},
    { id: 'nl', navn: 'Nederlandene', byer: [
      { navn: 'Amsterdam',    km: 700, bro: false },
      { navn: 'Utrecht',      km: 730, bro: false },
      { navn: 'Rotterdam',    km: 780, bro: false }
    ]},
    { id: 'be', navn: 'Belgien', byer: [
      { navn: 'Kortrijk',     km: 880, bro: false },
      { navn: 'Bruxelles',    km: 900, bro: false }
    ]},
    { id: 'gb', navn: 'Storbritannien', byer: [
      { navn: 'London',       km: 1100, bro: false },
      { navn: 'Birmingham',   km: 1250, bro: false },
      { navn: 'Manchester',   km: 1350, bro: false }
    ]},
    { id: 'fr', navn: 'Frankrig', byer: [
      { navn: 'Paris',        km: 1200, bro: false },
      { navn: 'Rennes',       km: 1400, bro: false },
      { navn: 'Lyon',         km: 1550, bro: false },
      { navn: 'Cannes',       km: 1850, bro: false },
      { navn: 'Toulouse',     km: 1900, bro: false }
    ]},
    { id: 'it', navn: 'Italien', byer: [
      { navn: 'Milano',       km: 1550, bro: false },
      { navn: 'Verona',       km: 1650, bro: false },
      { navn: 'Bologna',      km: 1750, bro: false },
      { navn: 'Rimini',       km: 1850, bro: false },
      { navn: 'Rom',          km: 2100, bro: false }
    ]},
    { id: 'es', navn: 'Spanien', byer: [
      { navn: 'Barcelona',    km: 2300, bro: false },
      { navn: 'Valencia',     km: 2500, bro: false },
      { navn: 'Madrid',       km: 2500, bro: false }
    ]},
    { id: 'pl', navn: 'Polen', byer: [
      { navn: 'Poznań',       km: 800,  bro: false },
      { navn: 'Warszawa',     km: 1100, bro: false },
      { navn: 'Kielce',       km: 1200, bro: false }
    ]},
    { id: 'cz', navn: 'Tjekkiet', byer: [
      { navn: 'Praha',        km: 1000, bro: false },
      { navn: 'Brno',         km: 1100, bro: false }
    ]},
    { id: 'at', navn: 'Østrig', byer: [
      { navn: 'Salzburg',     km: 1250, bro: false },
      { navn: 'Wien',         km: 1300, bro: false }
    ]},
    { id: 'ch', navn: 'Schweiz', byer: [
      { navn: 'Basel',        km: 1150, bro: false },
      { navn: 'Zürich',       km: 1250, bro: false },
      { navn: 'Genève',       km: 1450, bro: false }
    ]},
    { id: 'us', navn: 'USA', oversoeisk: true, byer: [
      { navn: 'Chicago',      km: 0, bro: false },
      { navn: 'Las Vegas',    km: 0, bro: false },
      { navn: 'Orlando',      km: 0, bro: false },
      { navn: 'Atlanta',      km: 0, bro: false },
      { navn: 'New York',     km: 0, bro: false }
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
    pixlip: { titel: 'Lysvægge',           tekst: 'Væggene lyser indefra, så billederne står som på en skærm. Koster lidt mere pr. meter, og ingen anden væg trækker blikket på samme måde.', teknik: 'Pixlip backlit' }
  },
  grafikdaekning: {
    ingen:  { titel: 'Ingenting',              tekst: 'Rene hvide vægge uden tryk.' },
    delvis: { titel: 'De vigtigste flader',    tekst: 'Tryk der hvor folk kigger — cirka halvdelen af væggene.' },
    fuld:   { titel: 'Det hele',               tekst: 'Tryk på alle vægflader.' }
  },
  gulv: {
    taeppe: { titel: 'Tæppe',         tekst: 'Med blødt underlag. Det mest almindelige valg — farven aftaler vi med jer.' },
    vinyl:  { titel: 'Vinyl',         tekst: 'Glat gulv. Skarpt og lyst udtryk.' },
    trae:   { titel: 'Trægulv',       tekst: 'Naturtræ. Det varmeste udtryk — og det dyreste.' }
  },
  haevet: {
    nej: { titel: 'Gulvet i hallen',  tekst: 'Belægningen lægges direkte på hallens gulv. Kabler føres langs væggene.' },
    ja:  { titel: 'Hævet gulv',       tekst: 'Gulvet bygges op, så kabler og teknik ligger skjult under det. Standen får en tydelig kant mod gangen.' }
  },

  belysning: {
    standard:    { titel: 'Almindeligt',  tekst: 'Spots på væggene. Nok til at standen er ordentligt oplyst.' },
    forstaerket: { titel: 'Ekstra lys',   tekst: 'Flere og kraftigere spots. Mærkbart lysere end nabostandene.' },
    pro:         { titel: 'Kraftigt lys', tekst: 'Store projektører til høje vægge og store flader.' }
  },

  /* ---------------- Områder ----------------
     Grupperne følger gæstens vej ind på standen.                    */
  omraadeGrupper: [
    { id: 'samtale', titel: 'Hvor skal I tale med folk?',
      hjaelp: 'Det er her, et hej bliver til et lead. Jo længere gæsten bliver, jo mere når I at sige — og det afhænger af, om der er noget at stå ved, sætte sig i eller drikke.' },
    { id: 'vis', titel: 'Hvordan skal produkterne vises?',
      hjaelp: 'Vælg efter hvad I skal vise. Store ting skal løftes op, små ting skal bag glas, mange ting skal på hylder, og det der ikke kan stå på standen, skal på en skærm.' },
    { id: 'bagved', titel: 'Hvad skal gæsten ikke se?',
      hjaelp: 'Det oftest oversete valg. Uden et aflåst rum ender kasser, jakker og brochurer bag disken — og det er det første, gæsten lægger mærke til.' }
  ],

  omraader: {
    reception:   { titel: 'Velkomstdisk',        tekst: 'Et tydeligt sted at henvende sig. Uden den bliver standen et rum, folk kigger ind i frem for går ind i.', ikon: 'disk',
                   stoerrelser: { lille: 'Lille disk', mellem: 'Disk med brochurer', stor: 'Disk med aflåst skab' } },
    staabord:    { titel: 'Ståborde',            tekst: 'Til de korte samtaler. Folk der står, bliver i to minutter — folk der sætter sig, bliver i tyve.', ikon: 'bord',
                   stoerrelser: { lille: '1 bord, 2 stole', mellem: '2 borde, 4 stole', stor: '3 borde, 6 stole' } },
    moedeAabent: { titel: 'Åbent mødeområde',    tekst: 'Bord og stole midt på standen. Halvprivat — man kan sætte sig, uden at gæsten føler sig lukket inde.', ikon: 'bord',
                   stoerrelser: { lille: 'Bord til 4', stor: 'U-bord til 6' } },
    moede:       { titel: 'Lukket mødeområde',   tekst: 'Eget rum med vægge og dør. Til aftaler, der ikke skal høres af nabostanden.', ikon: 'vitrine',
                   stoerrelser: { lille: 'Rum til 4', stor: 'Rum til 6 med skærm' } },
    lounge:      { titel: 'Loungeområde',        tekst: 'Bløde møbler til de samtaler, der skal tage tid.', ikon: 'lounge',
                   stoerrelser: { lille: '2 lænestole', mellem: 'Sofa og 2 lænestole', stor: '2 sofaer og 4 lænestole' } },

    platform:    { titel: 'Produktplatform',     tekst: 'Til det store og tunge — maskiner, køretøjer, møbler. Et hævet podie løfter dem op i synsfeltet og markerer, at de er hovedsagen.', ikon: 'podie',
                   stoerrelser: { lille: '4 m²', mellem: '9 m²', stor: '16 m²' } },
    montre:      { titel: 'Glasmontre',          tekst: 'Til det lille og dyre. Aflåst montre med lys, hvor tingene kan ses tæt på uden at blive taget.', ikon: 'vitrine',
                   stoerrelser: { lille: '1 montre', stor: '2 montrer' } },
    reol:        { titel: 'Produktreol',         tekst: 'Til mange varer ad gangen. Når det er bredden i sortimentet, der er pointen, frem for ét produkt.', ikon: 'reol',
                   stoerrelser: { lille: '2 reoler', stor: '4 reoler' } },
    media:       { titel: 'Skærm og video',      tekst: 'Til det, der ikke kan stå på standen — anlæg, processer, referencer. Kører i sløjfe uden at nogen skal betjene det.', ikon: 'skaerm',
                   stoerrelser: { lille: '43 tommer', mellem: '55 tommer', stor: '75 tommer på stander' } },
    scene:       { titel: 'Præsentationsområde', tekst: 'Til oplæg på faste tidspunkter. Samler folk på klokkeslæt i stedet for at vente på, at de driver forbi.', ikon: 'scene',
                   stoerrelser: { fast: '' } },

    bar:         { titel: 'Bar og servering',    tekst: 'Kaffe holder folk stående. Fire minutter mere er forskellen på en hilsen og et lead.', ikon: 'kaffe',
                   stoerrelser: { lille: 'Kaffe ved disken', mellem: 'Bar med køleskab', stor: 'Fuld bar med vask' } },

    depot:       { titel: 'Depot',               tekst: 'Aflåst rum til kasser, jakker og brochurer. Regn med 15–20 % af standens areal.', ikon: 'reol',
                   stoerrelser: { lille: 'Kun opbevaring', mellem: 'Med garderobe', stor: 'Med garderobe og køleskab' } }
  },

  stoerrelsesnavne: { lille: 'Lille', mellem: 'Mellem', stor: 'Stor', fast: 'Standard' },

  /* ---------------- Ja/nej-tilkøb ---------------- */
  tilkoeb: {
    skilt:       { titel: 'Hængende skilt over standen', tekst: 'Jeres navn båret oppe i riggen, så standen kan ses fra den anden ende af hallen.', ikon: 'skaerm' },
    rigLys:      { titel: 'Lys fra riggen',              tekst: 'Projektører hængt over standen. Lyser hele gulvet op i stedet for kun væggene.', ikon: 'lys' },
    led:         { titel: 'LED-væg',                     tekst: 'En skærmvæg bygget af fliser. Lyser kraftigere end nogen printet flade og kan vise levende billeder.', ikon: 'led' },
    beplantning: { titel: 'Beplantning',                 tekst: 'Det billigste greb, der får en stand til at virke færdig.', ikon: 'plante' }
  },

  ledIntro: 'Vælg størrelsen. Styringen indgår altid — en LED-væg kan ikke lejes uden.',

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
      naar: s => s.stand.m2 >= 15 && !s.omraader.depot,
      titel: 'Hvor skal kasserne stå?',
      tekst: 'Afsæt 15–20 % af arealet til aflåst depot. Uden det ender emballage, jakker og brochurekasser bag disken — og det er det første, gæsten ser.' },

    { id: 'plads', vaegt: 10,
      naar: s => s.omraadeAreal > s.stand.m2 * 0.75,
      titel: 'Der bliver trangt',
      tekst: 'Jeres områder fylder mere end tre fjerdedele af standen. Gæsterne skal også kunne bevæge sig rundt — regn med at mindst en fjerdedel af arealet skal stå tomt, ellers føles standen lukket udefra.' },

    { id: 'aabneSider', vaegt: 8,
      naar: s => s.stand.aabneSider === 1 && s.stand.m2 >= 20,
      titel: 'Spørg efter en ekstra åben side',
      tekst: 'Med én åben side skal I bygge tre vægge — og gæsten kan kun komme ind ét sted. To åbne sider fanger trafik fra begge retninger og sparer jer en hel vægflade. Merprisen hos arrangøren er typisk 5–10 %.' },

    { id: 'treSekunder', vaegt: 10,
      naar: s => s.stand.grafik === 'ingen',
      titel: '3-sekundersreglen',
      tekst: 'En gæst går forbi jeres stand på tre sekunder. På den tid skal hun kunne se hvem I er, og hvilket problem I løser — på fem meters afstand. Rene vægge svarer til at møde op uden skilt.' },

    { id: 'velkomst', vaegt: 8,
      naar: s => !s.omraader.reception && !s.omraader.staabord && s.stand.m2 >= 12,
      titel: 'Der er ingen at tage imod ved',
      tekst: 'Gæsten skal kunne se, hvor hun henvender sig, allerede fra gangen. Uden en disk eller et ståbord forrest bliver standen et rum, folk kigger ind i frem for går ind i.' },

    { id: 'lys', vaegt: 7,
      naar: s => s.stand.belysning === 'standard',
      titel: 'Lys er den billigste opgradering',
      tekst: 'Messehaller er mørkere, end folk husker. Går I fra almindeligt til ekstra lys, koster det typisk et par tusind kroner for hele messen — og det løfter standen mere end noget andet beløb i samme størrelse.' },

    { id: 'servering', vaegt: 7,
      naar: s => !s.omraader.bar && s.stand.m2 >= 15,
      titel: 'Kaffe holder folk stående',
      tekst: 'Den simpleste måde at forlænge en samtale fra 40 sekunder til fire minutter. Fire minutter er forskellen på en hilsen og et lead.' },

    { id: 'siddeplads', vaegt: 7,
      naar: s => s.profil.formaal === 'relationer' && !s.omraader.lounge && !s.omraader.moede && !s.omraader.moedeAabent,
      titel: 'Møder kræver et sted at sidde',
      tekst: 'I vil pleje kunderelationer. Den samtale foregår ikke ved et ståbord to meter fra jeres konkurrent. Et loungeområde eller et lukket mødeområde er ikke luksus — det er formålet med at være der.' },

    { id: 'lancering', vaegt: 7,
      naar: s => s.profil.formaal === 'lancering' && !s.omraader.montre && !s.omraader.platform && !s.omraader.media,
      titel: 'Ét produkt, ét brændpunkt',
      tekst: 'Ved en lancering skal alt andet træde tilbage. Ét belyst produkt eller én stor skærm midt i standen slår ti produkter på hylder — hver gang.' },

    { id: 'skilt', vaegt: 6,
      naar: s => s.stand.m2 >= 30 && !s.tilkoeb.skilt,
      titel: 'Byg opad, ikke kun udad',
      tekst: 'Fra 30 m² bliver hængende branding afgørende. Det er det, der gør jer synlige fra den anden ende af hallen — tjek messearrangørens højdegrænse tidligt, den er ofte 3–6 meter.' },

    { id: 'pixlip', vaegt: 6,
      naar: s => s.profil.ambition === 'signatur' && s.stand.vaegtype === 'print',
      titel: 'Der findes et niveau over almindelige vægge',
      tekst: 'I har sat ambitionen til signatur. Lysvægge lyser indefra, så billederne står som på en skærm hele vejen rundt. Prøv at slå dem til og se, hvad forskellen koster — den er mindre, end de fleste tror.' },

    { id: 'opfoelgning', vaegt: 4,
      naar: () => true,
      titel: 'Messen vindes ugen efter',
      tekst: 'Hovedparten af messeleads lukkes efter messen — men kun hvis de bliver fulgt op hurtigt. Aftal opfølgningsprocessen, før I kører til messen, ikke efter.' }
  ],

  /* ---------------- Tidslinje (uger før messen) ----------------
     hvem: 'os' = Wieben Design klarer det, 'jer' = kunden, 'sammen' = begge.
     Al koordinering med messearrangøren ligger hos os.              */
  tidslinjeIntro: 'Vi står for al koordinering undervejs — kontakten til messearrangøren, bestillingerne, produktionen og opbygningen. Det, der står som jeres, er det, kun I kan svare på.',
  tidslinje: [
    { uger: 32, hvem: 'jer',    titel: 'Book plads og placering',      tekst: 'De gode hjørne- og ø-pladser bliver taget først. Sig til, så rådgiver vi om, hvilken placering der passer til det, I vil opnå.' },
    { uger: 20, hvem: 'sammen', titel: 'Koncept og designoplæg',       tekst: 'Vi tegner oplægget ud fra jeres formål og budskab. Her træffes de valg, der binder resten.' },
    { uger: 14, hvem: 'sammen', titel: 'Godkendelse af tegningen',     tekst: 'I godkender den endelige tegning. Derefter reserverer vi materiellet og sætter produktionen i gang.' },
    { uger: 10, hvem: 'os',     titel: 'El, vand og internet bestilt',  tekst: 'Vi bestiller forsyningerne hos messearrangøren og holder styr på deres frister.' },
    { uger: 6,  hvem: 'sammen', titel: 'Grafikken skal være klar',     tekst: 'I sender logo, billeder og tekst — vi producerer og monterer. Efter denne dato bliver ændringer dyre.' },
    { uger: 4,  hvem: 'os',     titel: 'Møbler og udstyr reserveret',  tekst: 'Vi reserverer alt inventar til levering direkte på standen.' },
    { uger: 3,  hvem: 'jer',    titel: 'Aftal hvordan I følger op',    tekst: 'Hvordan registrerer I et lead på standen, og hvem kontakter dem bagefter? Det afgør, hvad messen er værd.' },
    { uger: 2,  hvem: 'jer',    titel: 'Inviter jeres kunder',         tekst: 'De vigtigste møder bookes før messen. Standen er rammen, ikke rekrutteringen.' },
    { uger: 1,  hvem: 'os',     titel: 'Pakning på værkstedet',        tekst: 'Standen pakkes hos os i Støvring og køres afsted.' },
    { uger: 0,  hvem: 'os',     titel: 'Opbygning og messe',           tekst: 'Vi bygger typisk op 1–2 dage før åbning, er til rådighed under messen og tager ned umiddelbart efter lukning.' },
    { uger: -1, hvem: 'jer',    titel: 'Følg op på jeres leads',       tekst: 'Alle leads kontaktet inden for fem hverdage. Vi kører standen på lager imens.' }
  ],

  hvemLabels: { os: 'Vi klarer det', jer: 'Jeres del', sammen: 'Sammen' },

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
    podie:    '<svg viewBox="0 0 100 70"><rect class="stand" x="20" y="38" width="60" height="16"/><rect class="nabo" x="36" y="18" width="28" height="20"/><line class="aaben" x1="14" y1="54" x2="86" y2="54"/></svg>',
    scene:    '<svg viewBox="0 0 100 70"><rect class="stand" x="26" y="10" width="48" height="24" rx="2"/><circle class="nabo" cx="34" cy="48" r="5"/><circle class="nabo" cx="50" cy="48" r="5"/><circle class="nabo" cx="66" cy="48" r="5"/><line class="aaben" x1="22" y1="60" x2="78" y2="60"/></svg>',
    lys:      '<svg viewBox="0 0 100 70"><line class="aaben" x1="16" y1="16" x2="84" y2="16"/><circle class="stand" cx="32" cy="22" r="5"/><circle class="stand" cx="50" cy="22" r="5"/><circle class="stand" cx="68" cy="22" r="5"/><path class="nabo" d="M32 28 L22 56 L42 56 Z M50 28 L40 56 L60 56 Z M68 28 L58 56 L78 56 Z"/></svg>',
    plante:   '<svg viewBox="0 0 100 70"><path class="stand" d="M50 52 L50 26"/><path class="aaben" d="M50 32 Q34 24 36 40 Q46 42 50 32 Z M50 32 Q66 24 64 40 Q54 42 50 32 Z"/><rect class="nabo" x="42" y="52" width="16" height="10" rx="2"/></svg>',
    el:       '<svg viewBox="0 0 100 70"><rect class="stand" x="28" y="14" width="44" height="42" rx="3"/><path class="aaben" d="M52 22 L42 38 L50 38 L46 50"/></svg>'
  }
};
