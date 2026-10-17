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
};

export const projects: Project[] = [
  {
    slug: "giro-ditalia",
    title: "Giro d'Italia",
    client: "Giro d'Italia",
    sport: "Cycling",
    discipline: "Editorial graphics",
    format: "Series of 25 graphics",
    summary:
      "A series of 25 graphics that follows the race stage by stage, each one built around that day's context.",
    fallbackCover: giro,
    fallbackTone: "#ff266e",
    featured: true,
  },
  {
    slug: "first",
    title: "FIRS1",
    client: "FIRS1 Sports",
    sport: "Football",
    discipline: "Player-focused matchday visuals",
    format: "Weekly series",
    summary:
      "Weekly matchday and celebration graphics built around players, across the Champions League, Europa League and FIFA World Cup.",
    fallbackCover: firs1,
    fallbackTone: "#151515",
    featured: true,
  },
  {
    slug: "aston-villa",
    title: "Aston Villa",
    client: "Aston Villa FC",
    sport: "Football",
    discipline: "Matchday design",
    format: "Matchday poster",
    summary: "A Premier League matchday poster for Aston Villa against Brighton.",
    fallbackCover: "/AVFC.webp",
    fallbackTone: "#490024",
    fallbackScale: 1.15,
    featured: true,
  },
  {
    slug: "arenteiro",
    title: "CD Arenteiro",
    client: "CD Arenteiro",
    sport: "Football",
    discipline: "Matchday and editorial visuals",
    format: "Series",
    summary: "Matchday and editorial visuals for a Galician club.",
    fallbackCover: arenteiro,
    fallbackTone: "#1f8d44",
    featured: true,
  },
  {
    slug: "corgomo",
    title: "CD Córgomo",
    client: "CD Córgomo",
    sport: "Football",
    discipline: "Matchday and editorial visuals",
    format: "Series",
    summary: "Matchday and editorial visuals for a little big club.",
    fallbackCover: "/corgomo.webp",
    fallbackTone: "#30b15f",
  },
  {
    slug: "ac-milan",
    title: "AC Milan",
    client: "AC Milan",
    sport: "Football",
    discipline: "Digital and social design",
    format: "Brand assets",
    summary:
      "Digital and social brand assets for the club. The work is under NDA and can be shared privately.",
    fallbackCover: acMilan,
    fallbackTone: "#000000",
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
