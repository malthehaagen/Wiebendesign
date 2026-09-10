/* =====================================================================
   INDHOLD — tekster, messer, faglige indsigter og illustrationer.
   Priser ligger IKKE her, men i assets/pricing.js.
   Nøgler her skal matche nøglerne i pricing.js.
   ===================================================================== */

window.WD_INDHOLD = {

  /* ---------------- Messer ---------------- */
  messer: [
    { id: 'agromek',   navn: 'Agromek',                sted: 'MCH Herning',        lokation: 'dk', dage: 4 },
    { id: 'formland',  navn: 'Formland',               sted: 'MCH Herning',        lokation: 'dk', dage: 4 },
    { id: 'foodexpo',  navn: 'Foodexpo',               sted: 'MCH Herning',        lokation: 'dk', dage: 3 },
    { id: 'transport', navn: 'Transportmessen',        sted: 'MCH Herning',        lokation: 'dk', dage: 3 },
    { id: 'hi',        navn: 'HI Tech & Industry',     sted: 'Odense Congress Center', lokation: 'dk', dage: 3 },
    { id: 'ferie',     navn: 'Ferie for Alle',         sted: 'MCH Herning',        lokation: 'dk', dage: 3 },
    { id: 'bella',     navn: 'Messe i Bella Center',   sted: 'København',          lokation: 'dk', dage: 3 },
    { id: 'norden',    navn: 'Messe i Norden',         sted: 'Sverige/Norge/Finland', lokation: 'norden', dage: 3 },
    { id: 'eu',        navn: 'Messe i Europa',         sted: 'Tyskland, Holland, Italien …', lokation: 'eu', dage: 4 },
    { id: 'oversoeisk',navn: 'Messe uden for Europa',  sted: 'USA, Asien, Mellemøsten', lokation: 'oversoeisk', dage: 4 },
    { id: 'anden',     navn: 'En anden messe',         sted: 'Fortæl os hvilken',  lokation: 'dk', dage: 3 }
  ],

  /* ---------------- Trin 1: Messe-DNA ---------------- */
  profilSpoergsmaal: [
    {
      id: 'formaal',
      spoergsmaal: 'Hvad skal messen først og fremmest give jer?',
      hjaelp: 'Formålet afgør, hvordan standen skal bygges — ikke omvendt.',
      valg: [
        { id: 'leads',      titel: 'Kvalificerede leads',      tekst: 'I skal hjem med konkrete emner i pipeline.' },
        { id: 'brand',      titel: 'Synlighed og brand',        tekst: 'I skal ses, huskes og tages alvorligt i branchen.' },
        { id: 'lancering',  titel: 'Produktlancering',          tekst: 'Ét produkt skal have hele opmærksomheden.' },
        { id: 'relationer', titel: 'Pleje af eksisterende kunder', tekst: 'Møder, aftaler og fortrolige samtaler.' }
      ]
    },
    {
      id: 'frekvens',
      spoergsmaal: 'Hvor mange messer er I på om året?',
      hjaelp: 'Antallet afgør, om det kan betale sig at eje en stand, der kan genbruges.',
      valg: [
        { id: '1',    titel: 'Én messe',        tekst: 'Ét stort årligt højdepunkt.' },
        { id: '2-3',  titel: '2–3 messer',      tekst: 'Fast messeprogram i Danmark eller Norden.' },
        { id: '4+',   titel: '4 eller flere',   tekst: 'Messer er en kernekanal for jer.' },
        { id: 'foerste', titel: 'Det er vores første', tekst: 'I skal prøve formatet af.' }
      ]
    },
    {
      id: 'nuvaerende',
      spoergsmaal: 'Hvad har I i dag?',
      valg: [
        { id: 'intet',    titel: 'Ingenting',              tekst: 'Vi starter fra bunden.' },
        { id: 'rollups',  titel: 'Roll-ups og et bord',    tekst: 'Vi har klaret os med det basale.' },
        { id: 'stand',    titel: 'En stand vi genbruger',  tekst: 'Den trænger til fornyelse.' },
        { id: 'leje',     titel: 'Vi lejer os frem',       tekst: 'Ny løsning hver gang.' }
      ]
    },
    {
      id: 'ambition',
      spoergsmaal: 'Hvor højt skal ambitionsniveauet ligge?',
      hjaelp: 'Det påvirker materialevalg, finish og detaljeringsgrad — ikke om standen virker.',
      valg: [
        { id: 'basis',    titel: 'Basis',    tekst: 'Ordentligt, rent og funktionelt. Pengene skal bruges rigtigt.' },
        { id: 'plus',     titel: 'Plus',     tekst: 'Standen skal skille sig ud på gangen.' },
        { id: 'signatur', titel: 'Signatur', tekst: 'Standen skal være det, folk taler om efter messen.' }
      ]
    }
  ],

  /* ---------------- Standtyper ---------------- */
  standtyper: {
    portable: {
      navn: 'Portabel stand',
      kort: 'Let, transportabel løsning til mindre messer og konferencer',
      tekst: 'Pakkes ned i kasser, sættes op af to personer på en time og kan sendes med almindelig fragt. Ideel til mindre konferencer, roadshows og som supplement til en større stand.',
      passer: 'Op til ca. 12 m² · flere små arrangementer om året'
    },
    system: {
      navn: 'Systemstand (beMatrix)',
      kort: 'Modulært rammesystem der genbruges messe efter messe',
      tekst: 'Bygget på beMatrix — et modulært aluminiumsystem i 100 % genanvendelige materialer. Wieben Design er hovedforhandler af beMatrix i Danmark. Rammerne bliver, grafikken skifter: standen kan skifte udtryk og størrelse fra messe til messe uden at blive bygget forfra.',
      passer: '9–400 m² · 2 messer om året eller flere'
    },
    specialbyg: {
      navn: 'Specialbygget stand',
      kort: 'Bygget fra bunden — kun fantasien sætter grænsen',
      tekst: 'Hver detalje er jeres. Skæve vinkler, særlige materialer, indbygget teknik, dobbelthøjde. Det er her, standen bliver til arkitektur og ikke bare et rum med vægge.',
      passer: 'Fra 20 m² · når standen skal bære en position i markedet'
    }
  },

  /* ---------------- Åbne sider ---------------- */
  aabenhed: {
    raekke:  { navn: 'Rækkestand', tekst: '1 åben side. Naboer på begge sider og bagvæg.' },
    hjoerne: { navn: 'Hjørnestand', tekst: '2 åbne sider. Ligger for enden af en række.' },
    gavl:    { navn: 'Gavlstand',  tekst: '3 åbne sider. Kun én nabo.' },
    oe:      { navn: 'Ø-stand',    tekst: '4 åbne sider. Fritliggende i hallen.' }
  },

  /* ---------------- Tilvalg ---------------- */
  tilvalg: {
    moederum:      { navn: 'Lukket mødeområde',     tekst: 'Sted at lukke aftaler uden at halve hallen lytter med.' },
    bardisk:       { navn: 'Bar- eller infodisk',   tekst: 'Naturligt mødested og arbejdsplads for jeres folk.' },
    lager:         { navn: 'Aflåst lagerrum',       tekst: 'Kasser, jakker, brochurer og tasker ude af syne.' },
    produktdisplay:{ navn: 'Produktdisplay og podier', tekst: 'Produkterne løftet op i øjenhøjde og belyst.' },
    storskaerm:    { navn: 'Storskærm med ophæng',  tekst: 'Video og demo der kan ses fra gangen.' },
    lysplan:       { navn: 'Professionelt lysplan', tekst: 'Målrettet spotbelysning i stedet for hallens grålys.' },
    gulv:          { navn: 'Gulv',                  tekst: 'Tæppe, vinyl eller plank — og skjult kabelføring.' },
    grafik:        { navn: 'Storformatgrafik',      tekst: 'Print og opsætning fra vores egen grafiske afdeling.' },
    hems:          { navn: 'Anden etage',           tekst: 'Møderum ovenpå og dobbelt synlighed i hallen.' },
    moebler:       { navn: 'Møbler (leje)',         tekst: 'Leveret direkte på standen fra vores udlejning.' },
    beplantning:   { navn: 'Beplantning',           tekst: 'Det billigste greb der får en stand til at virke færdig.' },
    servering:     { navn: 'Kaffe og servering',    tekst: 'Den mest undervurderede grund til at folk bliver stående.' }
  },

  /* ---------------- Faglige indsigter ----------------
     Vises løbende, når kundens valg aktiverer dem.
     vaegt: højere tal vises først.                     */
  indsigter: [
    { id: 'lager', vaegt: 9,
      naar: s => s.stand.m2 >= 15 && !s.tilvalg.has('lager'),
      titel: 'Hvor skal kasserne stå?',
      tekst: 'Afsæt 15–20 % af arealet til lukket lager. Uden det ender emballage, jakker og brochurekasser bag disken — og det er det første, gæsten ser.' },

    { id: 'aabenhed', vaegt: 8,
      naar: s => s.stand.aabenhed === 'raekke' && s.stand.m2 >= 20,
      titel: 'Spørg efter en hjørneplads',
      tekst: 'En rækkestand har én åben side. Et hjørne har to og fanger trafik fra begge retninger. Merprisen hos messecenteret er typisk 5–10 % — det er sjældent den dyreste kvadratmeter, I køber.' },

    { id: 'treSekunder', vaegt: 10,
      naar: s => !s.tilvalg.has('grafik'),
      titel: '3-sekundersreglen',
      tekst: 'En gæst går forbi jeres stand på tre sekunder. På den tid skal hun kunne se hvem I er, og hvilket problem I løser — på fem meters afstand. Det er en grafikopgave, ikke en tekstopgave.' },

    { id: 'lys', vaegt: 7,
      naar: s => !s.tilvalg.has('lysplan'),
      titel: 'Lys er den billigste opgradering',
      tekst: 'Messehaller er mørkere, end folk husker. Målrettet spotbelysning løfter en almindelig stand mere end dyre materialer — og den koster en brøkdel.' },

    { id: 'hoejde', vaegt: 6,
      naar: s => s.stand.m2 >= 30,
      titel: 'Byg opad, ikke kun udad',
      tekst: 'Fra 30 m² bliver hængende eller høj branding afgørende. Det er det, der gør jer synlige fra den anden ende af hallen — tjek messecenterets højdegrænse tidligt, den er ofte 3–6 meter.' },

    { id: 'bemanding', vaegt: 8,
      naar: s => s.team.personer * WD_PRIS.leads.m2PrPerson < s.stand.m2,
      titel: 'I er for få på standen',
      tekst: 'Regn med én person pr. ca. 5 m² i åbningstiden, og aldrig færre end to. En optaget sælger koster jer den næste gæst — og gæster går ikke ind på en tom stand.' },

    { id: 'moede', vaegt: 7,
      naar: s => s.profil.formaal === 'relationer' && !s.tilvalg.has('moederum'),
      titel: 'Fortrolighed kræver vægge',
      tekst: 'I vil pleje kunderelationer. Den samtale foregår ikke ved en ståbord to meter fra jeres konkurrent. Et lukket mødeområde er ikke luksus, det er formålet.' },

    { id: 'lancering', vaegt: 7,
      naar: s => s.profil.formaal === 'lancering' && !s.tilvalg.has('produktdisplay'),
      titel: 'Ét produkt, ét brændpunkt',
      tekst: 'Ved en lancering skal alt andet træde tilbage. Ét belyst podie midt i standen slår ti produkter på hylder — hver gang.' },

    { id: 'genbrug', vaegt: 9,
      naar: s => (s.profil.frekvens === '2-3' || s.profil.frekvens === '4+') && s.stand.type === 'specialbyg',
      titel: 'I bygger den samme stand flere gange',
      tekst: 'Med flere messer om året betaler et modulært system sig typisk hjem efter anden eller tredje messe. Se sammenligningen i næste trin, før I beslutter jer.' },

    { id: 'opfoelgning', vaegt: 6,
      naar: () => true,
      titel: 'Messen vindes ugen efter',
      tekst: 'Hovedparten af messeleads lukkes efter messen — men kun hvis de bliver fulgt op hurtigt. Aftal opfølgningsprocessen, før I kører til Herning, ikke efter.' },

    { id: 'servering', vaegt: 5,
      naar: s => !s.tilvalg.has('servering') && s.stand.m2 >= 20,
      titel: 'Kaffe holder folk stående',
      tekst: 'Den simpleste måde at forlænge en samtale fra 40 sekunder til fire minutter. Fire minutter er forskellen på en hilsen og et lead.' },

    { id: 'gulv', vaegt: 4,
      naar: s => !s.tilvalg.has('gulv'),
      titel: 'Gulvet markerer grænsen',
      tekst: 'Et eget gulv fortæller ubevidst gæsten, hvor jeres rum begynder. Det er også der, kablerne skal skjules — beslut det tidligt, ikke på opbygningsdagen.' }
  ],

  /* ---------------- Tidslinje (uger før messen) ---------------- */
  tidslinje: [
    { uger: 32, titel: 'Book plads og placering',      tekst: 'De gode hjørne- og ø-pladser bliver taget først. Meld jer til, så snart standplanen åbner.' },
    { uger: 20, titel: 'Koncept og designoplæg',       tekst: 'Formål, budskab og standtype på plads. Her træffes de valg, der binder resten.' },
    { uger: 14, titel: 'Godkendelse af 3D',            tekst: 'Endelig godkendelse af tegninger. Herefter går standen i produktion.' },
    { uger: 10, titel: 'Bestil el, vand og internet',  tekst: 'Bestilles hos messecenteret — sent bestilt bliver dyrere bestilt.' },
    { uger: 6,  titel: 'Deadline for grafikfiler',     tekst: 'Storformatprint skal produceres og monteres. Efter denne dato bliver ændringer dyre.' },
    { uger: 4,  titel: 'Møbler og udstyr bestilt',     tekst: 'Møbelleje, skærme og planter reserveres til levering direkte på standen.' },
    { uger: 3,  titel: 'Bemanding og leadproces',      tekst: 'Hvem står hvornår? Hvordan registreres et lead? Hvem følger op — og hvornår?' },
    { uger: 2,  titel: 'Kundeinvitationer sendt',      tekst: 'De vigtigste møder bookes før messen. Standen er rammen, ikke rekrutteringen.' },
    { uger: 1,  titel: 'Transport afgår',              tekst: 'Standen kører afsted. Vi håndterer levering, indbæring og opbygning.' },
    { uger: 0,  titel: 'Opbygning og messe',           tekst: 'Vi bygger typisk op 1–2 dage før åbning og tager ned umiddelbart efter lukning.' },
    { uger: -1, titel: 'Opfølgning på leads',          tekst: 'Alle leads kontaktet inden for fem hverdage. Standen står på lager til næste gang.' }
  ],

  /* ---------------- Illustrationer ----------------
     Placeholder-illustrationer. Erstat med rigtige fotos ved at sætte
     'foto' på det enkelte valg i app.js — se README.md.            */
  svg: {
    raekke:  '<svg viewBox="0 0 100 70"><rect class="hal" x="6" y="6" width="88" height="58"/><rect class="stand" x="28" y="16" width="44" height="38"/><line class="aaben" x1="28" y1="54" x2="72" y2="54"/><rect class="nabo" x="10" y="16" width="16" height="38"/><rect class="nabo" x="74" y="16" width="16" height="38"/></svg>',
    hjoerne: '<svg viewBox="0 0 100 70"><rect class="hal" x="6" y="6" width="88" height="58"/><rect class="stand" x="46" y="16" width="44" height="38"/><line class="aaben" x1="46" y1="54" x2="90" y2="54"/><line class="aaben" x1="46" y1="16" x2="46" y2="54"/><rect class="nabo" x="10" y="16" width="28" height="38"/></svg>',
    gavl:    '<svg viewBox="0 0 100 70"><rect class="hal" x="6" y="6" width="88" height="58"/><rect class="stand" x="30" y="16" width="44" height="38"/><line class="aaben" x1="30" y1="54" x2="74" y2="54"/><line class="aaben" x1="30" y1="16" x2="30" y2="54"/><line class="aaben" x1="74" y1="16" x2="74" y2="54"/><rect class="nabo" x="30" y="8" width="44" height="6"/></svg>',
    oe:      '<svg viewBox="0 0 100 70"><rect class="hal" x="6" y="6" width="88" height="58"/><rect class="stand" x="30" y="18" width="40" height="34"/><line class="aaben" x1="30" y1="52" x2="70" y2="52"/><line class="aaben" x1="30" y1="18" x2="70" y2="18"/><line class="aaben" x1="30" y1="18" x2="30" y2="52"/><line class="aaben" x1="70" y1="18" x2="70" y2="52"/></svg>',

    portable:  '<svg viewBox="0 0 100 70"><rect class="stand" x="30" y="14" width="40" height="34" rx="2"/><path class="aaben" d="M30 48 L22 58 M70 48 L78 58"/><rect class="nabo" x="40" y="52" width="20" height="10" rx="2"/></svg>',
    system:    '<svg viewBox="0 0 100 70"><rect class="stand" x="16" y="14" width="28" height="20"/><rect class="stand" x="46" y="14" width="28" height="20"/><rect class="stand" x="16" y="36" width="28" height="20"/><rect class="stand" x="46" y="36" width="28" height="20"/><rect class="nabo" x="76" y="14" width="10" height="42"/></svg>',
    specialbyg:'<svg viewBox="0 0 100 70"><path class="stand" d="M14 56 L30 18 L58 12 L82 30 L74 56 Z"/><line class="aaben" x1="30" y1="18" x2="74" y2="56"/><circle class="nabo" cx="58" cy="34" r="6"/></svg>',

    moederum:      '<svg viewBox="0 0 100 70"><rect class="stand" x="20" y="16" width="60" height="38" rx="2"/><rect class="nabo" x="34" y="28" width="32" height="14" rx="2"/><line class="aaben" x1="50" y1="54" x2="50" y2="62"/></svg>',
    bardisk:       '<svg viewBox="0 0 100 70"><path class="stand" d="M22 50 L22 34 Q22 28 30 28 L70 28 Q78 28 78 34 L78 50 Z"/><line class="aaben" x1="18" y1="50" x2="82" y2="50"/><circle class="nabo" cx="50" cy="18" r="5"/></svg>',
    lager:         '<svg viewBox="0 0 100 70"><rect class="stand" x="26" y="16" width="48" height="40" rx="2"/><circle class="nabo" cx="64" cy="36" r="4"/><line class="aaben" x1="50" y1="16" x2="50" y2="56"/></svg>',
    produktdisplay:'<svg viewBox="0 0 100 70"><rect class="nabo" x="22" y="40" width="18" height="16"/><rect class="stand" x="42" y="26" width="18" height="30"/><rect class="nabo" x="62" y="36" width="18" height="20"/><line class="aaben" x1="42" y1="14" x2="60" y2="14"/></svg>',
    storskaerm:    '<svg viewBox="0 0 100 70"><rect class="stand" x="20" y="14" width="60" height="34" rx="2"/><line class="aaben" x1="50" y1="48" x2="50" y2="56"/><line class="aaben" x1="36" y1="56" x2="64" y2="56"/></svg>',
    lysplan:       '<svg viewBox="0 0 100 70"><line class="aaben" x1="16" y1="16" x2="84" y2="16"/><circle class="stand" cx="32" cy="22" r="5"/><circle class="stand" cx="50" cy="22" r="5"/><circle class="stand" cx="68" cy="22" r="5"/><path class="nabo" d="M32 28 L22 56 L42 56 Z M50 28 L40 56 L60 56 Z M68 28 L58 56 L78 56 Z"/></svg>',
    gulv:          '<svg viewBox="0 0 100 70"><rect class="stand" x="16" y="22" width="68" height="32" rx="2"/><line class="nabo" x1="16" y1="32" x2="84" y2="32"/><line class="nabo" x1="16" y1="42" x2="84" y2="42"/></svg>',
    grafik:        '<svg viewBox="0 0 100 70"><rect class="stand" x="18" y="14" width="64" height="36" rx="2"/><line class="aaben" x1="28" y1="26" x2="62" y2="26"/><line class="aaben" x1="28" y1="36" x2="50" y2="36"/><line class="nabo" x1="18" y1="56" x2="82" y2="56"/></svg>',
    hems:          '<svg viewBox="0 0 100 70"><rect class="stand" x="24" y="34" width="52" height="22"/><rect class="stand" x="24" y="14" width="52" height="18"/><line class="aaben" x1="76" y1="14" x2="88" y2="34"/></svg>',
    moebler:       '<svg viewBox="0 0 100 70"><circle class="stand" cx="50" cy="34" r="12"/><rect class="nabo" x="18" y="28" width="14" height="14" rx="3"/><rect class="nabo" x="68" y="28" width="14" height="14" rx="3"/><line class="aaben" x1="16" y1="54" x2="84" y2="54"/></svg>',
    beplantning:   '<svg viewBox="0 0 100 70"><path class="stand" d="M50 52 L50 26"/><path class="aaben" d="M50 32 Q34 24 36 40 Q46 42 50 32 Z M50 32 Q66 24 64 40 Q54 42 50 32 Z"/><rect class="nabo" x="42" y="52" width="16" height="10" rx="2"/></svg>',
    servering:     '<svg viewBox="0 0 100 70"><path class="stand" d="M32 26 L68 26 L64 50 L36 50 Z"/><path class="aaben" d="M68 30 Q80 32 76 42 Q72 46 66 44"/><line class="nabo" x1="28" y1="56" x2="72" y2="56"/></svg>'
  }
};
