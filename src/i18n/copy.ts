/**
 * Every piece of interface copy, in English and Italian.
 * Project-specific text (summaries, disciplines) lives in src/data/projects.ts.
 * Text written in /admin (project intros and roles) is shown as written.
 */
const en = {
  langName: "English",
  switchTo: "Passa all'italiano",

  nav: {
    home: "Home",
    work: "Work",
    about: "About",
    contact: "Contact",
    role: "Sports Designer",
    cta: "Start a project",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    homeLabel: "IMCICC, home",
    mainLabel: "Main",
    mobileLabel: "Mobile",
  },
  available: "Available for freelance projects",
  emailMe: "Email me",
  viewProject: (title: string) => `${title}, view project`,
  tile: {
    open: "View project",
    openNda: "View details",
    images: (n: number) => (n === 1 ? "1 image" : `${n} images`),
    nda: "Under NDA",
  },
  and: "and",

  home: {
    title: "IMCICC | Francesco Carpino, freelance sports designer",
    description:
      "Francesco Carpino (IMCICC) is a freelance sports designer in Milan, working on art direction, visual systems and content for clubs, competitions and brands.",
    ogDescription:
      "Art direction, visual systems and content for football, cycling and the brands around them.",
    headline: "Sports design for clubs, competitions and the culture around them.",
    lead: "I'm Francesco Carpino, a freelance sports designer. I work on art direction, visual systems and content for clubs, competitions and the brands around them, from the first idea to the finished series.",
    seeWork: "See selected work",
    portraitAlt: "Portrait of Francesco Carpino",
    portraitCaption: "Francesco Carpino, Milan",
    wallLabel: "Poster wall",
    wallAlt:
      "A wall of Francesco's sports posters, including player milestones, Giro d'Italia stage graphics and club visuals.",
    wallCaption: "A selection of posters from the archive.",
    wallSwipe: " Swipe to see more.",
    clients: "Clients and collaborations",
    selectedWork: "Selected work",
    allProjects: (n: number) => `All ${n} projects`,
    whatIDo: "What I do",
    whatIDoIntro:
      "The thinking matters as much as the making: understanding the brief, choosing a direction and turning it into work that holds together.",
    seenIn: "Seen in",
  },

  facts: {
    client: "Client",
    sport: "Sport",
    discipline: "Discipline",
    format: "Format",
    role: "Role",
    year: "Year",
  },

  work: {
    title: "Work | IMCICC, Francesco Carpino",
    description:
      "Sports design projects for Giro d'Italia, FIRS1 Sports, Aston Villa, CD Arenteiro, CD Córgomo and AC Milan: art direction, visual systems and player storytelling.",
    ogDescription: "Art direction, visual systems and content for clubs and competitions.",
    heading: "Work",
    intro:
      "Six projects across football and cycling, for clubs, a Grand Tour and FIRS1 Sports. Open any of them to see the full set of graphics.",
  },

  project: {
    breadcrumb: "Work",
    imagesLabel: "Project images",
    loading: "Loading images",
    ndaNote: "This work is covered by a confidentiality agreement, so it isn't published here.",
    ndaTitle: "Available to view privately.",
    ndaBody: (title: string) =>
      `Some client work can't be shown publicly. If you're considering working together, I'm happy to walk you through the ${title} work on a call or share it directly.`,
    ndaCta: "Request a private viewing",
    ndaSubject: (title: string) => `${title} work: private viewing`,
    otherWork: "See other work",
    emptyFailed: "The images for this project couldn't be loaded. Refresh the page to try again.",
    emptyPending: "Images for this project are being prepared.",
    nextLabel: "Next project",
    next: (n: number, total: number) => `Next project, ${n} of ${total}`,
    of: "of",
    viewFull: (title: string, n: number, total: number) =>
      `View ${title}, image ${n} of ${total}, full size`,
    imageAlt: (title: string, n: number, total: number) => `${title}, image ${n} of ${total}`,
    fullView: (title: string) => `${title}, full-size view`,
    close: "Close",
    previous: "Previous",
    nextImage: "Next",
    underNda: "Under NDA",
    crest: (client: string) => `${client} crest`,
  },

  about: {
    title: "About | IMCICC, Francesco Carpino",
    description:
      "Francesco Carpino is an Italian freelance sports designer based in Milan, working as IMCICC with clubs, competitions and brands.",
    ogDescription: "Italian freelance sports designer based in Milan, working as IMCICC.",
    heading: "About",
    lead: "I'm Francesco Carpino, an Italian sports designer based in Milan. I work independently under the name IMCICC.",
    body: [
      "Sport and design have always been my two constants, and my work sits where they meet. I help clubs, competitions and brands decide how they want to look and what they want to say, then design the visual systems and content that carry it.",
      "I've been working independently since 2020, with AC Milan, Aston Villa, Giro d'Italia and FIRS1 Sports, and with the Galician clubs CD Arenteiro and CD Córgomo.",
      "I want every piece to feel like it belongs to its club and its moment: built around the player, the story or the moment it was made for, rather than around a template.",
    ],
    portraitAlt: "Portrait of Francesco Carpino",
    portraitCaption: "Francesco Carpino, Milan",
    clients: "Clients and collaborations",
    ndaRow: "Under NDA, shared privately",
    howTitle: "How we can work together",
    howBody:
      "I work with in-house club and competition teams, and with agencies that need a sports specialist on a project. Based in Milan, on Central European Time, working remotely with clients across Europe.",
    ways: [
      { title: "Single Pieces", text: "A key poster, an announcement, a milestone graphic." },
      {
        title: "Ongoing Content",
        text: "Weekly graphics through a season, made to a consistent system.",
      },
      { title: "Series", text: "A set of pieces for a tournament, a race or a campaign." },
    ],
    specialisms: "Specialisms",
  },

  contact: {
    title: "Contact | IMCICC, Francesco Carpino",
    description:
      "Start a project with Francesco Carpino (IMCICC), freelance sports designer in Milan. Email, LinkedIn and Instagram.",
    ogDescription: "Start a project with Francesco Carpino, freelance sports designer in Milan.",
    heading: "Tell me about your project.",
    email: "Email",
    usefulTitle: "Useful to include",
    useful: [
      "Who it's for: the club, competition or brand",
      "What you need: a single piece, ongoing content or a series",
      "When you need it, and how often",
    ],
    elsewhere: "Elsewhere",
    location: "Milan, Italy (Central European Time)",
    clients: "Clients and collaborations",
  },

  footer: {
    ctaTitle: "Every project starts with a conversation.",
    ctaBody:
      "First I get to know your goals and the people you're speaking to. Then I set a visual direction and build it into a system, so every piece feels part of the same story.",
    steps: ["Brief", "Direction", "System"],
    getInTouch: "Get in touch",
    studio:
      "IMCICC is the studio name of Francesco Carpino, a freelance sports designer based in Milan, Italy.",
    elsewhere: "Elsewhere",
    backToTop: "Back to top",
  },

  copyEmail: { idle: "Copy email address", done: "Email copied" },

  notFound: {
    label: "Error 404",
    title: "This page has been substituted.",
    body: "The link may be old, or the page has moved. The work is still here.",
    seeWork: "See the work",
    home: "Go to the homepage",
  },
  error: {
    label: "Something went wrong",
    title: "This page didn't load.",
    before: "Try again, or write to ",
    after: " if it keeps happening.",
    retry: "Try again",
    home: "Go to the homepage",
  },
};

