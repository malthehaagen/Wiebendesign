/* =====================================================================
   INDHOLD — dansk. Alle tekster om standen, områderne, de faglige tip
   og tidslinjen.
   ---------------------------------------------------------------------
   Nøglerne skal matche pricing.js (priser) og data.js (illustrationer,
   steder og betingelser). En engelsk udgave er en kopi af denne fil med
   samme nøgler — se docs/tone-of-voice-en.md.
   ===================================================================== */

window.WD_TEKST = window.WD_TEKST || {};
window.WD_TEKST.da = window.WD_TEKST.da || {};
window.WD_TEKST.da.indhold = {

  /* Landenavne. Byerne og afstandene står i data.js. */
  landenavne: {
    "dk": "Danmark",
    "de": "Tyskland",
    "se": "Sverige",
    "no": "Norge",
    "fi": "Finland",
    "nl": "Nederlandene",
    "be": "Belgien",
    "gb": "Storbritannien",
    "fr": "Frankrig",
    "it": "Italien",
    "es": "Spanien",
    "pl": "Polen",
    "cz": "Tjekkiet",
    "at": "Østrig",
    "ch": "Schweiz",
    "us": "USA",
    "andet": "Et andet land"
  },
  andenBy: "En anden by",

  profilSpoergsmaal: [
    {
      "id": "formaal",
      "spoergsmaal": "Hvad skal messen først og fremmest give jer?",
      "hjaelp": "Formålet afgør, hvordan standen skal indrettes — ikke omvendt.",
      "valg": [
        {
          "id": "leads",
          "titel": "Kvalificerede leads",
          "tekst": "I skal hjem med konkrete emner i pipeline."
        },
        {
          "id": "brand",
          "titel": "Synlighed og brand",
          "tekst": "I skal ses, huskes og tages alvorligt i branchen."
        },
        {
          "id": "lancering",
          "titel": "Produktlancering",
          "tekst": "Ét produkt skal have hele opmærksomheden."
        },
        {
          "id": "relationer",
          "titel": "Pleje af eksisterende kunder",
          "tekst": "Møder, aftaler og fortrolige samtaler."
        }
      ]
    },
    {
      "id": "erfaring",
      "spoergsmaal": "Hvor godt kender I messeformatet?",
      "valg": [
        {
          "id": "foerste",
          "titel": "Det er vores første",
          "tekst": "Vi skal have hjælp til det hele."
        },
        {
          "id": "enkelte",
          "titel": "Vi har prøvet det",
          "tekst": "Et par messer, men ingen fast rutine."
        },
        {
          "id": "rutine",
          "titel": "Vi har fast rutine",
          "tekst": "Messer er en kernekanal for os."
        }
      ]
    },
    {
      "id": "ambition",
      "spoergsmaal": "Hvor højt skal ambitionsniveauet ligge?",
      "hjaelp": "Det påvirker grafik, lys og materialer — ikke om standen virker.",
      "valg": [
        {
          "id": "basis",
          "titel": "Basis",
          "tekst": "Ordentligt, rent og funktionelt. Pengene skal bruges rigtigt."
        },
        {
          "id": "plus",
          "titel": "Plus",
          "tekst": "Standen skal skille sig ud på gangen."
        },
        {
          "id": "signatur",
          "titel": "Signatur",
          "tekst": "Standen skal være det, folk taler om efter messen."
        }
      ]
    }
  ],

  aabneSider: {
    "1": {
      "titel": "1 åben side",
      "tekst": "Naboer på begge sider og bagvæg. Tre sider skal bygges."
    },
    "2": {
      "titel": "2 åbne sider",
      "tekst": "Typisk for enden af en række. To sider skal bygges."
    },
    "3": {
      "titel": "3 åbne sider",
      "tekst": "Kun én nabo. Én side skal bygges."
    },
    "4": {
      "titel": "4 åbne sider",
      "tekst": "Fritliggende i hallen. Ingen vægge mod naboer."
    }
  },

  vaegtyper: {
    "print": {
      "titel": "Almindelige vægge",
      "tekst": "Hvide vægge, hvor jeres billeder og budskaber printes direkte på. Det, de fleste stande er bygget af.",
      "teknik": "Autoriseret beMatrix-partner"
    },
    "pixlip": {
      "titel": "Lysvægge",
      "tekst": "Væggene lyser indefra, så billederne står som på en skærm. Koster lidt mere pr. meter, og ingen anden væg trækker blikket på samme måde.",
      "teknik": "Pixlip backlit"
    }
  },

  grafikdaekning: {
    "ingen": {
      "titel": "Ingenting",
      "tekst": "Rene hvide vægge uden tryk."
    },
    "delvis": {
      "titel": "De vigtigste",
      "tekst": "Tryk der hvor folk kigger — cirka halvdelen af væggene."
    },
    "fuld": {
      "titel": "Det hele",
      "tekst": "Tryk på alle vægflader."
    }
  },

  grafikarbejde: {
    "klar": {
      "titel": "Vi har tryklare filer",
      "tekst": "I leverer grafikken færdig i de rigtige mål. Vi kontrollerer filerne og tilpasser til fladerne."
    },
    "delvis": {
      "titel": "Vi har logo og billeder",
      "tekst": "I har materialet, men det skal sættes op. Vores grafikere tilpasser format, proportioner og opsætning til standens flader."
    },
    "alt": {
      "titel": "Vi skal have hjælp til det hele",
      "tekst": "Vi udvikler grafikken fra bunden ud fra jeres visuelle identitet — fra idé og skitse til tryklar fil."
    }
  },

  gulv: {
    "taeppe": {
      "titel": "Tæppe",
      "tekst": "Med blødt underlag. Det mest almindelige valg — farven aftaler vi med jer."
    },
    "vinyl": {
      "titel": "Vinyl",
      "tekst": "Glat gulv. Skarpt og lyst udtryk."
    },
    "trae": {
      "titel": "Trægulv",
      "tekst": "Naturtræ. Det varmeste udtryk — og det dyreste."
    }
  },

  haevet: {
    "nej": {
      "titel": "Gulvet i hallen",
      "tekst": "Belægningen lægges direkte på hallens gulv. Kabler føres langs væggene."
    },
    "ja": {
      "titel": "Hævet gulv",
      "tekst": "Gulvet bygges op, så kabler og teknik ligger skjult under det. Standen får en tydelig kant mod gangen."
    }
  },

  belysning: {
    "standard": {
      "titel": "Almindeligt",
      "tekst": "Spots på væggene. Nok til at standen er ordentligt oplyst."
    },
    "forstaerket": {
      "titel": "Ekstra lys",
      "tekst": "Flere og kraftigere spots. Mærkbart lysere end nabostandene."
    },
    "pro": {
      "titel": "Kraftigt lys",
      "tekst": "Store projektører til høje vægge og store flader."
    }
  },

  omraadeGrupper: [
    {
      "id": "samtale",
      "titel": "Hvor skal I tale med folk?",
      "hjaelp": "Det er her, et hej bliver til et lead. Jo længere gæsten bliver, jo mere når I at sige — og det afhænger af, om der er noget at stå ved, sætte sig i eller drikke."
    },
    {
      "id": "vis",
      "titel": "Hvordan skal produkterne vises?",
      "hjaelp": "Vælg efter hvad I skal vise. Store ting skal løftes op, små ting skal bag glas, mange ting skal på hylder, og det der ikke kan stå på standen, skal på en skærm."
    },
    {
      "id": "bagved",
      "titel": "Hvad skal gæsten ikke se?",
      "hjaelp": "Det oftest oversete valg. Uden et aflåst rum ender kasser, jakker og brochurer bag disken — og det er det første, gæsten lægger mærke til."
    }
  ],

  stoerrelsesnavne: {
    "lille": "Lille",
    "mellem": "Mellem",
    "stor": "Stor",
    "fast": "Standard"
  },

  tilkoeb: {
    "skilt": {
      "titel": "Hængende skilt over standen",
      "tekst": "Jeres navn båret oppe i riggen, så standen kan ses fra den anden ende af hallen.",
      "ikon": "skaerm"
    },
    "rigLys": {
      "titel": "Lys fra riggen",
      "tekst": "Projektører hængt over standen. Lyser hele gulvet op i stedet for kun væggene.",
      "ikon": "lys"
    },
    "led": {
      "titel": "LED-skærm",
      "tekst": "Vis produkterne i brug med film og demonstrationer. Skærmen bliver en del af standen og giver besøgende en anledning til at stoppe op.",
      "ikon": "led"
    },
    "beplantning": {
      "titel": "Beplantning",
      "tekst": "Det enkleste greb, der får en stand til at virke færdig.",
      "ikon": "plante"
    }
  },

  ledIntro: "Skærmen bygges op af moduler og tilpasses jeres plads og det indhold, I vil vise. Styringen indgår altid — skærmen kan ikke lejes uden. Vi hjælper også med at tilpasse billeder, film og præsentationer, så de fungerer på den valgte størrelse.",

  katalogGrupper: [
    {
      "id": "diske",
      "titel": "Diske, depot og opbevaring"
    },
    {
      "id": "moebler",
      "titel": "Møbler"
    },
    {
      "id": "teknik",
      "titel": "Skærme og teknik"
    },
    {
      "id": "kaffe",
      "titel": "Kaffe og køkken"
    }
  ],

  varer: {
    "expo_bar": {
      "navn": "Bardisk",
      "besk": "i barhøjde, 1 meter bred",
      "ikon": "disk"
    },
    "expo_skab": {
      "navn": "Disk med aflåst skab",
      "besk": "1 meter bred — tasker og værdier",
      "ikon": "disk"
    },
    "expo_hylde": {
      "navn": "Disk med hylder",
      "besk": "1 meter bred",
      "ikon": "disk"
    },
    "izi_disk": {
      "navn": "Infodisk",
      "besk": "til at tage imod ved",
      "ikon": "disk"
    },
    "ubord": {
      "navn": "U-formet bord",
      "besk": "plads til flere rundt om",
      "ikon": "bord"
    },
    "vitrine": {
      "navn": "Glasmontre med lys",
      "besk": "50 × 50 cm, 2 meter høj",
      "ikon": "vitrine"
    },
    "abc_reol": {
      "navn": "Reol til depotet",
      "besk": "til kasser og materialer",
      "ikon": "reol"
    },
    "depot_bord": {
      "navn": "Arbejdsbord til depotet",
      "besk": "1 meter",
      "ikon": "bord"
    },
    "staabord": {
      "navn": "Ståbord",
      "besk": "rundt, 70 cm",
      "ikon": "bord"
    },
    "cafebord": {
      "navn": "Cafébord i siddehøjde",
      "besk": "rundt, 80 cm",
      "ikon": "bord"
    },
    "barstol": {
      "navn": "Barstol",
      "besk": "til ståbordene",
      "ikon": "stol"
    },
    "skalstol": {
      "navn": "Stol uden armlæn",
      "besk": "hvid",
      "ikon": "stol"
    },
    "stol_arm": {
      "navn": "Stol med armlæn",
      "besk": "lyst træ, polstret",
      "ikon": "stol"
    },
    "loungestol": {
      "navn": "Lænestol",
      "besk": "til møder der tager tid",
      "ikon": "lounge"
    },
    "loungebord": {
      "navn": "Sofabord",
      "besk": "sort eller hvidt",
      "ikon": "bord"
    },
    "sofa": {
      "navn": "Sofa",
      "besk": "2-personers",
      "ikon": "lounge"
    },
    "brochure": {
      "navn": "Brochurestativ",
      "besk": "står på gulvet",
      "ikon": "brochure"
    },
    "stumtjener": {
      "navn": "Stativ til overtøj",
      "besk": "med bøjler",
      "ikon": "knage"
    },
    "affald": {
      "navn": "Skraldespand",
      "besk": "90 cm høj, poser med",
      "ikon": "affald"
    },
    "mon32": {
      "navn": "Skærm, 32 tommer",
      "besk": "ophæng med i prisen",
      "ikon": "skaerm"
    },
    "mon43": {
      "navn": "Skærm, 43 tommer",
      "besk": "ophæng med i prisen",
      "ikon": "skaerm"
    },
    "mon55": {
      "navn": "Skærm, 55 tommer",
      "besk": "ophæng med i prisen",
      "ikon": "skaerm"
    },
    "mon65": {
      "navn": "Skærm, 65 tommer",
      "besk": "ophæng med i prisen",
      "ikon": "skaerm"
    },
    "mon75": {
      "navn": "Skærm, 75 tommer",
      "besk": "ophæng med i prisen",
      "ikon": "skaerm"
    },
    "stander": {
      "navn": "Gulvstander til skærm",
      "besk": "hvis skærmen ikke skal på væggen",
      "ikon": "skaerm"
    },
    "afspiller": {
      "navn": "Afspiller til skærmen",
      "besk": "kører jeres video i sløjfe",
      "ikon": "teknik"
    },
    "ledskin": {
      "navn": "LED-væg, pr. flise",
      "besk": "50 × 50 cm — bygges som en mur",
      "ikon": "led"
    },
    "novastar": {
      "navn": "Styring til LED-væggen",
      "besk": "én pr. LED-væg",
      "ikon": "teknik"
    },
    "nespresso_s": {
      "navn": "Espressomaskine, stor",
      "besk": "Nespresso — til travle stande",
      "ikon": "kaffe"
    },
    "nespresso_l": {
      "navn": "Espressomaskine, lille",
      "besk": "Nespresso",
      "ikon": "kaffe"
    },
    "bonamat": {
      "navn": "Filterkaffemaskine",
      "besk": "12 kopper ad gangen",
      "ikon": "kaffe"
    },
    "vandkoger": {
      "navn": "Elkedel",
      "besk": "til te og instant",
      "ikon": "kaffe"
    },
    "koeleskab_h": {
      "navn": "Køleskab, højt",
      "besk": "170 cm med glaslåge",
      "ikon": "koel"
    },
    "koeleskab_l": {
      "navn": "Køleskab, lavt",
      "besk": "under disken, med glaslåge",
      "ikon": "koel"
    },
    "vask": {
      "navn": "Vask med afløb",
      "besk": "indbygget i et bordmodul",
      "ikon": "koel"
    },
    "papkrus": {
      "navn": "Papkrus",
      "besk": "50 stk.",
      "ikon": "kaffe"
    }
  },

  hvemLabels: {
    "os": "Vi klarer det",
    "jer": "Jeres del",
    "sammen": "Sammen"
  },

  omraader: {
    "reception": {
      "titel": "Velkomstdisk",
      "tekst": "Et tydeligt sted at henvende sig. Uden den bliver standen et rum, folk kigger ind i frem for går ind i.",
      "ikon": "disk",
      "stoerrelser": {
        "lille": "Lille disk",
        "mellem": "Disk med brochurer",
        "stor": "Disk med aflåst skab"
      }
    },
    "staabord": {
      "titel": "Ståborde",
      "tekst": "Til de korte samtaler. Folk der står, bliver i to minutter — folk der sætter sig, bliver i tyve.",
      "ikon": "bord",
      "stoerrelser": {
        "lille": "1 bord, 2 stole",
        "mellem": "2 borde, 4 stole",
        "stor": "3 borde, 6 stole"
      }
    },
    "moedeAabent": {
      "titel": "Åbent mødeområde",
      "tekst": "Bord og stole midt på standen. Halvprivat — man kan sætte sig, uden at gæsten føler sig lukket inde.",
      "ikon": "moedebord",
      "stoerrelser": {
        "lille": "Bord til 4",
        "stor": "U-bord til 6"
      }
    },
    "moede": {
      "titel": "Lukket mødeområde",
      "tekst": "Eget rum med vægge og dør. Til aftaler, der ikke skal høres af nabostanden.",
      "ikon": "rum",
      "stoerrelser": {
        "lille": "Rum til 4",
        "stor": "Rum til 6 med skærm"
      }
    },
    "lounge": {
      "titel": "Loungeområde",
      "tekst": "Bløde møbler til de samtaler, der skal tage tid.",
      "ikon": "lounge",
      "stoerrelser": {
        "lille": "2 lænestole",
        "mellem": "Sofa og 2 lænestole",
        "stor": "2 sofaer og 4 lænestole"
      }
    },
    "platform": {
      "titel": "Produktplatform",
      "tekst": "Til det store og tunge — maskiner, køretøjer, møbler. Et hævet podie løfter dem op i synsfeltet og markerer, at de er hovedsagen.",
      "ikon": "podie",
      "stoerrelser": {
        "lille": "4 m²",
        "mellem": "9 m²",
        "stor": "16 m²"
      }
    },
    "montre": {
      "titel": "Glasmontre",
      "tekst": "Til det lille og dyre. Aflåst montre med lys, hvor tingene kan ses tæt på uden at blive taget.",
      "ikon": "vitrine",
      "stoerrelser": {
        "lille": "1 montre",
        "stor": "2 montrer"
      }
    },
    "reol": {
      "titel": "Produktreol",
      "tekst": "Til mange varer ad gangen. Når det er bredden i sortimentet, der er pointen, frem for ét produkt.",
      "ikon": "reol",
      "stoerrelser": {
        "lille": "2 reoler",
        "stor": "4 reoler"
      }
    },
    "media": {
      "titel": "Skærm og video",
      "tekst": "Til det, der ikke kan stå på standen — anlæg, processer, referencer. Kører i sløjfe uden at nogen skal betjene det.",
      "ikon": "skaerm",
      "stoerrelser": {
        "lille": "43 tommer",
        "mellem": "55 tommer",
        "stor": "75 tommer på stander"
      }
    },
    "scene": {
      "titel": "Præsentationsområde",
      "tekst": "Til oplæg på faste tidspunkter. Samler folk på klokkeslæt i stedet for at vente på, at de driver forbi.",
      "ikon": "scene",
      "stoerrelser": {
        "fast": ""
      }
    },
    "bar": {
      "titel": "Bar og servering",
      "tekst": "Kaffe holder folk stående. Fire minutter mere kan være forskellen på en hilsen og et lead.",
      "ikon": "kaffe",
      "stoerrelser": {
        "lille": "Kaffe ved disken",
        "mellem": "Bar med køleskab",
        "stor": "Fuld bar med vask"
      }
    },
    "depot": {
      "titel": "Integreret depot",
      "tekst": "Aflåst rum til kasser, jakker og brochurer. På en almindelig stand fylder det 15–20 % af arealet — på de store rækker mindre.",
      "ikon": "kasser",
      "stoerrelser": {
        "lille": "Kun opbevaring",
        "mellem": "Med garderobe",
        "stor": "Med garderobe og køleskab"
      }
    }
  },

  /* Faglige tip: kun titel og tekst. Vægt og betingelse i data.js. */
  indsigter: {
    "depot": {
      "titel": "Hvor skal kasserne stå?",
      "tekst": "Afsæt plads til et aflåst depot — 15–20 % af arealet på en stand op til 50 m², mindre på de større. Uden det ender emballage, jakker og brochurekasser bag disken, og det er det første, gæsten ser."
    },
    "plads": {
      "titel": "Der bliver trangt",
      "tekst": "Jeres områder fylder mere end tre fjerdedele af standen. Gæsterne skal også kunne bevæge sig rundt — regn med at mindst en fjerdedel af arealet skal stå tomt, ellers føles standen lukket udefra."
    },
    "aabneSider": {
      "titel": "Spørg efter en ekstra åben side",
      "tekst": "Med én åben side skal I bygge tre vægge — og gæsten kan kun komme ind ét sted. To åbne sider fanger trafik fra begge retninger og sparer jer en hel vægflade. Merprisen hos arrangøren er typisk 5–10 %."
    },
    "treSekunder": {
      "titel": "3-sekundersreglen",
      "tekst": "En gæst går forbi jeres stand på tre sekunder. På den tid skal hun kunne se hvem I er, og hvilket problem I løser — på fem meters afstand. Rene vægge svarer til at møde op uden skilt."
    },
    "velkomst": {
      "titel": "Der er ingen at tage imod ved",
      "tekst": "Gæsten skal kunne se, hvor hun henvender sig, allerede fra gangen. Uden en disk eller et ståbord forrest bliver standen et rum, folk kigger ind i frem for går ind i."
    },
    "lys": {
      "titel": "Lyset løfter standen mest",
      "tekst": "Messehaller er mørkere, end folk husker. Går I fra almindeligt til ekstra lys, koster det typisk et par tusind kroner for hele messen — og det løfter standen mere end noget andet beløb i samme størrelse."
    },
    "servering": {
      "titel": "Kaffe holder folk stående",
      "tekst": "Den simpleste måde at forlænge en samtale fra 40 sekunder til fire minutter. Fire minutter er forskellen på en hilsen og et lead."
    },
    "siddeplads": {
      "titel": "Møder kræver et sted at sidde",
      "tekst": "I vil pleje kunderelationer. Den samtale foregår ikke ved et ståbord to meter fra jeres konkurrent. Et loungeområde eller et lukket mødeområde er ikke luksus — det er formålet med at være der."
    },
    "lancering": {
      "titel": "Ét produkt, ét brændpunkt",
      "tekst": "Ved en lancering skal alt andet træde tilbage. Ét belyst produkt eller én stor skærm midt i standen slår ti produkter på hylder — hver gang."
    },
    "skilt": {
      "titel": "Byg opad, ikke kun udad",
      "tekst": "Fra 30 m² bliver hængende branding afgørende. Det er det, der gør jer synlige fra den anden ende af hallen — tjek messearrangørens højdegrænse tidligt, den er ofte 3–6 meter."
    },
    "pixlip": {
      "titel": "Der findes et niveau over almindelige vægge",
      "tekst": "I har sat ambitionen til signatur. Lysvægge lyser indefra, så billederne står som på en skærm hele vejen rundt. Prøv at slå dem til og se, hvad forskellen koster — den er mindre, end de fleste tror."
    },
    "sentIGang": {
      "titel": "Der er kort tid til",
      "tekst": "Der er under fire måneder til messen. Vi anbefaler at gå i gang omkring et halvt år før — når messen nærmer sig, betyder bestillingsfristerne højere priser og færre valgmuligheder. Det kan stadig lade sig gøre, men ring hellere i dag end i næste uge."
    },
    "ingenDato": {
      "titel": "Sæt messedatoen på",
      "tekst": "Skriver I den første messedag ind, regner vi tidsplanen baglæns og viser, hvad der skal ske hvornår — også hvad I selv skal tage stilling til."
    },
    "opfoelgning": {
      "titel": "Messen vindes ugen efter",
      "tekst": "Hovedparten af messeleads lukkes efter messen — men kun hvis de bliver fulgt op hurtigt. Aftal opfølgningsprocessen, før I kører til messen, ikke efter."
    }
  },

  tidslinjeIntro: "Vi holder styr på hele forløbet — den første dialog, designet, produktionen, kontakten til messearrangøren og opbygningen. Det, der står som jeres, er det, kun I kan svare på.",

  /* Tidslinjen: kun titel og tekst. Uger og hvem i data.js. */
  tidslinje: {
    "tl0": {
      "titel": "Book plads og placering",
      "tekst": "De gode hjørne- og ø-pladser bliver taget først. Sig til, så rådgiver vi om, hvilken placering der passer til det, I vil opnå."
    },
    "tl1": {
      "titel": "Første dialog og behovsafklaring",
      "tekst": "En samtale om messen, jeres virksomhed og det, I vil have ud af standen. Vores opgave er at stille de rigtige spørgsmål, før vi går videre med designet."
    },
    "tl2": {
      "titel": "Designforslag og plan",
      "tekst": "Vi omsætter behov og rammer til et designforslag og lægger en tydelig plan for det videre forløb."
    },
    "tl3": {
      "titel": "Godkendelse af designet",
      "tekst": "I godkender den endelige tegning. Derefter går produktionen i gang på et afstemt grundlag."
    },
    "tl4": {
      "titel": "Bestillinger hos messearrangøren",
      "tekst": "Når vi får adgang til messearrangørens system, tager vi os af bestillinger og deadlines, så I slipper for administrationen."
    },
    "tl5": {
      "titel": "Grafikken skal være klar",
      "tekst": "I sender logo, billeder og tekst. Vores grafikere tilpasser materialet til fladerne — eller laver hele det grafiske arbejde, hvis I ikke har det liggende. Efter denne dato bliver ændringer dyre."
    },
    "tl6": {
      "titel": "Møbler og udstyr reserveret",
      "tekst": "Vi reserverer alt inventar til levering direkte på standen."
    },
    "tl7": {
      "titel": "Aftal hvordan I følger op",
      "tekst": "Hvordan registrerer I et lead på standen, og hvem kontakter dem bagefter? Det afgør, hvad messen er værd."
    },
    "tl8": {
      "titel": "Inviter jeres kunder",
      "tekst": "De vigtigste møder bookes før messen. Standen er rammen, ikke rekrutteringen."
    },
    "tl9": {
      "titel": "Pakning og transport",
      "tekst": "Standen pakkes hos os i Støvring, og vi koordinerer indlæsning, transport og aflæsning på messestedet."
    },
    "tl10": {
      "titel": "Opbygning og messedage",
      "tekst": "Vi bygger op og gennemgår standen frem mod åbningen. Når I ankommer, er alt på plads."
    },
    "tl11": {
      "titel": "Nedtagning og opbevaring",
      "tekst": "Vi pakker standen forsvarligt ned og sørger for returtransporten. Elementerne kan stå på vores lagerhotel, så de ikke optager plads hos jer — og så er de samlet ét sted, når I skal bruge dem igen."
    },
    "tl12": {
      "titel": "Følg op på jeres leads",
      "tekst": "Alle leads kontaktet inden for fem hverdage."
    }
  }
};
