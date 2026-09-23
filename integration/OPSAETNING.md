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

### Når koden skal opdateres senere

Det her er stedet, hvor det går galt, og det gør det lydløst:

> **Udrul → Administrer udrulninger → blyanten → Version: Ny version → Udrul**

Brug **ikke** *Ny udrulning*. Den laver en udrulning mere med sin **egen
adresse** — og så bliver den gamle adresse ved med at svare med den
gamle kode. Beregneren ringer videre til den gamle, alt ser normalt ud,
og rettelsen kommer bare aldrig frem.

At gemme koden i editoren er heller ikke nok. Adressen svarer med den
version, udrulningen peger på, ikke med det, der står i editoren.

**Sådan tjekker I, at det lykkedes:** åbn beregneren med `?diag=1` og
tryk på knappen. Svaret indeholder `udgave` — det stempel står øverst i
`apps-script.gs`. Er det ikke skiftet, er versionen ikke skiftet.

**Er der kommet flere udrulninger ved et uheld:** behold den, `config.js`
peger på, og **arkivér** resten under Administrer udrulninger. Hver
udrulning er et åbent endpoint, der kører sin egen kode — og der skal
kun være ét.

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

### Mailen kommer stadig fra en gmail-adresse

Scriptet falder altid tilbage til Google frem for at vise kunden en fejl.
Det er med vilje — et lead må ikke gå tabt, fordi en mailtjeneste driller
— men det betyder også, at årsagen er tavs. Der er tre af dem:

1. **Nøglen er ikke sat** under Projektindstillinger → Scriptegenskaber
2. **Resend afviser** — domænet er ikke verificeret endnu, eller nøglen
   hører til en anden Resend-konto end den, domænet ligger i
3. **Resend kan ikke nås**
4. **Adressen kører en gammel version** af koden, hvor `AFSENDER` stadig
   var forkert. Se afsnittet lige nedenfor — det er den, der narrer folk,
   fordi `tjekResend` siger VIRKER samtidig

Vælg **`tjekResend`** i funktionslisten øverst i Apps Script-editoren og
tryk **Kør**. Den prøver at sende én testmail til `MODTAGER` gennem
Resend — nøjagtig den vej, en kundes oplæg tager — og skriver svaret
under **Udførelser**:

| Svar | Hvad der er galt |
|---|---|
| `INGEN NØGLE` | `RESEND_API_KEY` står ikke under Scriptegenskaber |
| `NØGLEN AFVISES (401)` | Nøglen er forkert, slettet, eller fra en anden konto end den, afsenderdomænet ligger i |
| `AFVIST (403)` | Domænet er ikke verificeret endnu. DNS kan være timer om at slå igennem |
| `VIRKER` | Resend tog imod. Tjek at mailen lander med den rigtige afsender |

Den falder med vilje **ikke** tilbage til Google — så ville den skjule
netop det, den leder efter.

### Testen virker, men kunden får stadig gmail

Så kører I to forskellige koder, og kun den ene er kundens.

Åbn **Udførelser** og se kolonnen **Implementering**. Den funktion, I selv
kørte fra editoren, står som **Primær** — det er koden, som den er gemt lige
nu. Kundens kald står som **Version 5**, **Version 6** og så videre — det er
den frosne kopi, web-adressen kører.

Står der `Primær` på jeres test og et versionsnummer på `doPost`, beviser en
vellykket test ingenting om, hvad kunden fik. Alt, der står i koden —
`AFSENDER`, `MODTAGER`, teksterne i mailen, priserne i oplægget — når først
kunden, når I udruller en ny version.

`Udrul` → `Administrer udrulninger` → blyanten → `Version: Ny version` → `Udrul`

Send et oplæg bagefter og se i **Udførelser**, at `doPost` nu står med det
nye versionsnummer. Gør den ikke det, gik udrulningen ikke igennem.

Kun `RESEND_API_KEY` og de andre scriptegenskaber er fælles for alle
versioner — dem behøver I ikke udrulle for at ændre.

