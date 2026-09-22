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

## 4. Resend

Uden Resend kommer mailen fra jeres Google-konto. Det virker, men afsenderen er
en gmail-adresse. Med Resend kommer den fra `oplaeg@wiebendesign.dk`.

> **Har I allerede en Resend-konto til et andet projekt?** Tre ting er
> anderledes for jer — læs afsnittet *Hvis I deler konto med et andet
> projekt* længere nede, **før** I går i gang med trin 1.

### Trin for trin

**1. Log ind på [resend.com](https://resend.com)**
Opret en konto, hvis I ikke har en. Der skal ikke kort på.

**2. Tilføj domænet**
*Domains → Add Domain →* skriv `wiebendesign.dk` → *Add*.

**3. Læg DNS-posterne ind**
Resend viser nu 3–4 poster (typisk én MX og et par TXT). De skal ind hos den,
der styrer jeres DNS — ofte webbureauet eller jeres hostingudbyder. Kopiér dem
én for én; værdierne skal stå præcis som Resend skriver dem.

**4. Vent**
Tryk *Verify* i Resend. Står der stadig *Pending*, så vent og prøv igen.
Det tager som regel under en time, men kan tage op til et døgn.
**I kan roligt gå videre imens** — se *Mens I venter* nedenfor.

**5. Lav en API-nøgle — på resend.com**
*API Keys → Create API Key*. Giv den et navn, I kan kende igen, f.eks.
`standberegner`. Vælg **Sending access**, ikke Full access. Kopiér nøglen —
den vises kun én gang.

> **Nøglen skal kun ét sted hen: Apps Script (trin 6).** Har I andre værktøjer
> med en liste over API-legitimationsoplysninger pr. værtsnavn, skal
> beregnerens nøgle **ikke** ind der. Sådan en liste kan kun holde én post pr.
> vært, så en ekstra post på `api.resend.com` bliver ignoreret — og risikerer
> at forstyrre det projekt, der bruger den i forvejen. Beregneren kalder
> Resend fra Apps Script og henter nøglen fra scriptets egne egenskaber.

**6. Læg nøglen i Apps Script**
Åbn scriptet → **Projektindstillinger** (tandhjulet) → rul ned til
**Scriptegenskaber** → *Tilføj scriptegenskab*:

| Navn | Værdi |
|---|---|
| `RESEND_API_KEY` | nøglen fra trin 5 |

Tryk **Gem scriptegenskaber**.

**7. Lav en ny udrulning**
*Udrul → Administrer udrulninger →* blyanten → **Version: Ny version** →
*Udrul*. Uden dette kører den gamle kode videre.

**8. Prøv det af**
Send et oplæg fra beregneren til jer selv. Tjek derefter:

- kom mailen fra `oplaeg@wiebendesign.dk` og ikke fra en gmail-adresse?
- står der en række i regnearket?
- fik `wd@wiebendesign.dk` beskeden?
- står mailen under *Logs* i Resend?

### Mens I venter på DNS

**I kan lave trin 5–7, mens I venter.** API-nøgler hører til kontoen, ikke til
domænet. Scriptet prøver Resend ved hver afsendelse, får et afslag, og sender
gennem Google i stedet. Kunden mærker intet, og leadet gemmes. Når domænet
bliver verificeret, skifter det **af sig selv ved næste indsendelse** — I skal
ikke udrulle igen.

Årsagen står i scriptets **Udførsler**-log, og den er nyttig: står der
„Resend svarede 403…“, beviser det, at nøglen bliver læst korrekt. Står der
intet om Resend overhovedet, bliver nøglen ikke læst — tjek navnet
`RESEND_API_KEY` og om der er lavet en ny udrulning.

> **Kør trin 8 med det samme efter trin 7.** Faldbakken bygger på, at Resend
> *afviser* et uverificeret domæne. Skulle de i stedet tage imod kaldet og
> bare lade være med at levere, udløses faldbakken ikke, og mailen forsvinder
> i stilhed. Testen afgør det:
>
> - **kommer der en mail fra en gmail-adresse** → faldbakken virker, lad
>   nøglen sidde
> - **kommer der slet ingen mail** → tag nøglen ud igen, og sæt den først ind,
>   når Resend siger *Verified*

Det samme gælder, hvis Resend er nede eller nøglen er forkert. De tre
situationer er afprøvet:

| Hvad sker der | Leadet gemt | Kunden ser | Mailen sendes |
|---|---|---|---|
| Resend virker | ja | kvittering | via Resend |
| Domænet ikke verificeret endnu | ja | kvittering | via Google |
| Resend kan ikke nås | ja | kvittering | via Google |

Leadet gemmes **før** mailene sendes, og de to mails sendes hver for sig — så
en fejl i den ene stopper ikke den anden.

### Hvis I deler konto med et andet projekt

**1. Gratisplanen giver ét domæne.** Bruger det andet projekt allerede det
   ene, kan `wiebendesign.dk` ikke tilføjes gratis. I har tre veje:
   opgradér planen, brug en separat Resend-konto til dette, eller kør videre
   på Googles afsendelse indtil videre (sæt bare ikke nøglen ind).

   Er `wiebendesign.dk` **allerede** verificeret på kontoen, kan I springe
   trin 2–4 over.

**2. Loftet deles.** Måneds- og døgnloftet gælder hele kontoen, ikke pr.
   domæne. Beregnerens forbrug lægges oven i det andet projekts.

**3. Lav en ny nøgle — genbrug ikke den anden.** Så kan I slå netop denne
   fra uden at røre det andet projekt, og I kan se i Resends log, hvad der
   kommer hvorfra.

> **Tallene skal tjekkes.** Da dette blev skrevet gav gratisplanen 3.000 mails
> om måneden med højst 100 om dagen og ét domæne. Den slags ændrer sig — kig
> på Resends prisside, før I regner med tallene.

### Hvis noget driller

| Symptom | Sandsynlig årsag |
|---|---|
| Mailen kommer fra en gmail-adresse | Nøglen er ikke sat, eller der er ikke lavet ny udrulning |
| Ingenting sker | Endpointet i `config.js` peger forkert, eller udrulningen er ikke sat til *Alle* |
| Mail til jer, men ikke til kunden | Kundens adresse er forkert, eller mailen ligger i spam |
| Resend viser intet under *Logs* | Nøglen hører til en anden konto end det verificerede domæne |

Alt hvad scriptet fanger, står under **Udførsler** i Apps Script. Start der.

### To sprog

Beregneren findes på dansk og engelsk, og kundens valg følger med i feltet
`sprog`. Scriptet bruger det tre steder:

- **Kundens mail** sendes på kundens eget sprog — emne, overskrifter, beløb og
  dato. Dansk skriver `5.250–8.500 kr.` og `26. januar 2027`; engelsk skriver
  `DKK 5,250–8,500` og `26 January 2027`.
- **Beskeden til jer** bliver på dansk, også for et engelsk lead — det er jeres
  interne mail. Men emnet får `[EN]` bagpå, og øverst i mailen står der
  „Leadet er udfyldt på engelsk — svar på engelsk“, så den der svarer ved det.
- **Regnearket** har en kolonne `Sprog` med DA eller EN.

Teksterne til mailene står samlet i `TEKST` øverst i `apps-script.gs`.

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
| `sprogStier` | Faste adresser pr. sprog, f.eks. `{ da: '/standberegner/', en: '/en/stand-calculator/' }`. Står den `null`, skifter sprogvælgeren med `?lang=en`. |
| `kraevEmailForOplaeg` | Står på `false`. PDF'en kan hentes frit, men står som det stille alternativ under afsend-knappen. Prisen er alligevel synlig hele vejen i prisbjælken, så PDF'en indeholder ikke noget nyt — en lås på den koster mere i troværdighed end den henter i mailadresser. Sæt den til `true`, hvis I vil prøve det modsatte af. |
| `kraevEmailForPris` | `true` skjuler prisen, indtil kunden har afleveret sin mail. **Vi fraråder det** — prisen undervejs er det, der holder folk i gang. Men den er der, hvis I vil prøve det af. |

## Persondata

Før modulet går live skal formularen have en samtykketekst og et link til jeres
privatlivspolitik. I samler navn, firma, mail og telefon, og det skal fremgå,
hvad I bruger oplysningerne til, og hvor længe I gemmer dem. Regnearket er jeres
databehandling — husk at rydde op i det med jævne mellemrum.
