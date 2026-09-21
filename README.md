# Standberegner — Wieben Design (prototype)

> ## Om prisdata i dette repo
>
> Beregningen bygger på Wieben Designs egne salgs- og lejepriser, som ligger i
> `assets/pricing.js` og i fuld længde i [`docs/prisgrundlag.md`](docs/prisgrundlag.md).
>
> Wieben Designs **kostpriser er ikke i repoet** — hverken i filerne eller i
> git-historikken. Det samme gælder kundespecifikt inventar bygget til navngivne
> kunder. Det oprindelige tilbudsark er skrevet ud af historikken.
>
> Tilbage står de priser, en kunde alligevel møder i et tilbud. Vær opmærksom på,
> at listen dermed er offentligt læsbar for konkurrenter, og at `pricing.js`
> sendes til browseren, når siden kører. Skal modulet i produktion på
> wiebendesign.dk, bør priserne flyttes bag et backend-kald, så kun det
> beregnede resultat når frem til kunden.

Et interaktivt modul til wiebendesign.dk, hvor kunden former sin messestand, får
faglige indsigter undervejs og ender med en sammensat pakke, en pris og en plan
frem mod messedagen.

| Trin | Indhold | Formål |
|---|---|---|
| 1. Profil | Formål, erfaring og ambitionsniveau | Aktiverer behovet, før prisen kommer på bordet |
| 2. Standen | Messe, areal, åbne sider, vægge, grafik, gulv, lys | Konfigurationen — med råd og faglige tips |
| 3. Inventar | Diske, møbler, skærme, kaffe og el med rigtige lejepriser | Den sammensatte pakke |
| 4. Messeklar | Budget i tre kolonner + tidslinje baglæns fra messedatoen | Alt det kunden glemmer at budgettere |
| 5. Oplæg | Opsummering, prisestimat og kontaktformular | Kvalificeret lead med hele konfigurationen |

## Kom i gang

Ingen build, ingen afhængigheder. Åbn `index.html` direkte i en browser:

```bash
open index.html            # macOS
xdg-open index.html        # Linux
```

Eller server den lokalt, hvis du vil teste på mobil i samme netværk:

```bash
npx http-server . -p 8080
```

## Filer

```
index.html            Sidens struktur (trin, felter, beholdere)
assets/pricing.js     ALLE PRISER — den eneste fil, der skal rettes for at ændre tal
assets/content.js     Tekster, messer, faglige indsigter, tidslinje, illustrationer
assets/app.js         Beregning, rådgivningslogik og visning
assets/styles.css     Design. Farver og fonts ligger som variabler øverst
assets/config.js      Endpoint og til/fra-knapper. Ingen hemmeligheder her
assets/logo.png       Wieben Designs logo

integration/apps-script.gs   Serverleddet: regneark, kundemail og besked til jer
integration/OPSAETNING.md    Trin for trin til at sætte det i drift
docs/prisgrundlag.md         Salgs- og lejepriser udtrukket af tilbudsarket
docs/tone-of-voice.md        Sprog og påstande, udtrukket af wiebendesign.dk
docs/messekalender-2026.csv  Messekalenderen, som byerne er valgt efter
```

## Leads

Oplæggene sendes til ét Google Apps Script, der skriver leadet i et regneark,
sender oplægget til kunden og giver jer besked. Mailen kan sendes gennem Resend
fra `wiebendesign.dk` eller gennem jeres Google-konto.

API-nøglen ligger i scriptets egenskaber, aldrig i browseren. Fremgangsmåden står
i [`integration/OPSAETNING.md`](integration/OPSAETNING.md).

Uden et endpoint kører modulet videre som prototype: flowet virker, men intet
bliver sendt.

## Priserne

Beregningen bygger på **Wieben Designs egne priser**, udtrukket af firmaets
tilbudsark og gengivet i [`docs/prisgrundlag.md`](docs/prisgrundlag.md) —
326 varelinjer i kolonnen *Leje*. Alle beløb er **lejepris for hele messen**
i DKK ekskl. moms, samme grundlag som tilbuddene regner på.

