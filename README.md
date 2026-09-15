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
- **Arbejdsmodel for transport** — egen lastbil op til 450 km, derover speditør
  og fly til montørerne

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

## Det der IKKE er jeres tal

To af de tre budgetkolonner på trin 4 er markeret som skøn i selve modulet:

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
backlit-prisen, truss-riggen, produktplatformen, 60 m²-grænsen for speditør og
fragtprisen. Den hurtigste kontrol er at køre tre afsluttede tilbud gennem
beregneren og se, om den rammer inden for spændet.

**Resten:**

- **Rigtige fotos** på valgkortene. De indbyggede SVG-illustrationer i
  `WD_INDHOLD.svg` er placeholdere. Læg billeder i `assets/img/` og skift den
  linje i `app.js`, hvor `<span class="ill">` bygges:
  ```js
  b.appendChild(el('<span class="ill"><img src="assets/img/' + id + '.jpg" alt=""></span>'));
  ```
- **Endpointet skal sættes op** — se `integration/OPSAETNING.md`
- **Persondata**: samtykketekst og link til privatlivspolitik på formularen
- **Hosting**: hvordan modulet lægges på wiebendesign.dk
- **Teksterne** bør gennemlæses af Wieben Design. De er skrevet uden adgang til
  firmaets eget site — se Baggrund
- **Engelsk version**, når den danske ligger fast. Alle tekster ligger samlet i
  `content.js`
- **Opfølgningen internt**: hvem kontakter leadet, hvor hurtigt og med hvad

## Baggrund

Bemærk: wiebendesign.dk kunne ikke tilgås direkte under udviklingen på grund af
netværksrestriktioner. Beskrivelser af firmaet bygger på brancheportaler,
regnskabsdata og søgeresultater — ikke på sitet selv, og bør gennemlæses af
Wieben Design, før de bruges.
