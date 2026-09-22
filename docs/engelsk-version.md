# Engelsk version — hvor vi er nået til

**Status: etape 1 påbegyndt, 21. september 2026.** Beregneren kører uændret;
intet af nedenstående er koblet til endnu.

## Beslutninger truffet

| | Valg |
|---|---|
| Valuta | **Kun DKK.** Wieben fakturerer i DKK, og en omregnet pris i koden er forældet i morgen. Mærkes "DKK, excl. VAT". |
| Sprogskift | **To adresser** som på sitet: `/` = dansk, `/en/` = engelsk, så jeres engelske side kan linke direkte. **Plus** en DA/EN-knap i headeren til at skifte. `?lang=en` som reserve, så det virker uanset hosting. |
| Tilstand ved sprogskift | Kundens valg ligger i localStorage på samme domæne og skal overleve en navigation til `/en/`. Skal testes. |

## Omfanget — større end først antaget

README har tidligere påstået, at alle tekster ligger i `content.js`. Det er
ikke rigtigt:

| Fil | Strenge | Sproglag? |
|---|---|---|
| `content.js` | ~430 | nej, men samlet |
| `app.js` | ~166 | **nej — hardkodet i logikken** |
| `index.html` | ~100 | **nej — i markuppen** |

Det afgørende: mange af `app.js`' strenge er **fragmenter**, der klistres
sammen med tal:

```js
'Områderne fylder ca. ' + brugt + ' m² af jeres ' + m2 + ' m² — omkring ' + andel + ' %. Resten er plads at gå på.'
```

Fire tekststykker og tre tal i én sætning. Det kan ikke oversættes stykke for
stykke, fordi engelsk har en anden ordstilling. Hver sætning skal være én
nøgle med pladsholdere.

## Sproget

Wieben Designs engelske sider er gennemgået, og retningslinjerne står i
[`docs/tone-of-voice-en.md`](tone-of-voice-en.md). De vigtigste:
**"exhibition stand", aldrig "booth"**; **amerikansk stavning** (color, meter,
authorized); **"you/your"** i éntal; treklangen er **"your brand, products, and
goals"**; og sitets egne navne på prisposterne og de fem procesfaser bruges
direkte, så beregneren taler som resten af sitet.

## Gjort

- **`assets/tekst-da.js`** er oprettet: 143 nøgler, der dækker brugerfladens
  tekster fra `app.js`. Sætninger med tal er skrevet som skabeloner med
  `{navn}`-pladsholdere, ikke som fragmenter. Filen er gyldig JavaScript og
  indlæses ikke af noget endnu, så beregneren er uændret.

- **`index.html` er omlagt.** 89 tekststeder har nu `data-t`-nøgler, og
  `fyldTekster()` i `app.js` fylder dem fra sprogfilen. Fire varianter:
  `data-t` (tekst), `data-t-html` (må have `<strong>` og `<a>` fra vores egen
  fil, aldrig kundeinput), samt `data-t-alt`, `data-t-aria` og
  `data-t-placeholder` til attributter. `<html lang>` og talformatet
  (`Intl.NumberFormat`, `toLocaleString`) følger også sproget.

  Teksten står **kun** i sprogfilen, ikke også i markuppen. Én kilde — og en
  engelsk besøgende ser ikke dansk blinke forbi, før JavaScript har fyldt ind.
  Beregneren virker i forvejen ikke uden JavaScript.

## Næste skridt, i rækkefølge

1. ~~Kobl `tekst-da.js` til `app.js`.~~ **Gjort.**
2. ~~`index.html`.~~ **Gjort.**
3. ~~`content.js`.~~ **Gjort.** Delt i to:
   - `assets/data.js` (`WD_DATA`) — sprogneutralt: illustrationerne, byerne med
     afstand og broafgift, de faglige tips vægt og betingelse (`naar`), og
     tidslinjens uger og ansvar. Intet at oversætte.
   - `assets/indhold-da.js` (`WD_TEKST.da.indhold`) — alle tekster, med
     landenavne, og tip og tidslinjepunkter koblet på via id.

   Delingen var nødvendig, fordi de faglige tip blandede tekst med kode:
   hvert tip havde en `naar`-funktion ved siden af sin titel. Havde vi kopieret
   hele filen til engelsk, var betingelserne blevet duplikeret — og skulle
   rettes to steder for evigt.

4. ~~Oversæt.~~ **Gjort.** `assets/tekst-en.js` (224 nøgler) og
   `assets/indhold-en.js` (364 nøgler) — nøjagtig samme nøgler som de danske.
   Wieben Design gav den danske tekst fri til oversættelse med forbehold for
   smårettelser senere.
5. ~~Sprogvalg og knap.~~ **Gjort.** Se nedenfor.

## Sprogvalget i praksis

Adressen bestemmer sproget: **`/en/` i stien, eller `?lang=en`.** Et eksplicit
`?lang=` vinder over stien, så man kan fremtvinge et sprog på en hvilken som
helst hosting — også når filen åbnes direkte fra disken.

Sprogvælgeren i headeren er **links, ikke knapper**. Det er med vilje: links kan
åbnes i en ny fane og findes af søgemaskiner, og det sidste er hele pointen med
to adresser.

Så længe `sprogStier` i `config.js` står på `null`, skifter vælgeren med
`?lang=en`. Når beregneren ligger på sitet, sættes de rigtige adresser:

```js
sprogStier: { da: '/standberegner/', en: '/en/stand-calculator/' }
```

Kundens udfyldning ligger i localStorage på samme domæne og **overlever et
sprogskift**. Testet: 72 m² i Verona med 6 områder beholdt alt, og prisen var
samme tal i engelsk format (169.000 → 169,000).

## Valutaen

`kr.` stod hardkodet 13 steder i `app.js`. Den er nu en skabelon i sprogfilen,
fordi dansk sætter enheden *efter* tallet og engelsk *foran*:

| | |
|---|---|
| dansk | `valuta: '{tal} kr.'` |
| engelsk | `valuta: 'DKK {tal}'` |

Kontrolleret maskinelt: hver dansk nøgle med „kr.“ har DKK i sin engelske
pendant, og alle pladsholdere matcher på begge sider.

## Testes til sidst

- Hele testsuiten på begge sprog
- At kundens udfyldning overlever et sprogskift midt i forløbet
- At `lang`-attributten på `<html>` og talformatet (`da-DK` / `en-GB`) følger sproget
