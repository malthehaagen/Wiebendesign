/* =====================================================================
   PRISKONFIGURATION — Wieben Design standberegner
   ---------------------------------------------------------------------
   KILDE: docs/prisgrundlag.md — Wieben Designs egne salgs- og lejepriser,
   kolonnen "Leje".
   Alle beløb er LEJEPRIS PR. MESSE i DKK ekskl. moms — altså det samme
   grundlag, som tilbuddene regner på.

   Enkelte satser er afledt frem for aflæst; de er markeret med AFLEDT
   og bør bekræftes af Wieben Design.
   ===================================================================== */

window.WD_PRIS = {

  meta: {
    valuta: 'DKK',
    enhed: 'ekskl. moms',
    grundlag: 'Lejepris pr. messe',
    kilde: 'docs/prisgrundlag.md',
    opdateret: '2026-09-10',
    afrunding: 250,

    /* Spændet på det viste totalbeløb. Enkeltposterne er faste lejepriser,
       men montagetimer, standens faktiske opbygning og kundens endelige valg
       flytter sig, indtil der ligger en godkendt tegning. Totalen vises derfor
       som midtpunktet inden for dette spænd. Nedad er der mere luft end
       opad: en stand kan sagtens blive enklere end her antaget. */
    spaendNed: 0.25,
    spaendOp:  0.20,

    /* Skrue på hele prisniveauet uden at røre de enkelte satser.
       1 = modellens egne tal. 0,85 = 15 % under. 1,1 = 10 % over.
       Brug den, mens I finder ud af, hvor beregneren skal lande —
       og husk, at en lavere værdi ikke gør standen billigere at bygge,
       kun billigere at love bort. */
    prisniveau: 1
  },

  /* -------------------------------------------------------------------
     PROJEKTSTYRING — tegning, møde, bestillinger
     ------------------------------------------------------------------- */
  projektstyring: [
    { tilM2: 20,    pris: 6000 },
    { tilM2: 50,    pris: 7000 },
    { tilM2: 80,    pris: 8500 },
    { tilM2: 110,   pris: 10000 },
    { tilM2: 99999, pris: 14000 }
  ],

  /* -------------------------------------------------------------------
     VÆGGE — b62 rammer, PVC-plader og print
     Priser pr. løbende meter væg i den valgte højde.
     ------------------------------------------------------------------- */
  vaeg: {
    hoejder: [
      { m: 2,   frame: 237, pvc: 130 },
      { m: 2.5, frame: 250, pvc: 156 },
      { m: 3,   frame: 301, pvc: 182 }
    ],
    /* Print på banner, kr. pr. m² — AFLEDT af bannerpriserne i arket
       (5.600 kr. for 12 m², 2.800 for 6 m², 1.400 for 3 m²) */
    printPrM2: 465,
    /* Pixlip backlit lysvæg: PX200-profil pr. lbm i 3 m + backlit-print
       (PIXLIP Wall profil PX200, 3000 mm = 766 kr.; banner AFLEDT) */
    pixlipPrLbm: 766,
    pixlipPrintPrM2: 520,
    /* Dør i væg: b62 Frame Door + PVC-sæt */
    doer: 881 + 156
  },

  /* Grafikdækning af vægarealet */
  grafikdaekning: { ingen: 0, delvis: 0.45, fuld: 1 },

  /* -------------------------------------------------------------------
     GULV — kr. pr. m² (prisgrundlaget, afsnittet "Gulvbelægning")
     ------------------------------------------------------------------- */
  gulv: {
    taeppe: 90 + 25,   /* Heuga 530XL + blødt undergulv */
    vinyl:  150,       /* Hvid vinyl, Armstrong        */
    trae:   250        /* Trægulv, naturtræ            */
  },
  haevetGulv: 95 + 75, /* Primo PX hævet gulv + spånpladegulv, pr. m²    */

  /* -------------------------------------------------------------------
     BELYSNING — kr. pr. spot og dækning (prisgrundlaget, "Belysning")
     ------------------------------------------------------------------- */
  belysning: {
    standard:    { prSpot: 75,  m2PrSpot: 5 },   /* Sam Light, b62 spot   */
    forstaerket: { prSpot: 173, m2PrSpot: 4 },   /* NOVI 70 spots         */
    pro:         { prSpot: 329, m2PrSpot: 3.5 }  /* ERON Pro 200W flood   */
  },

  /* -------------------------------------------------------------------
     RIG — truss og hængende frise, pr. løbende meter — AFLEDT af
     truss-elementpriserne (TX Truss 25 cm, 2000 mm = 187 kr.)
     ------------------------------------------------------------------- */
  rig: { trussPrLbm: 130, frisehoejde: 1 },

  /* -------------------------------------------------------------------
     KATALOG — leje pr. messe, direkte fra prisgrundlaget
     ------------------------------------------------------------------- */
  katalog: {
    diske: [
      { id: 'expo_bar',    leje: 1175 },
      { id: 'expo_skab',   leje: 975 },
      { id: 'expo_hylde',  leje: 725 },
      { id: 'izi_disk',    leje: 1500 },
      { id: 'ubord',       leje: 875 },
      { id: 'vitrine',     leje: 2500 },
      { id: 'abc_reol',    leje: 450 },
      { id: 'depot_bord',  leje: 200 }
    ],
    moebler: [
      { id: 'staabord',    leje: 325 },
      { id: 'cafebord',    leje: 325 },
      { id: 'barstol',     leje: 175 },
      { id: 'skalstol',    leje: 150 },
      { id: 'stol_arm',    leje: 350 },
      { id: 'loungestol',  leje: 450 },
      { id: 'loungebord',  leje: 450 },
      { id: 'sofa',        leje: 950 },
      { id: 'brochure',    leje: 475 },
      { id: 'stumtjener',  leje: 175 },
      { id: 'affald',      leje: 99 }
    ],
    teknik: [
      { id: 'mon32',       leje: 950 },
      { id: 'mon43',       leje: 1500 },
      { id: 'mon55',       leje: 2750 },
      { id: 'mon65',       leje: 3500 },
      { id: 'mon75',       leje: 4500 },
      { id: 'stander',     leje: 750 },
      { id: 'afspiller',   leje: 950 },
      { id: 'ledskin',     leje: 600 },
      { id: 'novastar',    leje: 1200 }
    ],
    kaffe: [
      { id: 'nespresso_s', leje: 1000 },
      { id: 'nespresso_l', leje: 500 },
      { id: 'bonamat',     leje: 350 },
      { id: 'vandkoger',   leje: 150 },
      { id: 'koeleskab_h', leje: 795 },
      { id: 'koeleskab_l', leje: 450 },
      { id: 'vask',        leje: 450 },
      { id: 'papkrus',     leje: 45 }
    ],
  },

  /* -------------------------------------------------------------------
     OMRÅDER — de zoner kunden vælger i stedet for enkeltvarer.
     Hvert område har en eller flere størrelser. Hver størrelse er en
     konkret pakke af varer fra kataloget herover, plus evt. indervægge
     og dør, og et m2-tal for, hvor meget den fylder på standen.

     prM2 bruges til områder, der bygges frem for at møbleres — så er
     prisen kvadratmeter gange denne sats.
     minStandM2 skjuler et område, indtil standen er stor nok til det.
     ------------------------------------------------------------------- */
  omraader: {
    /* --- Tag imod --- */
    reception: { gruppe: 'samtale', varianter: [
      { id: 'lille',  m2: 2, dele: { expo_hylde: 1 } },
      { id: 'mellem', m2: 3, dele: { izi_disk: 1, brochure: 1 } },
      { id: 'stor',   m2: 5, dele: { izi_disk: 1, expo_skab: 1, brochure: 2 } }
    ]},
    /* --- Tal sammen --- */
    staabord: { gruppe: 'samtale', varianter: [
      { id: 'lille',  m2: 3, dele: { staabord: 1, barstol: 2 } },
      { id: 'mellem', m2: 5, dele: { staabord: 2, barstol: 4 } },
      { id: 'stor',   m2: 8, dele: { staabord: 3, barstol: 6 } }
    ]},
    moedeAabent: { gruppe: 'samtale', varianter: [
      { id: 'lille',  m2: 5, dele: { cafebord: 1, stol_arm: 4 } },
      { id: 'stor',   m2: 8, dele: { ubord: 1, stol_arm: 6 } }
    ]},
    moede: { gruppe: 'samtale', varianter: [
      { id: 'lille',  m2: 6,  vaegLbm: 5, doere: 1, dele: { cafebord: 1, stol_arm: 4 } },
      { id: 'stor',   m2: 10, vaegLbm: 8, doere: 1, dele: { ubord: 1, stol_arm: 6, mon43: 1 } }
    ]},
    lounge: { gruppe: 'samtale', varianter: [
      { id: 'lille',  m2: 4,  dele: { loungestol: 2, loungebord: 1 } },
      { id: 'mellem', m2: 6,  dele: { sofa: 1, loungestol: 2, loungebord: 1 } },
      { id: 'stor',   m2: 10, dele: { sofa: 2, loungestol: 4, loungebord: 2 } }
    ]},

    /* --- Vis frem --- */
    platform: { gruppe: 'vis', varianter: [
      { id: 'lille',  m2: 4,  prM2: 255 },
      { id: 'mellem', m2: 9,  prM2: 255 },
      { id: 'stor',   m2: 16, prM2: 255 }
    ]},
    montre: { gruppe: 'vis', varianter: [
      { id: 'lille',  m2: 2, dele: { vitrine: 1 } },
      { id: 'stor',   m2: 4, dele: { vitrine: 2 } }
    ]},
    reol: { gruppe: 'vis', varianter: [
      { id: 'lille',  m2: 2, dele: { abc_reol: 2 } },
      { id: 'stor',   m2: 4, dele: { abc_reol: 4 } }
    ]},
    media: { gruppe: 'vis', varianter: [
      { id: 'lille',  m2: 2, dele: { mon43: 1, afspiller: 1 } },
      { id: 'mellem', m2: 3, dele: { mon55: 1, afspiller: 1 } },
      { id: 'stor',   m2: 4, dele: { mon75: 1, afspiller: 1, stander: 1 } }
    ]},
    scene: { gruppe: 'vis', minStandM2: 60, varianter: [
      { id: 'fast',   m2: 12, dele: { mon65: 1, afspiller: 1, skalstol: 10 } }
    ]},

    /* --- Servering --- */
    bar: { gruppe: 'samtale', varianter: [
      { id: 'lille',  m2: 3, dele: { expo_bar: 1, nespresso_l: 1, papkrus: 1 } },
      { id: 'mellem', m2: 5, dele: { expo_bar: 1, barstol: 2, nespresso_l: 1, koeleskab_l: 1, papkrus: 1 } },
      { id: 'stor',   m2: 8, dele: { expo_bar: 1, expo_skab: 1, barstol: 4, nespresso_s: 1, koeleskab_h: 1, vask: 1, papkrus: 2 } }
    ]},

    /* --- Bagved --- */
    depot: { gruppe: 'bagved', varianter: [
      { id: 'lille',  m2: 3, vaegLbm: 4, doere: 1, dele: { abc_reol: 1, depot_bord: 1, affald: 1 } },
      { id: 'mellem', m2: 4, vaegLbm: 5, doere: 1, dele: { abc_reol: 1, depot_bord: 1, affald: 1, stumtjener: 2 } },
      { id: 'stor',   m2: 6, vaegLbm: 7, doere: 1, dele: { abc_reol: 2, depot_bord: 1, affald: 1, stumtjener: 2, koeleskab_l: 1 } }
    ]}
  },

  /* Områdernes indervægge bygges i denne højde */
  omraadeVaeghoejde: 2.5,

  /* -------------------------------------------------------------------
     TILKØB — rene ja/nej-spørgsmål
     ------------------------------------------------------------------- */
  tilkoeb: {
    /* Hængende skilt over standen: truss hele vejen rundt + frise med tryk */
    skilt:       { type: 'omkreds' },
    /* Projektører hængt i riggen, ca. én pr. 6 m² */
    rigLys:      { type: 'perM2', prSpot: 329, m2PrSpot: 6 },
    beplantning: { type: 'fast', pris: 2800 }
  },

  /* LED-vægge i faste størrelser. Fliser er 50 × 50 cm, og styringen
     indgår altid — der kan ikke lejes en LED-væg uden. */
  ledStoerrelser: [
    { id: 's',  navn: '1,5 × 1 meter', m2: 1.5, fliser: 6 },
    { id: 'm',  navn: '2 × 1,5 meter', m2: 3,   fliser: 12 },
    { id: 'l',  navn: '3 × 2 meter',   m2: 6,   fliser: 24 },
    { id: 'xl', navn: '4 × 3 meter',   m2: 12,  fliser: 48 }
  ],

  /* -------------------------------------------------------------------
     EL — obligatorisk, lægges automatisk i prisen. Kunden vælger den ikke
     til eller fra; vi vælger tavlen ud fra, hvad der skal have strøm.
     ------------------------------------------------------------------- */
  elTavle: {
    lille: { leje: 550, navn: 'El-tavle, 16A med 6 udtag' },
    stor:  { leje: 650, navn: 'El-tavle, 32A med 8 udtag' },
    /* Varer der udløser den store tavle */
    /* Områder der trækker nok strøm til den store tavle */
    stortForbrug: ['bar', 'media', 'scene', 'montre']
  },

  /* -------------------------------------------------------------------
     OPSÆTNING, NEDTAGNING OG TRANSPORT
     Satser fra prisgrundlagets afsnit "Opsætning" og "Nedtagning".
     Timetallene er AFLEDTE normtal og den største usikkerhed i estimatet.
     ------------------------------------------------------------------- */
  montage: {
    timepris:        652,          /* Arbejds-, køre-, rejse- og værkstedstime */
    overnatning:     900,          /* pr. mand pr. nat                          */
    fortaering:      625,          /* pr. mand pr. dag                          */
    forsikring:      1750,         /* forsikring af transporten                 */
    lastbilPrKm:     6.75,
    kmPengePrKm:     4,            /* montørløn, km-penge                       */
    broafgift:       410,          /* pr. vej, Sjælland                         */
    flybillet:       3900,
    kmPrTime:        70,

    /* AFLEDT: mandtimer til opbygning pr. m² — intervallet er beregningens
       primære usikkerhed */
    mandtimerPrM2:   [0.45, 0.65],
    minMandtimer:    8,
    nedtagningsandel: 0.4,         /* nedtagning som andel af opbygning         */
    vaerkstedPrM2:   0.15,         /* pakning på værkstedet                     */

    /* Ind- og udbæring i hallen: kasser fra bilen til standen og retur.
       Lå før gemt i opbygningstimerne — nu en post for sig. AFLEDT. */
    indUdbaeringPrM2: [0.06, 0.10],

    /* Tomgods: de tomme kasser skal væk fra hallen under messen.
       Kører vi selv, tager vi dem med hjem i bilen, og det koster ikke
       ekstra. Sender vi med speditør, bliver de stående og opbevaret,
       og det er en regning. Pris pr. lastbillæs — AFLEDT, bør bekræftes. */
    tomgodsPrLaes:   [900, 1800],
    m2PrMontoer:     25,
    minMontoerer:    2,

    /* Wieben Design kører selv i hele Europa, når det kan lade sig gøre.
       Det er standens STØRRELSE, ikke afstanden, der afgør, hvornår der
       skal speditør på — AFLEDT, bør bekræftes. */
    egenkoerselMaxM2: 60,
    /* Under denne afstand kører vi altid selv — det giver ikke mening at
       flyve til Herning eller København */
    altidEgenKoerselKm: 600,
    /* Turen er derhen og hjem. Spændet er, om der kører én eller to
       montører med — det skifter fra opgave til opgave. */
    ture:             2,
    koeretidMontoerer: [1, 2],
    /* Speditør ved store stande: pris pr. lastbillæs, pr. km tur/retur */
    m2PrLaes:         60,
    fragtPrKm:        [22, 34],

    /* Uden for Europa kører vi ikke selv. Fragten aftales konkret med
       speditøren — tallene her er et udgangspunkt, ikke et tilbud.
       Wieben Design har lager i USA, så nogle opgaver bygges af
       materiel, der allerede står derovre. AFLEDT, bør bekræftes. */
    oversoeiskFragtPrLaes: [55000, 110000],
    oversoeiskFlybillet:   9500,
    oversoeiskNaetter:     6,
    oversoeiskDage:        7
  },

  /* Nøgletal til forventningsafstemning */
  leads: { prM2PrDag: [0.40, 0.72] }
};