**Afsenderen skal ligge på det verificerede domæne.** Er det
`mail.wiebendesign.dk`, der står som verified i Resend, skal `AFSENDER`
i `apps-script.gs` være `oplaeg@mail.wiebendesign.dk` — ikke
`oplaeg@wiebendesign.dk`. Roddomænet og underdomænet er to forskellige
domæner for Resend, og sender man fra det forkerte, svarer den 403.

Underdomænet er samtidig det tryggeste valg: går der noget galt med
udsendelserne, rammer det ikke firmamailens omdømme på roddomænet. Og
det undgår at skulle redigere SPF-posten på `wiebendesign.dk`, som
jeres Outlook-mail afhænger af.

`SVAR_TIL` behøver ingen verificering — svarene kan roligt lande på
`wd@wiebendesign.dk`.

**Hvilken adgang skal nøglen have:** kun **Sending access**. Scriptet
sender mails og laver ikke andet, og en nøgle, der slipper ud, skal ikke
kunne oprette domæner eller læse kontoens andre nøgler.

**Deler I Resend med et andet projekt:** den gratis plan tillader tre
domæner pr. konto, så wiebendesign.dk kan ligge i samme konto som et
andet projekt. To adskilte konti er dog renere — så kan det ene projekts
nøgle ikke sende som det andets domæne. Vælger I to konti, skal nøglen i
Scriptegenskaber være fra **den konto, wiebendesign.dk er verificeret
i**. Er det den forkerte, afvises mailen med 401 eller 403, og Google
sender i stedet.

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

## 6. Værn mod misbrug

Endpointet er åbent — det skal det være, for kunden skal kunne sende uden
at logge ind. Derfor har scriptet tre spærrer indbygget. I skal ikke gøre
noget for at slå dem til; de er der allerede.

**Lokkefeltet.** Formularen har et felt, der hedder `website`. Det er
skubbet uden for skærmen og springes over med tabulator, så intet menneske
ser det eller kan udfylde det. Automatiske robotter udfylder alt, hvad de
kan finde. Er der skrevet i feltet, kasseres indsendelsen — og scriptet
svarer alligevel "tak", så afsenderen ikke kan regne ud, hvad der afslørede
den.

**Loftet.** Samme mailadresse kan sende **3 oplæg i timen**, og der tages
imod **40 i alt pr. time**. Rammer en indsendelse loftet, bliver den
kasseret med samme venlige svar. Tællerne nulstilles af sig selv efter en
time.

**Længderne.** Navn, firma, mail, telefon, budget og besked bliver klippet
af, hvis de er længere end en rigtig kunde ville skrive — beskeden ved
2.000 tegn, de øvrige før. Det holder regnearket og mailen læselige, uanset
hvad der sendes.

Derudover afvises en indsendelse med en mailadresse, der ikke ligner en
mailadresse. Det er den eneste af de fire, kunden får en fejl at se på —
resten sker i stilhed, og årsagen står i Apps Script under **Udførelser**.

Bliver I alligevel ramt af noget, der slipper igennem, er den hurtige
udvej at trykke **Udrul → Administrer udrulninger → Arkivér** i Apps
Script. Så er endpointet lukket med det samme, og beregneren falder
tilbage til at vise prisen uden at sende noget.

---

## 7. Målingen

Beregneren sender én linje pr. besøg til fanen **Statistik** i det samme
regneark. Den sendes, når den besøgende forlader siden, og den svarer på
ét spørgsmål: **hvor falder folk fra?**

| Kolonne | Hvad den siger |
|---|---|
| Nåede trin | Det vigtigste tal. Falder halvdelen fra på „2 Standen“, er det dér, der skal rettes |
| Sekunder | Hvor længe de var i gang. To sekunder er en, der kom forkert ind; fire minutter er en, der gjorde arbejdet |
| Sendte oplæg | Ja/Nej. Antallet af Ja delt med antallet af linjer er jeres konverteringsrate |
| Enhed | Mobil eller computer. Falder mobilbrugerne fra ét bestemt sted, er det et layoutproblem |
| Sprog, Formål, m², Messedage, Land, Områder, Estimat | Hvad de var i gang med at bygge, da de forlod siden |

