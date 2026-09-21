# Sådan sætter I standberegneren i drift

Modulet sender oplæggene til ét Google Apps Script, der gør tre ting: skriver
leadet i et regneark, sender oplægget til kunden og sender en besked til jer.

Der skal ikke installeres noget, og der skal ikke betales for hosting.
Regn med en halv time.

**API-nøglen ligger i scriptet, ikke i browseren.** Alt, hvad der står i
`assets/config.js`, kan læses af enhver besøgende — derfor ligger der ingen
hemmeligheder i den fil.

---

## 1. Opret regnearket

1. Opret et nyt Google Sheet. Kald det for eksempel *Standberegner — leads*.
2. Fanen behøver I ikke oprette. Scriptet laver den og skriver overskrifterne,
   første gang et oplæg kommer ind.

## 2. Læg scriptet ind

1. I regnearket: **Udvidelser → Apps Script**.
2. Slet det, der står i `Code.gs`, og indsæt hele indholdet af
   [`apps-script.gs`](apps-script.gs).
3. Ret de fire linjer øverst:

   ```js
   var MODTAGER = 'wd@wiebendesign.dk';                           // hvem hos jer får leadet
   var AFSENDER = 'Wieben Design <oplaeg@wiebendesign.dk>';       // kræver Resend, se trin 4
   var SVAR_TIL = 'wd@wiebendesign.dk';                           // hvor kundens svar lander
   var ARK      = 'Leads';                                        // fanens navn
   ```

4. Gem.

## 3. Udgiv scriptet som endpoint

1. Tryk **Udrul → Ny udrulning**.
2. Vælg typen **Webapp**.
3. Sæt *Kør som* til **mig** og *Hvem har adgang* til **Alle**.

   Det lyder mere åbent, end det er: adgang betyder kun, at siden må sende
   oplæg ind. Regnearket og mailen forbliver jeres.
4. Kopier webapp-adressen. Den ser sådan ud:
   `https://script.google.com/macros/s/AKfy…/exec`
5. Sæt den ind i `assets/config.js`:

   ```js
   endpoint: 'https://script.google.com/macros/s/AKfy…/exec',
   ```

**Nu virker det.** Mailen sendes fra jeres Google-konto. Vil I have den til at
komme fra wiebendesign.dk, så fortsæt.

> Hver gang I ændrer i scriptet, skal I lave en **ny udrulning** — ellers kører
> den gamle version videre. Vælg *Administrer udrulninger* og rediger den
> eksisterende, så beholder I den samme adresse.

## 4. Resend (valgfrit, men anbefalet)

Uden Resend kommer mailen fra jeres Google-konto. Det virker, men afsenderen er
en gmail-adresse, og der er et loft på 100 mails i døgnet på en privat konto.

Med Resend kommer den fra `oplaeg@wiebendesign.dk`.

1. Opret en konto på [resend.com](https://resend.com). Gratisplanen giver
   **3.000 mails om måneden med højst 100 om dagen** og **ét domæne**. Der skal
   ikke kort på, og den udløber ikke.
2. Tilføj `wiebendesign.dk` under *Domains*, og læg de DNS-poster ind, Resend
   beder om. Det kan tage nogle timer, før den står som verificeret.
3. Lav en API-nøgle under *API Keys*.
4. I Apps Script: **Projektindstillinger → Scriptegenskaber → Tilføj egenskab**

   | Navn | Værdi |
   |---|---|
   | `RESEND_API_KEY` | nøglen fra Resend |

5. Lav en ny udrulning.

Scriptet opdager selv nøglen og skifter over. Er den ikke sat, falder den
tilbage til Googles egen afsendelse — så I kan komme i gang uden at vente på
DNS.

## 5. Prøv det af

Udfyld beregneren og send et oplæg til jer selv. Tjek tre ting:

- rækken står i regnearket
- kunden har fået sin mail
- I har fået jeres

Går noget galt, viser siden en fejl til kunden med jeres telefonnummer, og
årsagen står i Apps Script under **Udførelser**.

---

## Hvad I kan skrue på

I `assets/config.js`:

| | |
|---|---|
| `kraevEmailForOplaeg` | Står på `false`. PDF'en kan hentes frit, men står som det stille alternativ under afsend-knappen. Prisen er alligevel synlig hele vejen i prisbjælken, så PDF'en indeholder ikke noget nyt — en lås på den koster mere i troværdighed end den henter i mailadresser. Sæt den til `true`, hvis I vil prøve det modsatte af. |
| `kraevEmailForPris` | `true` skjuler prisen, indtil kunden har afleveret sin mail. **Vi fraråder det** — prisen undervejs er det, der holder folk i gang. Men den er der, hvis I vil prøve det af. |

## Persondata

Før modulet går live skal formularen have en samtykketekst og et link til jeres
privatlivspolitik. I samler navn, firma, mail og telefon, og det skal fremgå,
hvad I bruger oplysningerne til, og hvor længe I gemmer dem. Regnearket er jeres
databehandling — husk at rydde op i det med jævne mellemrum.