export type Copy = typeof en;

/**
 * Italian. Written for Italian clients and agencies, not translated word for word:
 * sentence case (Italian doesn't capitalise every word), and the English terms
 * the Italian creative industry actually uses (art direction, brief, key visual,
 * storytelling, brand, NDA) are kept in English.
 */
const it: Copy = {
  langName: "Italiano",
  switchTo: "Switch to English",

  nav: {
    home: "Home",
    work: "Progetti",
    about: "Chi sono",
    contact: "Contatti",
    role: "Sports Designer",
    cta: "Lavoriamo insieme",
    menu: "Menu",
    close: "Chiudi",
    skip: "Vai al contenuto",
    homeLabel: "IMCICC, home",
    mainLabel: "Navigazione principale",
    mobileLabel: "Menu",
  },
  available: "Disponibile per nuovi progetti",
  emailMe: "Scrivimi",
  viewProject: (title: string) => `${title}, guarda il progetto`,
  tile: {
    open: "Guarda il progetto",
    openNda: "Scopri di più",
    images: (n: number) => (n === 1 ? "1 immagine" : `${n} immagini`),
    nda: "Coperto da NDA",
  },
  and: "e",

  home: {
    title: "IMCICC | Francesco Carpino, sports designer freelance",
    description:
      "Francesco Carpino (IMCICC) è uno sports designer freelance di base a Milano. Si occupa di art direction, sistemi visivi e contenuti per club, competizioni e brand.",
    ogDescription:
      "Art direction, sistemi visivi e contenuti per il calcio, il ciclismo e i brand che ruotano intorno allo sport.",
    headline: "Design per lo sport: club, competizioni e la cultura che li circonda.",
    lead: "Sono Francesco Carpino, sports designer freelance. Curo art direction, sistemi visivi e contenuti per club, competizioni e brand dello sport, dall'idea iniziale alla serie completa.",
    seeWork: "Guarda i progetti",
    portraitAlt: "Ritratto di Francesco Carpino",
    portraitCaption: "Francesco Carpino, Milano",
    wallLabel: "Selezione di poster",
    wallAlt:
      "Una selezione di poster sportivi di Francesco: traguardi dei giocatori, grafiche di tappa del Giro d'Italia e contenuti per i club.",
    wallCaption: "Una selezione di poster dall'archivio.",
    wallSwipe: " Scorri per vederne altri.",
    clients: "Clienti e collaborazioni",
    selectedWork: "Progetti selezionati",
    allProjects: (n: number) => `Vedi tutti i progetti (${n})`,
    whatIDo: "Cosa faccio",
    whatIDoIntro:
      "Il ragionamento conta quanto l'esecuzione: capire il brief, scegliere una direzione e tradurla in un lavoro coerente dall'inizio alla fine.",
    seenIn: "Ad esempio in",
  },

  facts: {
    client: "Cliente",
    sport: "Sport",
    discipline: "Ambito",
    format: "Formato",
    role: "Ruolo",
    year: "Anno",
  },

  work: {
    title: "Progetti | IMCICC, Francesco Carpino",
    description:
      "Progetti di sports design per Giro d'Italia, FIRS1 Sports, Aston Villa, CD Arenteiro, CD Córgomo e AC Milan: art direction, sistemi visivi e storytelling degli atleti.",
    ogDescription: "Art direction, sistemi visivi e contenuti per club e competizioni.",
    heading: "Progetti",
    intro:
      "Sei progetti tra calcio e ciclismo: club, il Giro d'Italia e FIRS1 Sports. Apri un progetto per vedere tutte le grafiche.",
  },

  project: {
    breadcrumb: "Progetti",
    imagesLabel: "Immagini del progetto",
    loading: "Caricamento delle immagini",
    ndaNote: "Questo lavoro è coperto da un accordo di riservatezza e non può essere pubblicato.",
    ndaTitle: "Disponibile in privato.",
    ndaBody: (title: string) =>
      `Alcuni lavori per i clienti non possono essere mostrati pubblicamente. Se stai valutando una collaborazione, posso mostrarti il lavoro per ${title} durante una call o inviartelo direttamente.`,
    ndaCta: "Chiedi di vederlo",
    ndaSubject: (title: string) => `Richiesta di visione: progetto ${title}`,
    otherWork: "Guarda altri progetti",
    emptyFailed:
      "Non è stato possibile caricare le immagini di questo progetto. Ricarica la pagina per riprovare.",
    emptyPending: "Le immagini di questo progetto saranno disponibili a breve.",
    nextLabel: "Progetto successivo",
    next: (n: number, total: number) => `Progetto successivo, ${n} di ${total}`,
    of: "di",
    viewFull: (title: string, n: number, total: number) =>
      `Ingrandisci ${title}, immagine ${n} di ${total}`,
    imageAlt: (title: string, n: number, total: number) => `${title}, immagine ${n} di ${total}`,
    fullView: (title: string) => `${title}, immagine ingrandita`,
    close: "Chiudi",
    previous: "Precedente",
    nextImage: "Successiva",
    underNda: "Coperto da NDA",
    crest: (client: string) => `Stemma ${client}`,
  },

  about: {
    title: "Chi sono | IMCICC, Francesco Carpino",
    description:
      "Francesco Carpino è uno sports designer freelance di base a Milano. Con il nome IMCICC lavora per club, competizioni e brand.",
    ogDescription: "Sports designer freelance di base a Milano. Lavora con il nome IMCICC.",
    heading: "Chi sono",
    lead: "Sono Francesco Carpino, sports designer di base a Milano. Lavoro come freelance con il nome IMCICC.",
    body: [
      "Lo sport e il design sono sempre stati i miei due punti fermi, e il mio lavoro nasce dove si incontrano. Aiuto club, competizioni e brand a definire come vogliono presentarsi e cosa vogliono comunicare, poi progetto i sistemi visivi e i contenuti che lo raccontano.",
      "Lavoro come freelance dal 2020 con AC Milan, Aston Villa, Giro d'Italia e FIRS1 Sports, oltre che con i club galiziani CD Arenteiro e CD Córgomo.",
      "Voglio che ogni lavoro appartenga davvero al suo club e al suo momento: costruito intorno all'atleta, alla storia o all'occasione per cui nasce, non intorno a un template.",
    ],
    portraitAlt: "Ritratto di Francesco Carpino",
    portraitCaption: "Francesco Carpino, Milano",
    clients: "Clienti e collaborazioni",
    ndaRow: "Coperto da NDA, visibile su richiesta",
    howTitle: "Come possiamo lavorare insieme",
    howBody:
      "Collaboro con i team interni di club e competizioni e con le agenzie che cercano uno specialista dello sport. Lavoro da Milano, anche da remoto, con clienti in tutta Europa.",
    ways: [
      { title: "Progetti singoli", text: "Un poster, un annuncio, una grafica celebrativa." },
      {
        title: "Contenuti continuativi",
        text: "Grafiche settimanali per tutta la stagione, all'interno di un sistema coerente.",
      },
      { title: "Serie", text: "Un insieme di grafiche per un torneo, una corsa o una campagna." },
    ],
    specialisms: "Competenze",
  },

  contact: {
    title: "Contatti | IMCICC, Francesco Carpino",
    description:
      "Contatta Francesco Carpino (IMCICC), sports designer freelance di base a Milano: email, LinkedIn e Instagram.",
    ogDescription: "Contatta Francesco Carpino, sports designer freelance di base a Milano.",
    heading: "Parliamo del tuo progetto.",
    email: "Email",
    usefulTitle: "Cosa includere",
    useful: [
      "Per chi è: club, competizione o brand",
      "Di cosa hai bisogno: un progetto singolo, contenuti continuativi o una serie",
      "Tempistiche e frequenza",
    ],
    elsewhere: "Mi trovi anche su",
    location: "Milano, Italia (fuso orario CET)",
    clients: "Clienti e collaborazioni",
  },

  footer: {
    ctaTitle: "Ogni progetto inizia da una conversazione.",
    ctaBody:
      "Prima capisco i tuoi obiettivi e il pubblico a cui parli. Poi definisco una direzione visiva e la sviluppo in un sistema, così ogni contenuto racconta la stessa storia.",
    steps: ["Brief", "Direzione", "Sistema"],
    getInTouch: "Scrivimi",
    studio: "IMCICC è lo studio di Francesco Carpino, sports designer freelance di base a Milano.",
    elsewhere: "Mi trovi anche su",
    backToTop: "Torna su",
  },

  copyEmail: { idle: "Copia l'indirizzo email", done: "Indirizzo copiato" },

  notFound: {
    label: "Errore 404",
    title: "Questa pagina è finita in panchina.",
    body: "Il link potrebbe essere vecchio o la pagina è stata spostata. I progetti sono ancora qui.",
    seeWork: "Guarda i progetti",
    home: "Torna alla home",
  },
  error: {
    label: "Qualcosa è andato storto",
    title: "Questa pagina non si è caricata.",
    before: "Riprova, oppure scrivi a ",
    after: " se il problema continua.",
    retry: "Riprova",
    home: "Torna alla home",
  },
};

export const COPY = { en, it } as const;
