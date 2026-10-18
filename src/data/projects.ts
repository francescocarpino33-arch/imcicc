import acMilan from "@/assets/ac-milan-cover.webp";
import giro from "@/assets/giro-new.webp";
import firs1 from "@/assets/firs1_new.webp";
import arenteiro from "@/assets/arenteiro-new.webp";

/**
 * Static project index.
 *
 * Everything shown publicly here comes from Francesco's own descriptions of
 * each project. Images, role, year and intro for the project pages live in
 * Supabase (`projects` table + `project-images` bucket) and are managed
 * from /admin — the first image of a project doubles as its cover.
 *
 * `fallbackCover` is the crest/logo plate shown only while a project has no
 * images uploaded yet.
 *
 * Order = order on the site. Projects with visible work come first; AC Milan
 * is under NDA and sits last so nobody's first click lands on a locked page.
 */
export type Project = {
  slug: string;
  title: string;
  client: string;
  sport: "Football" | "Cycling";
  discipline: string;
  format: string;
  summary: string;
  fallbackCover: string;
  /** Background behind the fallback crest so the plate fills its frame. */
  fallbackTone: string;
  /** Scale the fallback crest inside its plate. */
  fallbackScale?: number;
  featured?: boolean;
  nda?: boolean;
  /** Italian version of the visible text. */
  it: { discipline: string; format: string; summary: string };
};

/** Project text in the requested language. */
export function projectText(p: Project, lang: "en" | "it") {
  if (lang === "it") {
    return { ...p.it, sport: p.sport === "Football" ? "Calcio" : "Ciclismo" };
  }
  return { discipline: p.discipline, format: p.format, summary: p.summary, sport: p.sport };
}

export const projects: Project[] = [
  {
    slug: "giro-ditalia",
    title: "Giro d'Italia",
    client: "Giro d'Italia",
    sport: "Cycling",
    discipline: "Editorial Graphics",
    format: "Series of 25 graphics",
    summary:
      "A series of 25 graphics that follows the race stage by stage, each one built around that day's context.",
    fallbackCover: giro,
    fallbackTone: "#ff266e",
    it: {
      discipline: "Grafiche editoriali",
      format: "Serie di 25 grafiche",
      summary:
        "Una serie di 25 grafiche che accompagna la corsa tappa per tappa, ognuna costruita sul contesto di quella giornata.",
    },
    featured: true,
  },
  {
    slug: "first",
    title: "FIRS1",
    client: "FIRS1 Sports",
    sport: "Football",
    discipline: "Player Storytelling",
    format: "Weekly series",
    summary:
      "A weekly content series built around players and the moments that define them, across the Champions League, Europa League and FIFA World Cup.",
    fallbackCover: firs1,
    fallbackTone: "#151515",
    it: {
      discipline: "Storytelling degli atleti",
      format: "Serie settimanale",
      summary:
        "Una serie settimanale di contenuti costruita intorno ai giocatori e ai momenti che li definiscono, tra Champions League, Europa League e Mondiali FIFA.",
    },
    featured: true,
  },
  {
    slug: "aston-villa",
    title: "Aston Villa",
    client: "Aston Villa FC",
    sport: "Football",
    discipline: "Key Visual",
    format: "Single poster",
    summary: "A Premier League key visual for Aston Villa's game against Brighton.",
    fallbackCover: "/AVFC.webp",
    fallbackTone: "#490024",
    fallbackScale: 1.15,
    it: {
      discipline: "Key visual",
      format: "Poster singolo",
      summary: "Il key visual per la partita di Premier League tra Aston Villa e Brighton.",
    },
    featured: true,
  },
  {
    slug: "arenteiro",
    title: "CD Arenteiro",
    client: "CD Arenteiro",
    sport: "Football",
    discipline: "Editorial and Club Content",
    format: "Series",
    summary:
      "Editorial and club content for a Galician football club, designed as one consistent series.",
    fallbackCover: arenteiro,
    fallbackTone: "#1f8d44",
    it: {
      discipline: "Contenuti editoriali",
      format: "Serie",
      summary:
        "Contenuti editoriali per un club di calcio galiziano, pensati come un'unica serie coerente.",
    },
    featured: true,
  },
  {
    slug: "corgomo",
    title: "CD Córgomo",
    client: "CD Córgomo",
    sport: "Football",
    discipline: "Editorial and Club Content",
    format: "Series",
    summary: "Editorial and club content for a little big club.",
    fallbackCover: "/corgomo.webp",
    fallbackTone: "#30b15f",
    it: {
      discipline: "Contenuti editoriali",
      format: "Serie",
      summary: "Contenuti editoriali per un piccolo grande club.",
    },
  },
  {
    slug: "ac-milan",
    title: "AC Milan",
    client: "AC Milan",
    sport: "Football",
    discipline: "Digital and Social Design",
    format: "Brand assets",
    summary: "Digital and social brand assets for the club.",
    fallbackCover: acMilan,
    fallbackTone: "#000000",
    it: {
      discipline: "Design digitale e social",
      format: "Materiali di brand",
      summary: "Materiali digitali e social per il club.",
    },
    nda: true,
  },
];

/** Every client named on the site, in the order they're listed. */
export const CLIENT_NAMES = [
  "AC Milan",
  "Aston Villa",
  "Giro d'Italia",
  "FIRS1 Sports",
  "CD Arenteiro",
  "CD Córgomo",
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getAdjacentProjects = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
};

export const CONTACT = {
  email: "francesco.carpino33@gmail.com",
  linkedin: "https://www.linkedin.com/in/francesco-carpino-b4852a1a4/",
  instagram: "https://www.instagram.com/imcicc/",
};
