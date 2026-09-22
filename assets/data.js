/* =====================================================================
   SPROGNEUTRALE DATA — illustrationer, steder og de betingelser, der
   afgør, hvornår et fagligt tip eller et tidslinjepunkt vises.
   ---------------------------------------------------------------------
   Her er intet at oversætte. Teksterne ligger i assets/indhold-<sprog>.js
   og kobles på via id.
   ===================================================================== */

window.WD_DATA = {

  /* Byer med omtrentlig køreafstand fra Støvring og broafgift.
     Bynavne oversættes ikke; landenavne står i sprogfilen. */
  lande: [
    {
      "id": "dk",
      "byer": [
        {
          "navn": "Aalborg",
          "km": 25,
          "bro": false
        },
        {
          "navn": "Viborg",
          "km": 60,
          "bro": false
        },
        {
          "navn": "Aarhus",
          "km": 105,
          "bro": false
        },
        {
          "navn": "Herning",
          "km": 130,
          "bro": false
        },
        {
          "navn": "Horsens",
          "km": 140,
          "bro": false
        },
        {
          "navn": "Vejle",
          "km": 165,
          "bro": false
        },
        {
          "navn": "Billund",
          "km": 165,
          "bro": false
        },
        {
          "navn": "Fredericia",
          "km": 185,
          "bro": false
        },
        {
          "navn": "Kolding",
          "km": 195,
          "bro": false
        },
        {
          "navn": "Esbjerg",
          "km": 215,
          "bro": false
        },
        {
          "navn": "Odense",
          "km": 250,
          "bro": false
        },
        {
          "navn": "Roskilde",
          "km": 380,
          "bro": true
        },
        {
          "navn": "Brøndby",
          "km": 395,
          "bro": true
        },
        {
          "navn": "København",
          "km": 400,
          "bro": true
        }
      ]
    },
    {
      "id": "de",
      "byer": [
        {
          "navn": "Hamborg",
          "km": 380,
          "bro": false
        },
        {
          "navn": "Oldenburg",
          "km": 480,
          "bro": false
        },
        {
          "navn": "Bremen",
          "km": 490,
          "bro": false
        },
        {
          "navn": "Hannover",
          "km": 620,
          "bro": false
        },
        {
          "navn": "Berlin",
          "km": 640,
          "bro": false
        },
        {
          "navn": "Dortmund",
          "km": 690,
          "bro": false
        },
        {
          "navn": "Essen",
          "km": 700,
          "bro": false
        },
        {
          "navn": "Düsseldorf",
          "km": 720,
          "bro": false
        },
        {
          "navn": "Köln",
          "km": 750,
          "bro": false
        },
        {
          "navn": "Leipzig",
          "km": 760,
          "bro": false
        },
        {
          "navn": "Frankfurt",
          "km": 900,
          "bro": false
        },
        {
          "navn": "Nürnberg",
          "km": 1000,
          "bro": false
        },
        {
          "navn": "Stuttgart",
          "km": 1050,
          "bro": false
        },
        {
          "navn": "München",
          "km": 1150,
          "bro": false
        }
      ]
    },
    {
      "id": "se",
      "byer": [
        {
          "navn": "Malmø",
          "km": 430,
          "bro": true
        },
        {
          "navn": "Göteborg",
          "km": 560,
          "bro": true
        },
        {
          "navn": "Jönköping",
          "km": 640,
          "bro": true
        },
        {
          "navn": "Stockholm",
          "km": 900,
          "bro": true
        }
      ]
    },
    {
      "id": "no",
      "byer": [
        {
          "navn": "Oslo",
          "km": 860,
          "bro": true
        },
        {
          "navn": "Lillestrøm",
          "km": 880,
          "bro": true
        },
        {
          "navn": "Stavanger",
          "km": 1050,
          "bro": true
        },
        {
          "navn": "Bergen",
          "km": 1200,
          "bro": true
        },
        {
          "navn": "Trondheim",
          "km": 1300,
          "bro": true
        }
      ]
    },
    {
      "id": "fi",
      "byer": [
        {
          "navn": "Helsinki",
          "km": 1500,
          "bro": true
        }
      ]
    },
    {
      "id": "nl",
      "byer": [
        {
          "navn": "Amsterdam",
          "km": 700,
          "bro": false
        },
        {
          "navn": "Utrecht",
          "km": 730,
          "bro": false
        },
        {
          "navn": "Rotterdam",
          "km": 780,
          "bro": false
        }
      ]
    },
    {
      "id": "be",
      "byer": [
        {
          "navn": "Kortrijk",
          "km": 880,
          "bro": false
        },
        {
          "navn": "Bruxelles",
          "km": 900,
          "bro": false
        }
      ]
    },
    {
      "id": "gb",
      "byer": [
        {
          "navn": "London",
          "km": 1100,
          "bro": false
        },
        {
          "navn": "Birmingham",
          "km": 1250,
          "bro": false
        },
        {
          "navn": "Manchester",
          "km": 1350,
          "bro": false
        }
      ]
    },
    {
      "id": "fr",
      "byer": [
        {
          "navn": "Paris",
          "km": 1200,
          "bro": false
        },
        {
          "navn": "Rennes",
          "km": 1400,
          "bro": false
        },
        {
          "navn": "Lyon",
          "km": 1550,
          "bro": false
        },
        {
          "navn": "Cannes",
          "km": 1850,
          "bro": false
        },
        {
          "navn": "Toulouse",
          "km": 1900,
          "bro": false
        }
      ]
    },
    {
      "id": "it",
      "byer": [
        {
          "navn": "Milano",
          "km": 1550,
          "bro": false
        },
        {
          "navn": "Verona",
          "km": 1650,
          "bro": false
        },
        {
          "navn": "Bologna",
          "km": 1750,
          "bro": false
        },
        {
          "navn": "Rimini",
          "km": 1850,
          "bro": false
        },
        {
          "navn": "Rom",
          "km": 2100,
          "bro": false
        }
      ]
    },
    {
      "id": "es",
      "byer": [
        {
          "navn": "Barcelona",
          "km": 2300,
          "bro": false
        },
        {
          "navn": "Valencia",
          "km": 2500,
          "bro": false
        },
        {
          "navn": "Madrid",
          "km": 2500,
          "bro": false
        }
      ]
    },
    {
      "id": "pl",
      "byer": [
        {
          "navn": "Poznań",
          "km": 800,
          "bro": false
        },
        {
          "navn": "Warszawa",
          "km": 1100,
          "bro": false
        },
        {
          "navn": "Kielce",
          "km": 1200,
          "bro": false
        }
      ]
    },
    {
      "id": "cz",
      "byer": [
        {
          "navn": "Praha",
          "km": 1000,
          "bro": false
        },
        {
          "navn": "Brno",
          "km": 1100,
          "bro": false
        }
      ]
    },
    {
      "id": "at",
      "byer": [
        {
          "navn": "Salzburg",
          "km": 1250,
          "bro": false
        },
        {
          "navn": "Wien",
          "km": 1300,
          "bro": false
        }
      ]
    },
    {
      "id": "ch",
      "byer": [
        {
          "navn": "Basel",
          "km": 1150,
          "bro": false
        },
        {
          "navn": "Zürich",
          "km": 1250,
          "bro": false
        },
        {
          "navn": "Genève",
          "km": 1450,
          "bro": false
        }
      ]
    },
    {
      "id": "us",
      "oversoeisk": true,
      "byer": [
        {
          "navn": "Chicago",
          "km": 0,
          "bro": false
        },
        {
          "navn": "Las Vegas",
          "km": 0,
          "bro": false
        },
        {
          "navn": "Orlando",
          "km": 0,
          "bro": false
        },
        {
          "navn": "Atlanta",
          "km": 0,
          "bro": false
        },
        {
          "navn": "New York",
          "km": 0,
          "bro": false
        }
      ]
    },
    {
      "id": "andet",
      "byer": []
    }
  ],

  /* Faglige tip: vægt og betingelse. Titel og tekst står i sprogfilen. */
  indsigter: [
    { id: "depot", vaegt: 9, naar: s => s.stand.m2 >= 15 && !s.omraader.depot },
    { id: "plads", vaegt: 10, naar: s => s.omraadeAreal > s.stand.m2 * 0.75 },
    { id: "aabneSider", vaegt: 8, naar: s => s.stand.aabneSider === 1 && s.stand.m2 >= 20 },
    { id: "treSekunder", vaegt: 10, naar: s => s.stand.grafik === 'ingen' },
    { id: "velkomst", vaegt: 8, naar: s => !s.omraader.reception && !s.omraader.staabord && s.stand.m2 >= 12 },
    { id: "lys", vaegt: 7, naar: s => s.stand.belysning === 'standard' },
    { id: "servering", vaegt: 7, naar: s => !s.omraader.bar && s.stand.m2 >= 15 },
    { id: "siddeplads", vaegt: 7, naar: s => s.profil.formaal === 'relationer' && !s.omraader.lounge && !s.omraader.moede && !s.omraader.moedeAabent },
    { id: "lancering", vaegt: 7, naar: s => s.profil.formaal === 'lancering' && !s.omraader.montre && !s.omraader.platform && !s.omraader.media },
    { id: "skilt", vaegt: 6, naar: s => s.stand.m2 >= 30 && !s.tilkoeb.skilt },
    { id: "pixlip", vaegt: 6, naar: s => s.profil.ambition === 'signatur' && s.stand.vaegtype === 'print' },
    { id: "sentIGang", vaegt: 11, naar: s => s.ugerTilMesse !== null && s.ugerTilMesse < 16 },
    { id: "ingenDato", vaegt: 5, naar: s => s.ugerTilMesse === null },
    { id: "opfoelgning", vaegt: 4, naar: () => true }
  ],

  /* Tidslinjen: hvor mange uger før messen, og hvem der har opgaven.
     hvem: os = Wieben Design, jer = kunden, sammen = begge. */
  tidslinje: [
    { id: "tl0", uger: 32, hvem: "jer" },
    { id: "tl1", uger: 26, hvem: "sammen" },
    { id: "tl2", uger: 20, hvem: "sammen" },
    { id: "tl3", uger: 14, hvem: "sammen" },
    { id: "tl4", uger: 10, hvem: "os" },
    { id: "tl5", uger: 6, hvem: "sammen" },
    { id: "tl6", uger: 4, hvem: "os" },
    { id: "tl7", uger: 3, hvem: "jer" },
    { id: "tl8", uger: 2, hvem: "jer" },
    { id: "tl9", uger: 1, hvem: "os" },
    { id: "tl10", uger: 0, hvem: "os" },
    { id: "tl11", uger: -1, hvem: "os" },
    { id: "tl12", uger: -1, hvem: "jer" }
  ],

  /* Illustrationer. Placeholdere — se README om rigtige fotos. */
  svg: {
    sider1: "<svg viewBox=\"0 0 100 70\"><rect class=\"hal\" x=\"6\" y=\"6\" width=\"88\" height=\"58\"/><rect class=\"stand\" x=\"28\" y=\"16\" width=\"44\" height=\"38\"/><line class=\"aaben\" x1=\"28\" y1=\"54\" x2=\"72\" y2=\"54\"/><rect class=\"nabo\" x=\"10\" y=\"16\" width=\"16\" height=\"38\"/><rect class=\"nabo\" x=\"74\" y=\"16\" width=\"16\" height=\"38\"/></svg>",
    sider2: "<svg viewBox=\"0 0 100 70\"><rect class=\"hal\" x=\"6\" y=\"6\" width=\"88\" height=\"58\"/><rect class=\"stand\" x=\"46\" y=\"16\" width=\"44\" height=\"38\"/><line class=\"aaben\" x1=\"46\" y1=\"54\" x2=\"90\" y2=\"54\"/><line class=\"aaben\" x1=\"46\" y1=\"16\" x2=\"46\" y2=\"54\"/><rect class=\"nabo\" x=\"10\" y=\"16\" width=\"28\" height=\"38\"/></svg>",
    sider3: "<svg viewBox=\"0 0 100 70\"><rect class=\"hal\" x=\"6\" y=\"6\" width=\"88\" height=\"58\"/><rect class=\"stand\" x=\"30\" y=\"16\" width=\"44\" height=\"38\"/><line class=\"aaben\" x1=\"30\" y1=\"54\" x2=\"74\" y2=\"54\"/><line class=\"aaben\" x1=\"30\" y1=\"16\" x2=\"30\" y2=\"54\"/><line class=\"aaben\" x1=\"74\" y1=\"16\" x2=\"74\" y2=\"54\"/><rect class=\"nabo\" x=\"30\" y=\"8\" width=\"44\" height=\"6\"/></svg>",
    sider4: "<svg viewBox=\"0 0 100 70\"><rect class=\"hal\" x=\"6\" y=\"6\" width=\"88\" height=\"58\"/><rect class=\"stand\" x=\"30\" y=\"18\" width=\"40\" height=\"34\"/><line class=\"aaben\" x1=\"30\" y1=\"52\" x2=\"70\" y2=\"52\"/><line class=\"aaben\" x1=\"30\" y1=\"18\" x2=\"70\" y2=\"18\"/><line class=\"aaben\" x1=\"30\" y1=\"18\" x2=\"30\" y2=\"52\"/><line class=\"aaben\" x1=\"70\" y1=\"18\" x2=\"70\" y2=\"52\"/></svg>",
    print: "<svg viewBox=\"0 0 100 70\"><rect class=\"stand\" x=\"18\" y=\"12\" width=\"64\" height=\"40\"/><line class=\"nabo\" x1=\"50\" y1=\"12\" x2=\"50\" y2=\"52\"/><line class=\"aaben\" x1=\"28\" y1=\"26\" x2=\"42\" y2=\"26\"/><line class=\"aaben\" x1=\"28\" y1=\"34\" x2=\"38\" y2=\"34\"/><line class=\"nabo\" x1=\"18\" y1=\"58\" x2=\"82\" y2=\"58\"/></svg>",
    pixlip: "<svg viewBox=\"0 0 100 70\"><rect class=\"glo\" x=\"18\" y=\"12\" width=\"64\" height=\"40\"/><rect class=\"stand\" x=\"18\" y=\"12\" width=\"64\" height=\"40\"/><line class=\"aaben\" x1=\"28\" y1=\"24\" x2=\"72\" y2=\"24\"/><line class=\"aaben\" x1=\"28\" y1=\"34\" x2=\"60\" y2=\"34\"/><line class=\"nabo\" x1=\"18\" y1=\"58\" x2=\"82\" y2=\"58\"/></svg>",
    disk: "<svg viewBox=\"0 0 100 70\"><path class=\"stand\" d=\"M22 52 L22 32 Q22 26 30 26 L70 26 Q78 26 78 32 L78 52 Z\"/><line class=\"aaben\" x1=\"18\" y1=\"52\" x2=\"82\" y2=\"52\"/></svg>",
    bord: "<svg viewBox=\"0 0 100 70\"><ellipse class=\"stand\" cx=\"50\" cy=\"24\" rx=\"26\" ry=\"7\"/><line class=\"aaben\" x1=\"50\" y1=\"26\" x2=\"50\" y2=\"50\"/><line class=\"aaben\" x1=\"38\" y1=\"54\" x2=\"62\" y2=\"54\"/></svg>",
    stol: "<svg viewBox=\"0 0 100 70\"><path class=\"stand\" d=\"M36 16 L64 16 L60 40 L40 40 Z\"/><line class=\"aaben\" x1=\"40\" y1=\"40\" x2=\"38\" y2=\"56\"/><line class=\"aaben\" x1=\"60\" y1=\"40\" x2=\"62\" y2=\"56\"/></svg>",
    lounge: "<svg viewBox=\"0 0 100 70\"><rect class=\"stand\" x=\"22\" y=\"26\" width=\"56\" height=\"20\" rx=\"4\"/><rect class=\"nabo\" x=\"22\" y=\"16\" width=\"56\" height=\"12\" rx=\"4\"/><line class=\"aaben\" x1=\"28\" y1=\"46\" x2=\"28\" y2=\"54\"/><line class=\"aaben\" x1=\"72\" y1=\"46\" x2=\"72\" y2=\"54\"/></svg>",
    vitrine: "<svg viewBox=\"0 0 100 70\"><rect class=\"stand\" x=\"34\" y=\"10\" width=\"32\" height=\"50\"/><line class=\"nabo\" x1=\"34\" y1=\"26\" x2=\"66\" y2=\"26\"/><line class=\"nabo\" x1=\"34\" y1=\"42\" x2=\"66\" y2=\"42\"/><line class=\"aaben\" x1=\"38\" y1=\"6\" x2=\"62\" y2=\"6\"/></svg>",
    reol: "<svg viewBox=\"0 0 100 70\"><rect class=\"stand\" x=\"26\" y=\"12\" width=\"48\" height=\"46\"/><line class=\"nabo\" x1=\"26\" y1=\"27\" x2=\"74\" y2=\"27\"/><line class=\"nabo\" x1=\"26\" y1=\"42\" x2=\"74\" y2=\"42\"/></svg>",
    brochure: "<svg viewBox=\"0 0 100 70\"><path class=\"stand\" d=\"M34 12 L66 12 L66 56 L34 56 Z\"/><line class=\"aaben\" x1=\"34\" y1=\"24\" x2=\"66\" y2=\"24\"/><line class=\"aaben\" x1=\"34\" y1=\"36\" x2=\"66\" y2=\"36\"/></svg>",
    knage: "<svg viewBox=\"0 0 100 70\"><line class=\"aaben\" x1=\"50\" y1=\"12\" x2=\"50\" y2=\"52\"/><line class=\"aaben\" x1=\"30\" y1=\"20\" x2=\"70\" y2=\"20\"/><path class=\"stand\" d=\"M40 20 L40 30 M60 20 L60 30\"/><line class=\"nabo\" x1=\"38\" y1=\"56\" x2=\"62\" y2=\"56\"/></svg>",
    affald: "<svg viewBox=\"0 0 100 70\"><path class=\"stand\" d=\"M34 20 L66 20 L62 56 L38 56 Z\"/><line class=\"aaben\" x1=\"30\" y1=\"16\" x2=\"70\" y2=\"16\"/></svg>",
    skaerm: "<svg viewBox=\"0 0 100 70\"><rect class=\"stand\" x=\"18\" y=\"14\" width=\"64\" height=\"36\" rx=\"2\"/><line class=\"aaben\" x1=\"50\" y1=\"50\" x2=\"50\" y2=\"58\"/><line class=\"aaben\" x1=\"36\" y1=\"58\" x2=\"64\" y2=\"58\"/></svg>",
    teknik: "<svg viewBox=\"0 0 100 70\"><rect class=\"stand\" x=\"26\" y=\"22\" width=\"48\" height=\"28\" rx=\"3\"/><circle class=\"aaben\" cx=\"38\" cy=\"36\" r=\"4\"/><line class=\"nabo\" x1=\"50\" y1=\"30\" x2=\"66\" y2=\"30\"/><line class=\"nabo\" x1=\"50\" y1=\"42\" x2=\"66\" y2=\"42\"/></svg>",
    led: "<svg viewBox=\"0 0 100 70\"><rect class=\"stand\" x=\"22\" y=\"14\" width=\"26\" height=\"20\"/><rect class=\"stand\" x=\"52\" y=\"14\" width=\"26\" height=\"20\"/><rect class=\"stand\" x=\"22\" y=\"38\" width=\"26\" height=\"20\"/><rect class=\"glo\" x=\"52\" y=\"38\" width=\"26\" height=\"20\"/><rect class=\"stand\" x=\"52\" y=\"38\" width=\"26\" height=\"20\"/></svg>",
    kaffe: "<svg viewBox=\"0 0 100 70\"><path class=\"stand\" d=\"M32 24 L68 24 L64 50 L36 50 Z\"/><path class=\"aaben\" d=\"M68 28 Q80 30 76 40 Q72 44 66 42\"/><line class=\"nabo\" x1=\"28\" y1=\"56\" x2=\"72\" y2=\"56\"/></svg>",
    koel: "<svg viewBox=\"0 0 100 70\"><rect class=\"stand\" x=\"30\" y=\"10\" width=\"40\" height=\"50\" rx=\"3\"/><line class=\"nabo\" x1=\"30\" y1=\"28\" x2=\"70\" y2=\"28\"/><line class=\"aaben\" x1=\"62\" y1=\"18\" x2=\"62\" y2=\"24\"/><line class=\"aaben\" x1=\"62\" y1=\"34\" x2=\"62\" y2=\"40\"/></svg>",
    podie: "<svg viewBox=\"0 0 100 70\"><rect class=\"stand\" x=\"20\" y=\"38\" width=\"60\" height=\"16\"/><rect class=\"nabo\" x=\"36\" y=\"18\" width=\"28\" height=\"20\"/><line class=\"aaben\" x1=\"14\" y1=\"54\" x2=\"86\" y2=\"54\"/></svg>",
    scene: "<svg viewBox=\"0 0 100 70\"><rect class=\"stand\" x=\"26\" y=\"10\" width=\"48\" height=\"24\" rx=\"2\"/><circle class=\"nabo\" cx=\"34\" cy=\"48\" r=\"5\"/><circle class=\"nabo\" cx=\"50\" cy=\"48\" r=\"5\"/><circle class=\"nabo\" cx=\"66\" cy=\"48\" r=\"5\"/><line class=\"aaben\" x1=\"22\" y1=\"60\" x2=\"78\" y2=\"60\"/></svg>",
    lys: "<svg viewBox=\"0 0 100 70\"><line class=\"aaben\" x1=\"16\" y1=\"16\" x2=\"84\" y2=\"16\"/><circle class=\"stand\" cx=\"32\" cy=\"22\" r=\"5\"/><circle class=\"stand\" cx=\"50\" cy=\"22\" r=\"5\"/><circle class=\"stand\" cx=\"68\" cy=\"22\" r=\"5\"/><path class=\"nabo\" d=\"M32 28 L22 56 L42 56 Z M50 28 L40 56 L60 56 Z M68 28 L58 56 L78 56 Z\"/></svg>",
    plante: "<svg viewBox=\"0 0 100 70\"><path class=\"stand\" d=\"M50 52 L50 26\"/><path class=\"aaben\" d=\"M50 32 Q34 24 36 40 Q46 42 50 32 Z M50 32 Q66 24 64 40 Q54 42 50 32 Z\"/><rect class=\"nabo\" x=\"42\" y=\"52\" width=\"16\" height=\"10\" rx=\"2\"/></svg>",
    rum: "<svg viewBox=\"0 0 100 70\"><path class=\"vaeg\" d=\"M40 60 L22 60 L22 10 L78 10 L78 60 L60 60\"/><path class=\"aaben\" d=\"M40 60 A20 20 0 0 0 60 40\"/><rect class=\"stand\" x=\"36\" y=\"17\" width=\"28\" height=\"13\" rx=\"2\"/></svg>",
    kasser: "<svg viewBox=\"0 0 100 70\"><rect class=\"nabo\" x=\"16\" y=\"10\" width=\"68\" height=\"50\"/><rect class=\"stand\" x=\"26\" y=\"34\" width=\"22\" height=\"22\"/><rect class=\"stand\" x=\"52\" y=\"34\" width=\"22\" height=\"22\"/><rect class=\"stand\" x=\"39\" y=\"14\" width=\"22\" height=\"18\"/><line class=\"aaben\" x1=\"26\" y1=\"45\" x2=\"48\" y2=\"45\"/><line class=\"aaben\" x1=\"52\" y1=\"45\" x2=\"74\" y2=\"45\"/></svg>",
    moedebord: "<svg viewBox=\"0 0 100 70\"><rect class=\"stand\" x=\"28\" y=\"26\" width=\"44\" height=\"18\" rx=\"2\"/><path class=\"aaben\" d=\"M34 20 L46 20 M34 20 L34 14 M46 20 L46 14 M54 20 L66 20 M54 20 L54 14 M66 20 L66 14 M34 50 L46 50 M34 50 L34 56 M46 50 L46 56 M54 50 L66 50 M54 50 L54 56 M66 50 L66 56\"/></svg>"
  }
};
