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
    afrunding: 250
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
    ingen:  0,
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
    el: [
      { id: 'eltavle32',   leje: 650 },
      { id: 'eltavle16',   leje: 550 }
    ]
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
    m2PrMontoer:     25,
    minMontoerer:    2,

    /* Egen lastbil op til denne afstand; længere ude bruger vi speditør
       og fly til montørerne — AFLEDT arbejdsmodel */
    egenkoerselMaxKm: 450,
    fragtPrKm:        [12, 20],
    oversoeiskFragt:  [45000, 85000]
  },

  /* -------------------------------------------------------------------
     MESSECENTERETS EGNE PRISER — betales direkte til arrangøren.
     IKKE fra Wieben Designs prisgrundlag. Brancheestimat, som varierer
     fra messe til messe.
     ------------------------------------------------------------------- */
  messecenter: {
    standlejeTrin: [
      { tilM2: 36,    perM2: [545, 665] },
      { tilM2: 100,   perM2: [455, 555] },
      { tilM2: 300,   perM2: [370, 450] },
      { tilM2: 600,   perM2: [305, 375] },
      { tilM2: 99999, perM2: [245, 305] }
    ],
    tilmeldingsgebyr: [4000, 6000],
    forsyning:        [4500, 7500],   /* el, vand og internet hos arrangøren */
    aabenSideTillaegPct: { 1: 0, 2: 0.06, 3: 0.12, 4: 0.18 }
  },

  /* -------------------------------------------------------------------
     KUNDENS EGNE OMKOSTNINGER — REN ILLUSTRATION
     Wieben Design kender ikke kundens interne tal. Posterne står med for
     at kunden ikke glemmer dem, og kan rettes direkte i beregneren.
     ------------------------------------------------------------------- */
  egne: {
    dagsatsStandard:  3500,          /* kr. pr. person pr. dag, kan ændres    */
    rejseOphold: { dk: 1500, norden: 3200, eu: 3900, oversoeisk: 10500 },
    markedsfoering: [9000, 19000]
  },

  /* Nøgletal til forventningsafstemning */
  leads: { prM2PrDag: [0.40, 0.72], m2PrPerson: 5 }
};