**Der er ingen personoplysninger i den.** Intet navn, ingen mail, ingen
IP-adresse og intet id — vi kan ikke se, om to linjer er det samme
menneske, og det har vi ikke brug for. Derfor er der heller ingen cookie
og ingen samtykkeboks på beregneren. Det er et bevidst valg: en
samtykkeboks er det første, en besøgende møder, og den koster
konverteringer på netop denne slags side.

Målingen har sin egen tæller på 400 linjer i timen, adskilt fra leadenes
loft. En travl dag på siden kan altså aldrig spærre for et rigtigt lead —
i værste fald taber vi en linje statistik.

Fanen bliver oprettet af sig selv, første gang nogen besøger beregneren.
I skal ikke gøre noget.

### Hvis noget ser forkert ud

Læg `?diag=1` bag adressen:

```
https://wiebendesign.dk/beregner-k7f2/?diag=1
```

Så kommer der en sort boks i nederste hjørne med to svar, man ellers
ikke kan få udefra:

- **Bygget** — hvornår den fil, browseren faktisk viser, blev bygget.
  Står der et ældre tidspunkt, end da I lagde filen op, er det en gammel
  udgave, I ser på, og så er det cachen og ikke koden, der driller.
- **Send en testmåling nu** — knappen sender et rigtigt kald til Apps
  Script og viser svaret, som det kommer tilbage. `SVAR 200 {"ok":true}`
  betyder, at vejen ud er i orden, og at fejlen i så fald er i
  regnearket. `FEJLEDE` betyder, at kaldet slet ikke kommer frem.

Testmålingen havner i regnearket med `DIAG-` foran besøgsnummeret, så
den er let at kende og slette igen.

Boksen vises kun med `?diag=1` i adressen. En kunde ser den aldrig.

---

## Hvad I kan skrue på

I `assets/config.js`:

| | |
|---|---|
| `sprogStier` | Faste adresser pr. sprog, f.eks. `{ da: '/standberegner/', en: '/en/stand-calculator/' }`. Står den `null`, skifter sprogvælgeren med `?lang=en`. |
| `kraevEmailForOplaeg` | Står på `false`. PDF'en kan hentes frit, men står som det stille alternativ under afsend-knappen. Prisen er alligevel synlig hele vejen i prisbjælken, så PDF'en indeholder ikke noget nyt — en lås på den koster mere i troværdighed end den henter i mailadresser. Sæt den til `true`, hvis I vil prøve det modsatte af. |
| `kraevEmailForPris` | `true` skjuler prisen, indtil kunden har afleveret sin mail. **Vi fraråder det** — prisen undervejs er det, der holder folk i gang. Men den er der, hvis I vil prøve det af. |

Øverst i `apps-script.gs` (husk en **ny udrulning** bagefter):

| | |
|---|---|
| `MODTAGER` | Hvem den interne besked går til. Skal stå på `wd@wiebendesign.dk`, før I linker til beregneren. |
| `MAKS_PR_MAIL` | Hvor mange oplæg samme mailadresse må sende pr. time. Står på `3`. |
| `MAKS_I_ALT` | Hvor mange oplæg der i alt tages imod pr. time. Står på `40`. Hæv det, hvis en kampagne giver mere trafik, end I regnede med. |
| `MAKS_STAT` | Hvor mange målingslinjer der tages imod pr. time. Står på `400`. |
| `MAKS_TEGN` | Hvor lange felterne må være, før de klippes af. |

## Persondata

Før modulet går live skal formularen have en samtykketekst og et link til jeres
privatlivspolitik. I samler navn, firma, mail og telefon, og det skal fremgå,
hvad I bruger oplysningerne til, og hvor længe I gemmer dem. Regnearket er jeres
databehandling — husk at rydde op i det med jævne mellemrum.

Det gælder fanen **Leads**. Fanen **Statistik** indeholder ingen
personoplysninger og er derfor ikke omfattet.
