/* =====================================================================
   CONTENT — English. Mirrors assets/indhold-da.js key for key.
   Keys must match pricing.js and data.js. See docs/tone-of-voice-en.md.
   ===================================================================== */

window.WD_TEKST = window.WD_TEKST || {};
window.WD_TEKST.en = window.WD_TEKST.en || {};
window.WD_TEKST.en.indhold = {

  landenavne: {
    dk: 'Denmark', de: 'Germany', se: 'Sweden', no: 'Norway', fi: 'Finland',
    nl: 'The Netherlands', be: 'Belgium', gb: 'United Kingdom', fr: 'France',
    it: 'Italy', es: 'Spain', pl: 'Poland', cz: 'Czechia', at: 'Austria',
    ch: 'Switzerland', us: 'United States', andet: 'Another country'
  },
  andenBy: 'Another city',

  profilSpoergsmaal: [
    {
      id: 'formaal',
      spoergsmaal: 'What should the show give you first and foremost?',
      hjaelp: 'The goal decides how the stand is laid out — not the other way around.',
      valg: [
        { id: 'leads',      titel: 'Qualified leads',            tekst: 'You need to go home with concrete prospects in the pipeline.' },
        { id: 'brand',      titel: 'Visibility and brand',       tekst: 'You need to be seen, remembered and taken seriously in the industry.' },
        { id: 'lancering',  titel: 'Product launch',             tekst: 'One product should have all the attention.' },
        { id: 'relationer', titel: 'Caring for existing clients', tekst: 'Meetings, agreements and confidential conversations.' }
      ]
    },
    {
      id: 'erfaring',
      spoergsmaal: 'How well do you know the exhibition format?',
      valg: [
        { id: 'foerste', titel: 'This is our first',   tekst: 'We need help with all of it.' },
        { id: 'enkelte', titel: 'We have done a few',  tekst: 'A couple of shows, but no fixed routine.' },
        { id: 'rutine',  titel: 'We have a routine',   tekst: 'Exhibitions are a core channel for us.' }
      ]
    },
    {
      id: 'ambition',
      spoergsmaal: 'How high should the ambition be?',
      hjaelp: 'It affects graphics, lighting and materials — not whether the stand works.',
      valg: [
        { id: 'basis',    titel: 'Basic',     tekst: 'Proper, clean and functional. The money should be well spent.' },
        { id: 'plus',     titel: 'Plus',      tekst: 'The stand should stand out along the aisle.' },
        { id: 'signatur', titel: 'Signature', tekst: 'The stand should be what people talk about after the show.' }
      ]
    }
  ],

  aabneSider: {
    1: { titel: '1 open side',  tekst: 'Neighbors on both sides and a back wall. Three sides to build.' },
    2: { titel: '2 open sides', tekst: 'Typical for the end of a row. Two sides to build.' },
    3: { titel: '3 open sides', tekst: 'Only one neighbor. One side to build.' },
    4: { titel: '4 open sides', tekst: 'An island in the hall. No walls against neighbors.' }
  },

  vaegtyper: {
    print:  { titel: 'Standard walls', tekst: 'White walls with your images and messages printed directly onto them. What most stands are built from.', teknik: 'Authorized beMatrix partner' },
    pixlip: { titel: 'Backlit walls',  tekst: 'The walls light up from within, so the images read like a screen. Costs a little more per meter, and no other wall holds attention the same way.', teknik: 'Pixlip backlit' }
  },
  grafikdaekning: {
    ingen:  { titel: 'Nothing',      tekst: 'Plain white walls, no print.' },
    delvis: { titel: 'Where it counts', tekst: 'Print where people look — about half the walls.' },
    fuld:   { titel: 'All of it',    tekst: 'Print on every wall surface.' }
  },
  grafikarbejde: {
    klar:   { titel: 'We have production-ready files', tekst: 'You supply the artwork finished and at the right dimensions. We check the files and adapt them to the surfaces.' },
    delvis: { titel: 'We have a logo and images',      tekst: 'You have the material, but it needs setting up. Our graphic designers adapt the format, proportions and layout to the stand’s surfaces.' },
    alt:    { titel: 'We need help with all of it',    tekst: 'We develop the artwork from scratch based on your visual identity — from idea and sketch to production-ready file.' }
  },

  gulv: {
    taeppe: { titel: 'Carpet',     tekst: 'With soft underlay. The most common choice — we agree the color with you.' },
    vinyl:  { titel: 'Vinyl',      tekst: 'A smooth floor. Sharp and bright.' },
    trae:   { titel: 'Wood floor', tekst: 'Natural wood. The warmest look — and the most expensive.' }
  },
  haevet: {
    nej: { titel: 'The hall floor', tekst: 'The covering is laid directly on the hall floor. Cables run along the walls.' },
    ja:  { titel: 'Raised floor',   tekst: 'The floor is built up so cables and technology sit hidden underneath. The stand gets a clear edge towards the aisle.' }
  },
  belysning: {
    standard:    { titel: 'Standard',     tekst: 'Spots on the walls. Enough for the stand to be properly lit.' },
    forstaerket: { titel: 'Extra light',  tekst: 'More and stronger spots. Noticeably brighter than the neighboring stands.' },
    pro:         { titel: 'Strong light', tekst: 'Large floodlights for tall walls and large surfaces.' }
  },

  omraadeGrupper: [
    { id: 'samtale', titel: 'Where will you talk to people?',
      hjaelp: 'This is where a hello becomes a lead. The longer a visitor stays, the more you get to say — and that depends on whether there is something to stand at, sit in or drink.' },
    { id: 'vis', titel: 'How should the products be shown?',
      hjaelp: 'Choose according to what you are showing. Large things need lifting up, small things belong behind glass, many things go on shelves, and what cannot stand on the stand goes on a screen.' },
    { id: 'bagved', titel: 'What should the visitor not see?',
      hjaelp: 'The most overlooked choice. Without a lockable room, crates, coats and brochures end up behind the counter — and that is the first thing a visitor notices.' }
  ],

  omraader: {
    reception:   { titel: 'Welcome counter', tekst: 'A clear place to come up to. Without one, the stand becomes a space people look into rather than walk into.', ikon: 'disk',
                   stoerrelser: { lille: 'Small counter', mellem: 'Counter with brochures', stor: 'Counter with lockable cabinet' } },
    staabord:    { titel: 'High tables', tekst: 'For the short conversations. People standing stay two minutes — people who sit down stay twenty.', ikon: 'bord',
                   stoerrelser: { lille: '1 table, 2 stools', mellem: '2 tables, 4 stools', stor: '3 tables, 6 stools' } },
    moedeAabent: { titel: 'Open meeting area', tekst: 'Table and chairs in the middle of the stand. Semi-private — you can sit down without the visitor feeling shut in.', ikon: 'moedebord',
                   stoerrelser: { lille: 'Table for 4', stor: 'U-shaped table for 6' } },
    moede:       { titel: 'Enclosed meeting room', tekst: 'Its own room with walls and a door. For agreements that should not be heard by the stand next door.', ikon: 'rum',
                   stoerrelser: { lille: 'Room for 4', stor: 'Room for 6 with a screen' } },
    lounge:      { titel: 'Lounge area', tekst: 'Soft furniture for the conversations that need time.', ikon: 'lounge',
                   stoerrelser: { lille: '2 armchairs', mellem: 'Sofa and 2 armchairs', stor: '2 sofas and 4 armchairs' } },

    platform:    { titel: 'Product platform', tekst: 'For the large and heavy — machines, vehicles, furniture. A raised plinth lifts them into the line of sight and marks them as the main event.', ikon: 'podie',
                   stoerrelser: { lille: '4 m²', mellem: '9 m²', stor: '16 m²' } },
    montre:      { titel: 'Display case', tekst: 'For the small and expensive. A lockable case with lighting, where things can be seen up close without being picked up.', ikon: 'vitrine',
                   stoerrelser: { lille: '1 case', stor: '2 cases' } },
    reol:        { titel: 'Product shelving', tekst: 'For many products at once. When the breadth of the range is the point, rather than one product.', ikon: 'reol',
                   stoerrelser: { lille: '2 units', stor: '4 units' } },
    media:       { titel: 'Screen and video', tekst: 'For what cannot stand on the stand — installations, processes, references. Runs on a loop with nobody operating it.', ikon: 'skaerm',
                   stoerrelser: { lille: '43 inches', mellem: '55 inches', stor: '75 inches on a stand' } },
    scene:       { titel: 'Presentation area', tekst: 'For talks at fixed times. Gathers people on the clock instead of waiting for them to drift past.', ikon: 'scene',
                   stoerrelser: { fast: '' } },

    bar:         { titel: 'Bar and refreshments', tekst: 'Coffee keeps people standing. Four more minutes is the difference between a hello and a lead.', ikon: 'kaffe',
                   stoerrelser: { lille: 'Coffee at the counter', mellem: 'Bar with a fridge', stor: 'Full bar with a sink' } },

    depot:       { titel: 'Integrated storage', tekst: 'A lockable room for crates, coats and brochures. On an ordinary stand it takes up 15–20 % of the area — on the large ones, less.', ikon: 'kasser',
                   stoerrelser: { lille: 'Storage only', mellem: 'With a coat rail', stor: 'With a coat rail and fridge' } }
  },

  stoerrelsesnavne: { lille: 'Small', mellem: 'Medium', stor: 'Large', fast: 'Standard' },

  tilkoeb: {
    skilt:       { titel: 'Hanging sign above the stand', tekst: 'Your name carried up in the rig, so the stand can be seen from the far end of the hall.', ikon: 'skaerm' },
    rigLys:      { titel: 'Light from the rig',           tekst: 'Floodlights hung above the stand. Lights the whole floor rather than just the walls.', ikon: 'lys' },
    led:         { titel: 'LED screen',                   tekst: 'Show the products in use with film and demonstrations. The screen becomes part of the stand and gives visitors a reason to stop.', ikon: 'led' },
    beplantning: { titel: 'Planting',                     tekst: 'The simplest move that makes a stand look finished.', ikon: 'plante' }
  },

  ledIntro: 'The screen is built from modules and adapted to your space and the content you want to show. The controller is always included — the screen cannot be rented without it. We also help adapt images, film and presentations so they work at the size you choose.',

  katalogGrupper: [
    { id: 'diske',   titel: 'Counters and storage' },
    { id: 'moebler', titel: 'Furniture' },
    { id: 'teknik',  titel: 'Screens and technology' },
    { id: 'kaffe',   titel: 'Coffee and kitchen' }
  ],
  varer: {
    expo_bar:    { navn: 'Bar counter',              besk: 'at bar height, 1 meter wide',        ikon: 'disk' },
    expo_skab:   { navn: 'Counter with locked cabinet', besk: '1 meter wide — bags and valuables', ikon: 'disk' },
    expo_hylde:  { navn: 'Counter with shelves',     besk: '1 meter wide',                       ikon: 'disk' },
    izi_disk:    { navn: 'Info counter',             besk: 'to greet people at',                 ikon: 'disk' },
    ubord:       { navn: 'U-shaped table',           besk: 'room for several around it',         ikon: 'bord' },
    vitrine:     { navn: 'Lit display case',         besk: '50 × 50 cm, 2 meters tall',          ikon: 'vitrine' },
    abc_reol:    { navn: 'Storage shelving',         besk: 'for crates and materials',           ikon: 'reol' },
    depot_bord:  { navn: 'Work table for storage',   besk: '1 meter',                            ikon: 'bord' },

    staabord:    { navn: 'High table',               besk: 'round, 70 cm',                       ikon: 'bord' },
    cafebord:    { navn: 'Café table, seated height', besk: 'round, 80 cm',                      ikon: 'bord' },
    barstol:     { navn: 'Bar stool',                besk: 'for the high tables',                ikon: 'stol' },
    skalstol:    { navn: 'Chair without armrests',   besk: 'white',                              ikon: 'stol' },
    stol_arm:    { navn: 'Chair with armrests',      besk: 'light wood, upholstered',            ikon: 'stol' },
    loungestol:  { navn: 'Armchair',                 besk: 'for meetings that take time',        ikon: 'lounge' },
    loungebord:  { navn: 'Coffee table',             besk: 'black or white',                     ikon: 'bord' },
    sofa:        { navn: 'Sofa',                     besk: '2-seater',                           ikon: 'lounge' },
    brochure:    { navn: 'Brochure stand',           besk: 'floor-standing',                     ikon: 'brochure' },
    stumtjener:  { navn: 'Coat rail',                besk: 'with hangers',                       ikon: 'knage' },
    affald:      { navn: 'Waste bin',                besk: '90 cm tall, bags included',          ikon: 'affald' },

    mon32:       { navn: 'Screen, 32 inches',        besk: 'mount included',                     ikon: 'skaerm' },
    mon43:       { navn: 'Screen, 43 inches',        besk: 'mount included',                     ikon: 'skaerm' },
    mon55:       { navn: 'Screen, 55 inches',        besk: 'mount included',                     ikon: 'skaerm' },
    mon65:       { navn: 'Screen, 65 inches',        besk: 'mount included',                     ikon: 'skaerm' },
    mon75:       { navn: 'Screen, 75 inches',        besk: 'mount included',                     ikon: 'skaerm' },
    stander:     { navn: 'Floor stand for a screen', besk: 'if the screen is not wall-mounted',  ikon: 'skaerm' },
    afspiller:   { navn: 'Media player',             besk: 'runs your video on a loop',          ikon: 'teknik' },
    ledskin:     { navn: 'LED wall, per panel',      besk: '50 × 50 cm — built like a wall',     ikon: 'led' },
    novastar:    { navn: 'LED wall controller',      besk: 'one per LED wall',                   ikon: 'teknik' },

    nespresso_s: { navn: 'Espresso machine, large',  besk: 'Nespresso — for busy stands',        ikon: 'kaffe' },
    nespresso_l: { navn: 'Espresso machine, small',  besk: 'Nespresso',                          ikon: 'kaffe' },
    bonamat:     { navn: 'Filter coffee machine',    besk: '12 cups at a time',                  ikon: 'kaffe' },
    vandkoger:   { navn: 'Kettle',                   besk: 'for tea and instant',                ikon: 'kaffe' },
    koeleskab_h: { navn: 'Fridge, tall',             besk: '170 cm with a glass door',           ikon: 'koel' },
    koeleskab_l: { navn: 'Fridge, low',              besk: 'under the counter, glass door',      ikon: 'koel' },
    vask:        { navn: 'Sink with drain',          besk: 'built into a counter module',        ikon: 'koel' },
    papkrus:     { navn: 'Paper cups',               besk: '50 pcs.',                            ikon: 'kaffe' }
  },

  indsigter: {
    depot:       { titel: 'Where will the crates go?',
                   tekst: 'Set aside room for lockable storage — 15–20 % of the area on a stand up to 50 m², less on the larger ones. Without it, packaging, coats and brochure crates end up behind the counter, and that is the first thing a visitor sees.' },
    plads:       { titel: 'It will be tight',
                   tekst: 'Your areas take up more than three quarters of the stand. Visitors also need to be able to move around — reckon on at least a quarter of the area staying empty, or the stand feels closed from the outside.' },
    aabneSider:  { titel: 'Ask for an extra open side',
                   tekst: 'With one open side you have to build three walls — and visitors can only enter from one place. Two open sides catch traffic from both directions and save you a whole wall surface. The surcharge from the organizer is typically 5–10 %.' },
    treSekunder: { titel: 'The three-second rule',
                   tekst: 'A visitor walks past your stand in three seconds. In that time they need to see who you are and which problem you solve — from five meters away. Blank walls are the equivalent of turning up without a sign.' },
    velkomst:    { titel: 'There is nobody to come up to',
                   tekst: 'A visitor should be able to see where to approach from the aisle. Without a counter or a high table at the front, the stand becomes a space people look into rather than walk into.' },
    lys:         { titel: 'Lighting lifts the stand most',
                   tekst: 'Exhibition halls are darker than people remember. Going from standard to extra light typically costs a couple of thousand kroner for the whole show — and it lifts the stand more than any other amount of the same size.' },
    servering:   { titel: 'Coffee keeps people standing',
                   tekst: 'The simplest way to stretch a conversation from 40 seconds to four minutes. Four minutes is the difference between a hello and a lead.' },
    siddeplads:  { titel: 'Meetings need somewhere to sit',
                   tekst: 'You want to care for client relationships. That conversation does not happen at a high table two meters from your competitor. A lounge area or an enclosed meeting room is not a luxury — it is the reason you are there.' },
    lancering:   { titel: 'One product, one focal point',
                   tekst: 'At a launch, everything else has to step back. One lit product or one large screen in the middle of the stand beats ten products on shelves — every time.' },
    skilt:       { titel: 'Build upwards, not only outwards',
                   tekst: 'From 30 m², hanging branding becomes decisive. It is what makes you visible from the far end of the hall — check the organizer’s height limit early, it is often 3–6 meters.' },
    pixlip:      { titel: 'There is a level above standard walls',
                   tekst: 'You have set the ambition to signature. Backlit walls light up from within, so the images read like a screen all the way round. Try switching them on and see what the difference costs — it is smaller than most people think.' },
    sentIGang:   { titel: 'There is not much time',
                   tekst: 'There are under four months to the show. We recommend starting around six months before — as the date approaches, supplier deadlines mean higher costs and fewer options. It can still be done, but call today rather than next week.' },
    ingenDato:   { titel: 'Add the show date',
                   tekst: 'Enter the first show day and we will work the schedule backwards and show what happens when — including what you need to decide yourself.' },
    opfoelgning: { titel: 'The show is won the week after',
                   tekst: 'Most exhibition leads close after the show — but only if they are followed up quickly. Agree the follow-up process before you drive to the show, not after.' }
  },

  tidslinjeIntro: 'We keep track of the whole process — the first conversation, the design, production, contact with the show organizer and the installation. What is listed as yours is what only you can answer.',
  tidslinje: {
    tl0:  { titel: 'Book your space and position', tekst: 'The good corner and island positions go first. Say the word and we will advise on which position fits what you want to achieve.' },
    tl1:  { titel: 'Goals and requirements',       tekst: 'A conversation about the show, your business and what you want from the stand. Our job is to ask the right questions before we move on to the design.' },
    tl2:  { titel: 'Design concept and plan',      tekst: 'We turn needs and constraints into a design concept and set out a clear plan for the rest of the project.' },
    tl3:  { titel: 'Design approval',              tekst: 'You approve the final drawing. Production then begins on an agreed basis.' },
    tl4:  { titel: 'Orders with the show organizer', tekst: 'Once we have access to the exhibitor portal, we take care of the orders and deadlines, so you are free of the administration.' },
    tl5:  { titel: 'Artwork deadline',             tekst: 'You send logo, images and text. Our graphic designers adapt the material to the surfaces — or produce the whole artwork if you do not have it. After this date, changes get expensive.' },
    tl6:  { titel: 'Furniture and equipment reserved', tekst: 'We reserve all furnishings for delivery directly to the stand.' },
    tl7:  { titel: 'Agree how you follow up',      tekst: 'How do you record a lead on the stand, and who contacts them afterwards? That decides what the show is worth.' },
    tl8:  { titel: 'Invite your clients',          tekst: 'The most important meetings are booked before the show. The stand is the setting, not the recruitment.' },
    tl9:  { titel: 'Packing and transport',        tekst: 'The stand is packed at our workshop in Støvring, and we coordinate loading, transport and unloading at the venue.' },
    tl10: { titel: 'Installation and show days',   tekst: 'We install the stand and go through it in the run-up to opening. By the time you arrive, everything is in place.' },
    tl11: { titel: 'Dismantling and storage',      tekst: 'We pack the stand down carefully and arrange the return transport. The elements can stay in our warehouse, so they do not take up space with you — and they are kept together, ready for the next time.' },
    tl12: { titel: 'Follow up on your leads',      tekst: 'Every lead contacted within five working days.' }
  },

  hvemLabels: { os: 'We handle it', jer: 'Your part', sammen: 'Together' }
};
