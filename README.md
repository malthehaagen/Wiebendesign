# Standberegner — Wieben Design (prototype)

En prototype på et interaktivt modul til wiebendesign.dk, hvor kunden former sin
messestand, får faglige indsigter undervejs og ender med en anbefalet pakke, et
prisestimat og en plan frem mod messedagen.

Modulet kombinerer fire greb i ét forløb:

| Trin | Indhold | Formål |
|---|---|---|
| 1. Profil | Fire spørgsmål om formål, frekvens, udgangspunkt og ambition | Aktiverer behovet, før prisen kommer på bordet |
| 2. Standen | Messe, standtype, placering i hallen, areal, bemanding | Konfigurationen — med anbefaling og faglige tips |
| 3. Tilvalg | Mødeområde, bardisk, lager, lys, grafik, hems m.m. | Prisen bygges op, indsigter opdateres løbende |
| 4. Genbrug | TCO-sammenligning af de tre standtyper over flere messer | beMatrix-argumentet, i kroner og kilo |
| 5. Messeklar | Budget i tre kolonner + tidslinje baglæns fra messedatoen | Alt det kunden glemmer at budgettere |
| 6. Oplæg | Opsummering, prisestimat og kontaktformular | Kvalificeret lead med hele konfigurationen |

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
assets/app.js         Beregning, anbefalingslogik og visning
assets/styles.css     Design. Farver og radius ligger som variabler øverst
```

## Priserne er estimater

**Alle beløb i `assets/pricing.js` er brancheestimater og placeholdere.** De er sat
ud fra offentligt tilgængelige markedspriser — messecentrenes egne m²-satser og
markedets færdigpakkede standløsninger — og skal erstattes af Wieben Designs egne
kalkulationstal, før modulet kan gå live.

Alle priser er angivet som interval `[minimum, maksimum]` i DKK ekskl. moms.
Med de nuværende satser lander det samlede estimat ca. ±18 % omkring midtpunktet,
hvilket svarer til, hvad man forsvarligt kan love uden at have set en tegning.

Sådan ændrer du en pris:

```js
// assets/pricing.js
standtyper: {
  system: {
    perM2:    [3500, 4400],   // kr. pr. m² for selve standen
    gulvpris: [43000, 55000], // minimum uanset størrelse
    maxM2:    400
  }
}
```

Faktorerne `aabenhed` (antal åbne sider) og `ambition` (materialevalg og finish)
ganges på grundprisen. Ydelser (design, projektledelse, montage) beregnes som
procent af grundpris + tilvalg, med et minimumsbeløb.

## Illustrationer

Valgkortene bruger indbyggede SVG-illustrationer som placeholdere — de ligger i
`WD_INDHOLD.svg` i `content.js`. De er tænkt som pladsholdere for rigtige fotos
fra Wieben Designs egen portefølje. Udskift dem ved at lægge billeder i
`assets/img/` og ændre den ene linje i `app.js`, hvor `<span class="ill">` bygges:

```js
b.appendChild(el('<span class="ill"><img src="assets/img/' + id + '.jpg" alt=""></span>'));
```

## Hvad der mangler før produktion

- **Rigtige priser** fra Wieben Design i stedet for brancheestimaterne
- **Rigtige fotos** på valgkortene
- **Brandfarver og typografi** — CSS-variablerne øverst i `styles.css` er neutrale
- **Formularen sender ikke noget** endnu. Den logger konfigurationen til konsollen.
  Skal kobles til mail, CRM eller formularbackend
- **Messeliste** — de messer, Wieben Design faktisk vil optræde på, med rigtige datoer
- **Kobling til udlejningswebshoppen** på wieben.dk, hvor kunden allerede starter med
  at vælge sin messe. Møbeltilvalget bør pege derind
- **Persondata**: kontaktformularen skal have samtykketekst og databehandling på plads

## Baggrund

Grundlaget er research på Wieben Design A/S (CVR 20099607, Støvring, ca. 4 ansatte,
30+ års erfaring, stande på 72 destinationer på 5 kontinenter, hovedforhandler af
beMatrix i Danmark) samt markedspriser fra danske messearrangører.

Bemærk: wiebendesign.dk kunne ikke tilgås direkte under udviklingen på grund af
netværksrestriktioner. Beskrivelser af firmaets ydelser bygger derfor på
brancheportaler, regnskabsdata og søgeresultater — ikke på sitet selv. Tekster om
firmaet bør gennemlæses af Wieben Design, før de bruges.
