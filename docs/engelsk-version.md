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

## Gjort

- **`assets/tekst-da.js`** er oprettet: 143 nøgler, der dækker brugerfladens
  tekster fra `app.js`. Sætninger med tal er skrevet som skabeloner med
  `{navn}`-pladsholdere, ikke som fragmenter. Filen er gyldig JavaScript og
  indlæses ikke af noget endnu, så beregneren er uændret.

## Næste skridt, i rækkefølge

1. **Kobl `tekst-da.js` til `app.js`.** Tilføj en `t(nøgle, værdier)`-hjælper,
   der slår op og erstatter `{navn}`. Erstat derefter de ~166 strenge i
   `app.js` med `t()`-kald. Kør hele testsuiten efter — udskriften skal være
   *identisk* med i dag. Det er kontrollen på, at intet er tabt.
2. **`index.html`.** Giv de statiske tekstnoder `data-t="nøgle"` og fyld dem
   fra sproglaget ved indlæsning.
3. **`content.js`.** Fold den ind i sproglaget. Pas på: `svg` og bylisten er
   sprogneutrale og skal ud i en datafil, mens landenavne skal oversættes.
4. **Oversæt** til `assets/tekst-en.js` — først når den danske tekst er
   godkendt af Wieben Design, ellers oversætter vi noget, der bliver lavet om.
5. **Sprogvalg og knap**, som besluttet ovenfor.

## Testes til sidst

- Hele testsuiten på begge sprog
- At kundens udfyldning overlever et sprogskift midt i forløbet
- At `lang`-attributten på `<html>` og talformatet (`da-DK` / `en-GB`) følger sproget
