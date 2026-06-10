# Brand cliccabili → pagina lavori del cliente

## Cosa succede oggi
- Le card "Featured Projects" in home **sono già `<Link>`** verso `/work/<slug>`.
- La pagina `/work/<slug>` legge il progetto dal database e mostra le immagini caricate da `/admin` (bucket `project-images`, URL firmati).
- Quando atterri su un progetto che **non esiste nel DB** (o slug sbagliato), la pagina mostra solo "← selected work" e "project not found" — è quello che stai vedendo.
- Nella pagina `/contact` due slug sono sbagliati (`giro-d-italia`, `firs1`) e portano al 404.
- Nel DB ci sono già 6 righe con gli slug giusti: `ac-milan, aston-villa, giro-ditalia, first, arenteiro, corgomo` — ma probabilmente alcuni record non hanno ancora immagini caricate, quindi la pagina sembra "vuota".

## Cosa farò

1. **Affordance visiva sulle card Featured Projects** (`src/routes/index.tsx`)
   - Cursore pointer esplicito, micro-hover sul titolo già presente: aggiungo un piccolo "view project →" sotto la tagline così è chiaro che la card è cliccabile.

2. **Fix pagina "project not found"** (`src/routes/work.$slug.tsx`)
   - Messaggio più chiaro: "questo progetto non ha ancora contenuti — caricali da /admin".
   - Bottone diretto a `/admin` (visibile solo se loggato come admin; per gli altri resta il link a `/work`).

3. **Fallback "nessuna immagine"** (`src/routes/work.$slug.tsx`)
   - Se il progetto esiste ma `images` è vuoto, mostro un messaggio gentile invece dei placeholder "image coming soon" generici, così capisci subito che basta caricare le immagini da `/admin`.

4. **Fix slug rotti nella pagina /contact** (`src/routes/contact.tsx`)
   - `giro-d-italia` → `giro-ditalia`
   - `firs1` → `first`
   - Aggiungo affordance hover anche qui.

5. **Verifica end-to-end**
   - Apro `/` in preview, clicco una card, controllo che la pagina progetto si apra.
   - Carico un'immagine di prova da `/admin` su un progetto e verifico che compaia su `/work/<slug>`.

## Cosa NON tocco
- Lo schema del DB, le RLS, il pannello `/admin` (già funzionante dopo i fix di prima).
- Il design generale / palette / tipografia della home.

## Note tecniche
- Nessuna nuova dipendenza, solo modifiche a 3 file route esistenti.
- Nessuna migrazione DB necessaria.
