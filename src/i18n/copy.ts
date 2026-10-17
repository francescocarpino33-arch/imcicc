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

const it: Copy = {
  langName: "Italiano",
  switchTo: "Switch to English",

  nav: {
    home: "Home",
    work: "Lavori",
    about: "Chi sono",
    contact: "Contatti",
    role: "Sports Designer",
    cta: "Inizia un progetto",
    menu: "Menu",
    close: "Chiudi",
    skip: "Vai al contenuto",
    homeLabel: "IMCICC, home",
    mainLabel: "Principale",
    mobileLabel: "Menu mobile",
  },
  available: "Disponibile per progetti freelance",
  emailMe: "Scrivimi",
  viewProject: (title: string) => `${title}, apri il progetto`,
  and: "e",

  home: {
    title: "IMCICC | Francesco Carpino, sports designer freelance",
    description:
      "Francesco Carpino (IMCICC) è uno sports designer freelance a Milano: art direction, sistemi visivi e contenuti per club, competizioni e brand.",
    ogDescription:
      "Art direction, sistemi visivi e contenuti per il calcio, il ciclismo e i brand che li circondano.",
    headline: "Design sportivo per club, competizioni e la cultura che li circonda.",
    lead: "Sono Francesco Carpino, sports designer freelance. Mi occupo di art direction, sistemi visivi e contenuti per club, competizioni e brand dello sport, dalla prima idea alla serie completa.",
    seeWork: "Guarda i lavori",
    portraitAlt: "Ritratto di Francesco Carpino",
    portraitCaption: "Francesco Carpino, Milano",
    wallLabel: "Muro di poster",
    wallAlt:
      "Un muro di poster sportivi di Francesco: traguardi di giocatori, grafiche di tappa del Giro d'Italia e visual per club.",
    wallCaption: "Una selezione di poster dall'archivio.",
    wallSwipe: " Scorri per vederne altri.",
    clients: "Clienti e collaborazioni",
    selectedWork: "Lavori selezionati",
    allProjects: (n: number) => `Tutti i ${n} progetti`,
    whatIDo: "Cosa faccio",
    whatIDoIntro:
      "Il pensiero conta quanto la realizzazione: capire il brief, scegliere una direzione e trasformarla in un lavoro coerente.",
    seenIn: "Si vede in",
  },

  facts: {
    client: "Cliente",
    sport: "Sport",
    discipline: "Disciplina",
    format: "Formato",
    role: "Ruolo",
    year: "Anno",
  },

  work: {
    title: "Lavori | IMCICC, Francesco Carpino",
    description:
      "Progetti di sports design per Giro d'Italia, FIRS1 Sports, Aston Villa, CD Arenteiro, CD Córgomo e AC Milan: art direction, sistemi visivi e storytelling degli atleti.",
    ogDescription: "Art direction, sistemi visivi e contenuti per club e competizioni.",
    heading: "Lavori",
    intro:
      "Sei progetti tra calcio e ciclismo, per club, un Grande Giro e FIRS1 Sports. Aprine uno per vedere tutte le grafiche.",
  },

  project: {
    breadcrumb: "Lavori",
    imagesLabel: "Immagini del progetto",
    loading: "Caricamento delle immagini",
    ndaNote: "Questo lavoro è coperto da un accordo di riservatezza, quindi non è pubblicato qui.",
    ndaTitle: "Visibile su richiesta.",
    ndaBody: (title: string) =>
      `Alcuni lavori per i clienti non possono essere mostrati pubblicamente. Se stai valutando una collaborazione, ti mostro volentieri il lavoro per ${title} in una call o te lo invio direttamente.`,
    ndaCta: "Richiedi una visione privata",
    ndaSubject: (title: string) => `Lavoro ${title}: visione privata`,
    otherWork: "Guarda altri lavori",
    emptyFailed:
      "Non è stato possibile caricare le immagini di questo progetto. Ricarica la pagina per riprovare.",
    emptyPending: "Le immagini di questo progetto sono in preparazione.",
    nextLabel: "Progetto successivo",
    next: (n: number, total: number) => `Progetto successivo, ${n} di ${total}`,
    of: "di",
    viewFull: (title: string, n: number, total: number) =>
      `Apri ${title}, immagine ${n} di ${total}, a dimensione piena`,
    imageAlt: (title: string, n: number, total: number) => `${title}, immagine ${n} di ${total}`,
    fullView: (title: string) => `${title}, vista a dimensione piena`,
    close: "Chiudi",
    previous: "Precedente",
    nextImage: "Successiva",
    underNda: "Sotto NDA",
    crest: (client: string) => `Stemma ${client}`,
  },

  about: {
    title: "Chi sono | IMCICC, Francesco Carpino",
    description:
      "Francesco Carpino è uno sports designer freelance italiano con base a Milano, che lavora come IMCICC con club, competizioni e brand.",
    ogDescription: "Sports designer freelance italiano con base a Milano, lavora come IMCICC.",
    heading: "Chi sono",
    lead: "Sono Francesco Carpino, sports designer italiano con base a Milano. Lavoro come freelance con il nome IMCICC.",
    body: [
      "Sport e design sono sempre state le mie due costanti, e il mio lavoro nasce dove si incontrano. Aiuto club, competizioni e brand a decidere come vogliono apparire e cosa vogliono dire, poi progetto i sistemi visivi e i contenuti che lo comunicano.",
      "Lavoro come freelance dal 2020, con AC Milan, Aston Villa, Giro d'Italia e FIRS1 Sports, e con i club galiziani CD Arenteiro e CD Córgomo.",
      "Voglio che ogni lavoro sembri appartenere al suo club e al suo momento: costruito attorno all'atleta, alla storia o al momento per cui è nato, non attorno a un template.",
    ],
    portraitAlt: "Ritratto di Francesco Carpino",
    portraitCaption: "Francesco Carpino, Milano",
    clients: "Clienti e collaborazioni",
    ndaRow: "Sotto NDA, visibile in privato",
    howTitle: "Come possiamo lavorare insieme",
    howBody:
      "Lavoro con i team interni di club e competizioni, e con le agenzie che cercano uno specialista dello sport per un progetto. Ho base a Milano e lavoro da remoto con clienti in tutta Europa.",
    ways: [
      {
        title: "Lavori Singoli",
        text: "Un poster chiave, un annuncio, una grafica per un traguardo.",
      },
      {
        title: "Contenuti Continuativi",
        text: "Grafiche settimanali per tutta la stagione, costruite su un sistema coerente.",
      },
      { title: "Serie", text: "Un insieme di lavori per un torneo, una corsa o una campagna." },
    ],
    specialisms: "Specializzazioni",
  },

  contact: {
    title: "Contatti | IMCICC, Francesco Carpino",
    description:
      "Inizia un progetto con Francesco Carpino (IMCICC), sports designer freelance a Milano. Email, LinkedIn e Instagram.",
    ogDescription: "Inizia un progetto con Francesco Carpino, sports designer freelance a Milano.",
    heading: "Raccontami il tuo progetto.",
    email: "Email",
    usefulTitle: "Cosa è utile includere",
    useful: [
      "Per chi è: il club, la competizione o il brand",
      "Di cosa hai bisogno: un lavoro singolo, contenuti continuativi o una serie",
      "Quando ti serve, e con che frequenza",
    ],
    elsewhere: "Altri contatti",
    location: "Milano, Italia (ora dell'Europa centrale)",
    clients: "Clienti e collaborazioni",
  },

  footer: {
    ctaTitle: "Ogni progetto inizia da una conversazione.",
    ctaBody:
      "Prima capisco i tuoi obiettivi e le persone a cui ti rivolgi. Poi definisco una direzione visiva e la trasformo in un sistema, così ogni lavoro fa parte della stessa storia.",
    steps: ["Brief", "Direzione", "Sistema"],
    getInTouch: "Contattami",
    studio:
      "IMCICC è il nome con cui lavora Francesco Carpino, sports designer freelance con base a Milano.",
    elsewhere: "Altri contatti",
    backToTop: "Torna su",
  },

  copyEmail: { idle: "Copia l'indirizzo email", done: "Email copiata" },

  notFound: {
    label: "Errore 404",
    title: "Questa pagina è stata sostituita.",
    body: "Il link potrebbe essere vecchio, oppure la pagina è stata spostata. I lavori sono ancora qui.",
    seeWork: "Guarda i lavori",
    home: "Vai alla home",
  },
  error: {
    label: "Qualcosa è andato storto",
    title: "Questa pagina non si è caricata.",
    before: "Riprova, oppure scrivi a ",
    after: " se continua a succedere.",
    retry: "Riprova",
    home: "Vai alla home",
  },
};

export const COPY = { en, it } as const;
