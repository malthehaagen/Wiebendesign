/* =====================================================================
   OPSÆTNING — det eneste, der skal ændres for at sætte modulet i drift.
   Denne fil indeholder ingen hemmeligheder. API-nøgler hører hjemme på
   serveren, aldrig her: alt i denne fil kan læses af enhver besøgende.
   ===================================================================== */

window.WD_CONFIG = {

  /* Adressen på Apps Script-endpointet, der modtager oplæggene.
     Se integration/OPSAETNING.md. Står den tom, kører modulet videre
     som prototype: intet bliver sendt, men flowet virker. */
  endpoint: '',

  /* Skal kunden aflevere sin mail for at få oplægget som PDF?
     true  = PDF-knappen dukker først op, når oplægget er sendt
     false = PDF'en kan hentes frit, men står som det stille alternativ
             under afsend-knappen

     Står på false. Prisen er alligevel synlig hele vejen i prisbjælken, så
     PDF'en indeholder ikke noget, kunden ikke har set — og en lås på den
     koster mere i troværdighed end den henter i mailadresser. Vil I prøve
     det modsatte af, er det denne ene linje, der skal skiftes. */
  kraevEmailForOplaeg: false,

  /* Skal prisen skjules, indtil kunden har afleveret sin mail?
     Vi fraråder det: prisen undervejs er det, der holder folk i gang.
     Sæt den til true, hvis I vil prøve det af. */
  kraevEmailForPris: false
};