Aflæst direkte fra prisgrundlaget:

- Projektstyring i staffel efter m² (6.000 → 14.000 kr.)
- b62-rammer og PVG-vægplader pr. løbende meter i 2 / 2,5 / 3 meters højde
- Pixlip PX200-profil pr. løbende meter
- Gulv pr. m² — tæppefliser, vinyl, trægulv, hævet gulv
- Belysning pr. spot — b62-spots, NOVI, ERON Pro
- Hele inventarkataloget: diske, møbler, skærme, kaffe, køleskabe, eltavler
- Montørtimepris 652 kr., overnatning 900 kr., fortæring 625 kr., forsikring
  1.750 kr., lastbil 6,75 kr./km, km-penge 4 kr./km, broafgift 410 kr., fly 3.900 kr.

Afledt og markeret som sådan i `pricing.js` — bør bekræftes af Wieben Design:

- **Print, 465 kr./m²** — regnet ud fra bannerpriserne i arket (5.600 kr. for 12 m²,
  2.800 for 6 m², 1.400 for 3 m² giver alle 466 kr./m²)
- **Backlit-print, 520 kr./m²** — samme metode på Pixlip-bannerne
- **Truss-rig, 130 kr. pr. løbende meter** — afledt af TX Truss-elementpriserne
- **Montagenormer** — 0,45–0,65 mandtimer pr. m² til opbygning, nedtagning som
  40 % heraf, pakning 0,15 timer pr. m², én montør pr. 25 m² (minimum to).
  Det er beregningens største usikkerhed, og det er den, prisspændet består af
- **Arbejdsmodel for transport** — én lastbil tager selv den største stand
  (oplyst af Wieben Design), så standens størrelse afgør ikke transportformen.
  Under 600 km kører vi altid selv; derover tager beregneren den billigste af
  egen kørsel og speditør med fly til montørerne. Fragt 22–34 kr./km tur/retur
- **Timenormer for grafisk arbejde** — 0,10–0,18 time pr. m² tryk, når kunden
  leverer logo og billeder, 0,20–0,35 når vi laver det hele fra bunden.
  Selve timeprisen, **750 kr.**, er oplyst af Wieben Design — den står ikke i
  arket, hvor den eneste timesats er montørens 652 kr.

Prisspændet er typisk ±4–5 %, fordi alt andet end montagetimerne er faste
lejepriser.

### Sådan retter du en pris

```js
// assets/pricing.js
gulv: {
  taeppe: 90 + 25,   // Heuga 530XL + blødt undergulv, kr. pr. m²
  vinyl:  150,
  trae:   250
}
```

Katalogets varer står som `{ id, leje }` i `pricing.js`, mens navn og beskrivelse
ligger under samme `id` i `content.js`. Tilføjer du en vare, skal den oprettes
begge steder.

## Forslaget til områder

Trykker kunden „Brug vores forslag“, fylder beregneren standen op til ca. 70 %
af arealet. Rækkefølgen kommer fra formålet (`PRIORITET` i `app.js`), og
`maksIForslag` i `pricing.js` sætter loftet for, hvor mange af hvert område
forslaget må lægge på. Loftet 1 betyder én og kun én — velkomstdisk, depot,
bar og præsentationsområde. De øvrige lofter ganges op på store stande, så et
areal på 200 m² ikke får samme inventar som et på 60.

To ting holder forslaget ærligt: første runde må intet område tage mere end
sin andel af pladsen (ellers slugte en stor produktplatform hele standen, og
depotet kom aldrig med), og når et område lægges på igen, regnes arealet på
den størrelse, der faktisk er valgt. Alle 60 kombinationer af formål og
størrelse lander på 50–70 % — ingen af dem udløser beregnerens egen
trængsels-advarsel.

## Det der IKKE er jeres tal

To af de tre budgetkolonner på trin 4 er markeret som estimat i selve modulet:

- **Messecenteret opkræver** (badge: *Anslået*) — arrangørernes standleje varierer
  fra messe til messe. Tallene er markedsniveau.
