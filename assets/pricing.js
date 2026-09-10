/* =====================================================================
   PRISKONFIGURATION — Wieben Design prisberegner (prototype)
   ---------------------------------------------------------------------
   ALLE TAL HERUNDER ER BRANCHEESTIMATER OG PLACEHOLDERE.
   De er sat ud fra offentligt tilgaengelige markedspriser og skal
   erstattes med Wieben Designs egne kalkulationstal foer lancering.

   Alle priser er i DKK ekskl. moms.
   Alle priser angives som et interval: [minimum, maksimum].
   Dette er den ENESTE fil, der skal rettes for at aendre priser.
   ===================================================================== */

window.WD_PRIS = {

  meta: {
    valuta: 'DKK',
    enhed: 'ekskl. moms',
    opdateret: '2026-09-10',
    status: 'BRANCHEESTIMAT — skal erstattes med Wieben Designs egne tal',
    /* Prisintervaller afrundes til naermeste X kr. i visningen */
    afrunding: 500
  },

  /* -------------------------------------------------------------------
     1. GRUNDPRIS PR. STANDTYPE
     perM2: [min, max] kr. pr. m2 for selve standen (konstruktion + vaegge)
     gulvpris: minimumsbeloeb — en lille stand kan ikke bygges billigere
     maxM2:    oevre graense for hvornaar standtypen giver mening
     ------------------------------------------------------------------- */
  standtyper: {
    portable: {
      perM2:    [1650, 2200],
      gulvpris: [18000, 26000],
      maxM2:    12
    },
    system: {
      perM2:    [3500, 4400],
      gulvpris: [43000, 55000],
      maxM2:    400
    },
    specialbyg: {
      perM2:    [6000, 7700],
      gulvpris: [92000, 118000],
      maxM2:    2000
    }
  },

  /* -------------------------------------------------------------------
     2. FAKTORER
     Aabne sider koster mere: flere synlige flader, mere grafik, mere
     konstruktion. Ambitionsniveau skalerer materialevalg og finish.
     ------------------------------------------------------------------- */
  aabenhed: {
    raekke:  1.00,   /* 1 aaben side  */
    hjoerne: 1.07,   /* 2 aabne sider */
    gavl:    1.14,   /* 3 aabne sider */
    oe:      1.22    /* 4 aabne sider */
  },

  ambition: {
    basis:    0.85,
    plus:     1.00,
    signatur: 1.30
  },

  /* -------------------------------------------------------------------
     3. TILVALG
     type 'fast'  -> pris er et samlet beloeb
     type 'perM2' -> pris ganges med standens areal
     minM2        -> tilvalget vises foerst fra denne stoerrelse
     ------------------------------------------------------------------- */
  tilvalg: {
    moederum:      { type: 'fast',  pris: [16500, 22000], minM2: 15 },
    bardisk:       { type: 'fast',  pris: [10500, 14500] },
    lager:         { type: 'fast',  pris: [7500, 10500] },
    produktdisplay:{ type: 'fast',  pris: [7000, 11500] },
    storskaerm:    { type: 'fast',  pris: [8500, 12500] },
    lysplan:       { type: 'perM2', pris: [430, 600] },
    gulv:          { type: 'perM2', pris: [300, 480] },
    grafik:        { type: 'perM2', pris: [1050, 1550] },
    hems:          { type: 'fast',  pris: [78000, 118000], minM2: 36 },
    moebler:       { type: 'fast',  pris: [7500, 12500] },
    beplantning:   { type: 'fast',  pris: [2200, 3600] },
    servering:     { type: 'fast',  pris: [3800, 6200] }
  },

  /* -------------------------------------------------------------------
     4. YDELSER
     pct  -> procent af (grundpris + tilvalg)
     min  -> minimumsbeloeb uanset standens stoerrelse
     ------------------------------------------------------------------- */
  ydelser: {
    design:        { pct: [0.055, 0.075], min: [11000, 15500] },   /* koncept, 3D, tegninger  */
    projektledelse:{ pct: [0.065, 0.085], min: [8000, 11500] },   /* koordinering, messecenter */
    montage:       { pct: [0.105, 0.14], min: [10500, 15000] }    /* opbygning og nedtagning */
  },

  /* Transport tur/retur inkl. haandtering */
  transport: {
    dk:         [7000, 10500],
    norden:     [14500, 21000],
    eu:         [19500, 28000],
    oversoeisk: [56000, 82000]
  },

  /* Opbevaring mellem messer — pr. paabegyndt aar */
  opbevaring: {
    system:     [5000, 7500],
    specialbyg: [8500, 12500],
    portable:   [0, 0]
  },

  /* -------------------------------------------------------------------
     5. OMKOSTNINGER MESSECENTERET OPKRAEVER (ikke Wieben)
     Standleje falder pr. m2 jo stoerre standen er.
     ------------------------------------------------------------------- */
  messecenter: {
    standlejeTrin: [
      { tilM2: 36,   perM2: [545, 665] },
      { tilM2: 100,  perM2: [455, 555] },
      { tilM2: 300,  perM2: [370, 450] },
      { tilM2: 600,  perM2: [305, 375] },
      { tilM2: 99999,perM2: [245, 305] }
    ],
    tilmeldingsgebyr: [4000, 6000],
    el:               [3000, 4600],
    vand:             [2100, 3100],
    /* Tillaeg pr. m2 for aabne sider ud over den foerste (hjoerne, gavl, oe) */
    aabenSideTillaegPct: { raekke: 0, hjoerne: 0.06, gavl: 0.12, oe: 0.18 }
  },

  /* -------------------------------------------------------------------
     6. OMKOSTNINGER KUNDEN SELV BAERER
     ------------------------------------------------------------------- */
  egne: {
    bemandingPrPersonPrDag: [3100, 4100],   /* intern kostpris          */
    rejseOphold: {
      dk:         [1100, 1900],
      norden:     [2700, 3800],
      eu:         [3200, 4700],
      oversoeisk: [8500, 12500]
    },
    markedsfoering: [9000, 19000]           /* invitationer, giveaways  */
  },

  /* -------------------------------------------------------------------
     7. GENBRUG OG TCO
     Hvad koster messe nr. 2, 3, 4 ... naar standen allerede findes?
     Andel af den oprindelige grundpris.
     ------------------------------------------------------------------- */
  genbrug: {
    specialbyg: { genbrugsandel: [0.80, 0.95], note: 'Bygges typisk forfra hver gang' },
    system:     { genbrugsandel: [0.18, 0.30], note: 'Rammer genbruges — ny grafik og opbygning' },
    portable:   { genbrugsandel: [0.06, 0.14], note: 'Genbruges naesten uaendret' }
  },

  /* Kasseret materiale pr. m2 pr. messe, kg — estimat */
  materialeforbrug: {
    specialbyg: 22,
    system:     2.5,
    portable:   0.8
  },

  /* -------------------------------------------------------------------
     8. ROI-NOEGLETAL — bruges til at saette forventninger, ikke til at love
     ------------------------------------------------------------------- */
  leads: {
    /* Kvalificerede leads pr. m2 pr. messedag, spaend */
    prM2PrDag: [0.40, 0.72],
    /* Bemandingsnorm: 1 person pr. X m2 */
    m2PrPerson: 5
  }
};
