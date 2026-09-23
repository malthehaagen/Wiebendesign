# Sådan lægger I beregneren på wiebendesign.dk

Sitet kører WordPress hos Simply.com. Beregneren er én HTML-fil uden
database, uden plugins og uden noget, der skal installeres — den lægges
ved siden af WordPress som en helt almindelig mappe. WordPress rører den
ikke: dets omskrivningsregler gælder kun adresser, der ikke findes i
forvejen, og en rigtig mappe med en `index.html` findes.

Det betyder også, at beregneren ikke kan gå ned sammen med WordPress, og
at en WordPress-opdatering ikke kan ødelægge den.

---

## Filen

Byg den seneste udgave med:

```
python3 integration/BYG.py
```

Så ligger `standberegner.html` i rodmappen: markup, styling, alle
sprogfiler, priserne og logoet i ét dokument på omkring 260 KB. Den
henter intet andet end skrifttyperne fra Google Fonts.

---

## Nu: en testadresse, ingen kan falde over

Målet er, at din chef kan se den på det rigtige domæne, uden at andre
kan finde den.

1. Log ind på **Simply.com → Kontrolpanel → Filhåndtering** for
   wiebendesign.dk.
2. Gå ind i `public_html` (den mappe, hvor WordPress' `wp-content` og
   `wp-config.php` ligger).
3. Opret en mappe med et navn, ingen gætter — f.eks. **`beregner-k7f2`**.
   Det er den billigste sikkerhed, der findes: en adresse, der ikke står
   nogen steder, og som ikke kan gættes, bliver ikke besøgt.
4. Læg `standberegner.html` ind i mappen, og **omdøb den til
   `index.html`**.
5. Læg også `integration/htaccess-til-testmappen.txt` ind i mappen og
   omdøb den til **`.htaccess`** (med punktum foran, uden `.txt`). Den
   beder søgemaskiner holde sig væk og spærrer for, at mappens indhold
   kan listes.

Beregneren ligger nu på:

```
https://wiebendesign.dk/beregner-k7f2/
```

Den engelske udgave er den samme adresse med `?lang=en` bagefter.

**Vil I have det helt tæt:** Simply.coms kontrolpanel har adgangskode­-
beskyttelse af enkelte mapper. Slår I den til på mappen, skal man have
brugernavn og kode for overhovedet at se siden. Det er den eneste måde
at gøre risikoen til nul — men med et mappenavn, der ikke kan gættes, og
ingen links til den, er den i forvejen meget lav.

---

## Senere: de rigtige adresser

Når priserne er bekræftet, og beregneren skal kunne findes:

1. Opret `public_html/standberegner/` og læg `standberegner.html` ind
   som `index.html`.
2. Opret `public_html/en/stand-calculator/` og læg **den samme fil** ind
   som `index.html`. Begge sprog ligger i filen; det er adressen, der
   afgør, hvilket sprog der vises.
3. Sæt de to adresser i `assets/config.js`, og byg filen igen:

   ```js
   sprogStier: { da: '/standberegner/', en: '/en/stand-calculator/' },
   ```

   Så peger sprogvælgeren på rigtige adresser i stedet for `?lang=en`.
   Det betyder, at jeres engelske side kan linke direkte til den
   engelske beregner, og at begge kan findes af søgemaskiner.
4. **Slet testmappen** og dens `.htaccess`. Så længe den ligger der, er
   der to udgaver af beregneren på nettet, og den gamle bliver ikke
   opdateret.
5. Sæt links ind fra sitet — mindst fra forsiden og fra *Messestande*.

## Når noget skal rettes bagefter

Ret i repoet, kør `python3 integration/BYG.py`, og læg den nye
`standberegner.html` op oven i den gamle. Det er hele opdateringen.
Kunder, der har siden åben, ser den nye udgave, næste gang de henter
den.

Bemærk, at gemte besvarelser ligger i den enkelte browsers
`localStorage` og hører til adressen. Flytter beregneren fra testmappen
til sin rigtige adresse, starter alle forfra — det er kun et problem for
jer, der har testet, ikke for kunderne.