- **I står selv for** (badge: *Groft estimat*, stiplet ramme og skraveret bund) —
  Wieben Design kender ikke kundens lønninger, rejsepolitik eller
  markedsføringsbudget. Posterne står med, så kunden ikke glemmer dem, og
  dagsatsen kan rettes direkte i beregneren.

## Brand

Farver og fonts følger brandmanualen (`Farver og fonts.png`):

| Rolle | Værdi |
|---|---|
| Primary | `#3D8A95` petroleumsblå |
| Accent | `#1F4E59` mørk grøn/blå |
| Baggrund | `#F4F7F8` lysegrå |
| Overskrifter | Inter Tight 700, sort |
| Brødtekst | Noto Sans 400, sort |

Fonts hentes fra Google Fonts i `index.html`. Skal de selvhostes, er det den ene
`<link>` der skal skiftes ud.

## Hvad der mangler før produktion

**Tallene skal bekræftes.** Ni satser i `pricing.js` er afledte og markeret
AFLEDT — montagenormerne, ind- og udbæring, tomgods, printprisen,
backlit-prisen, truss-riggen, produktplatformen, 600 km-grænsen for altid at
køre selv, fragtprisen og timenormerne for grafisk arbejde. Den hurtigste
kontrol er at køre tre afsluttede tilbud gennem beregneren og se, om den rammer
inden for spændet.

**Særligt om transportformen.** Fordi én lastbil tager alt, er forskellen mellem
egen kørsel og speditør kun, om montørerne flyver eller kører med. Flybilletter
skalerer med antallet af montører, mens lastbilen ikke gør — derfor vinder egen
kørsel på de store stande og speditør på de små. På 620 km (Hannover) skifter
den fra speditør til egen kørsel et sted mellem 60 og 100 m². Wieben Design
siger selv, at de oftest kører selv i hele Europa; holder det også for en lille
stand langt væk, er det `altidEgenKoerselKm` (600) der skal op — eller
`koeretidMontoerer`, der fakturerer 1–2 montørers køretid til fuld timepris, der
skal ned.

**Resten:**

- **Endpointet skal sættes op** — se `integration/OPSAETNING.md`
- **Hosting**: hvordan modulet lægges på wiebendesign.dk
- **Teksterne** bør gennemlæses af Wieben Design. Tone, påstande og ordvalg er
  rettet efter firmaets eget site — se [`docs/tone-of-voice.md`](docs/tone-of-voice.md)
- **Engelsk version**, når den danske ligger fast. Alle tekster ligger samlet i
  `content.js`
- **Opfølgningen internt**: hvem kontakter leadet, hvor hurtigt og med hvad.
  Beregneren har ikke længere et „må vi ringe?“-felt — at sende oplægget er
  samtykke nok til, at I vender tilbage om messen, og både kvitteringen og
  kundens mail siger, at I gør det. Det løfte skal kunne holdes

## Efter lancering

**Rigtige fotos på valgkortene.** Besluttet udskudt til efter lancering: arbejdet
med at finde, beskære og godkende billeder vejer for nu tungere end det, de
tilføjer. De indbyggede SVG-illustrationer i `WD_INDHOLD.svg` fungerer indtil da.

Når billederne skal ind, læg dem i `assets/img/` og skift den linje i `app.js`,
hvor `<span class="ill">` bygges:

```js
b.appendChild(el('<span class="ill"><img src="assets/img/' + id + '.jpg" alt=""></span>'));
```

De otte, der gør mest forskel, er dem hvor valget er rent visuelt: almindelige
vægge vs. lysvægge, de tre gulve, de tre belysningsniveauer, hængeskilt og
LED-skærm. De fire "åbne sider"-kort skal **ikke** være fotos — de er
plantegninger af standens placering i hallen.

## Baggrund

Bemærk: wiebendesign.dk kunne ikke tilgås direkte under udviklingen på grund af
netværksrestriktioner. Beskrivelser af firmaet bygger på brancheportaler,
regnskabsdata og søgeresultater — ikke på sitet selv, og bør gennemlæses af
Wieben Design, før de bruges.
