const acMilan = "https://assets-eu-01.kc-usercontent.com/1293c890-579f-01b7-8480-902cca7de55e/b1ac1760-542b-411f-b1d5-9c60e098ab04/Comunicato-Ufficiale-19-20-WebHP.png";
import giro from "@/assets/giro-new.png";
import giroStage01 from "@/assets/giro-stage-01.png";
import giroStage02 from "@/assets/giro-stage-02.png";
import giroStage03 from "@/assets/giro-stage-03.png";
import giroStage04 from "@/assets/giro-stage-04.png";
import giroStage05 from "@/assets/giro-stage-05.png";
import giroStage06 from "@/assets/giro-stage-06.png";
import firs1 from "@/assets/firs1_new.png";
import arenteiro from "@/assets/arenteiro-new.png";

export type Project = {
  slug: string;
  index: string;
  title: string;
  client: string;
  year: string;
  category: string;
  tags: string[];
  role: string;
  cover: string;
  gallery?: string[];
  aspect: "wide" | "tall" | "square" | "landscape";
  coverScale?: number;
  tagline: string;
  overview: string;
  direction: string;
  approach: string;
  outcome: string;
  closing: string;
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "ac-milan",
    index: "01",
    title: "AC Milan",
    client: "AC Milan",
    year: "2024",
    category: "Visual Design",
    tags: ["Sports", "Campaign", "Branding"],
    role: "Art Direction · Photography Direction · Brand System",
    cover: acMilan,
    aspect: "wide",
    tagline: "​Creation of digital & social AC Milan's brand assets.",
    accent: "Rossoneri",
    overview:
      "A campaign system designed for AC Milan's stadium-day rituals — translating a century of heritage into a stark, contemporary visual language that lives across kit reveals, matchday socials and physical print.",
    direction:
      "Crimson and graphite collapse into a single tonal field. Players are framed as monuments — shot in shadow, lit by a single sodium beam. Typography is set in heavy condensed display, treated like stadium signage.",
    approach:
      "We built a modular grid that flexes across vertical socials, broadcast bumpers and OOH posters without losing intensity. Every asset shares the same noise, the same grain density, the same kerning rhythm.",
    outcome:
      "Twelve campaign films, a fifty-page season brand book, and a matchday template kit shipped to the in-house team. Engagement on launch posts +212% vs. prior season.",
    closing:
      "The work doesn't ask for attention — it earns it through restraint.",
  },
  {
    slug: "aston-villa",
    index: "02",
    title: "Aston Villa",
    client: "Aston Villa FC",
    year: "2023",
    category: "Matchday Design",
    tags: ["Sports", "Branding", "Social"],
    role: "Visual Identity · Social System · Editorial",
    cover: "/AVFC.png",
    aspect: "tall",
    coverScale: 1.15,
    tagline: "Creation of a Premier League matchday digital poster vs Brighton.",
    accent: "Claret & Fire",
    overview:
      "Aston Villa's return to European football needed a visual posture as confident as the squad. We rebuilt the club's digital identity from the typography up.",
    direction:
      "Claret as ink, not as paint. Cool tungsten highlights on warm jersey weave. A serif accent used only where it earns its place — the rest carved in heavy display.",
    approach:
      "A typographic system rooted in matchday tradition but engineered for vertical-first delivery. Templated lineup reveals, goal cards and post-match recaps.",
    outcome:
      "Adopted across all first-team channels for the 23/24 European campaign. Reached an average of 4.1M weekly impressions during the group stage.",
    closing: "Heritage held its shape. The voice got sharper.",
  },
  {
    slug: "giro-ditalia",
    index: "03",
    title: "Giro d'Italia",
    client: "\n",
    year: "2024",
    category: "Editorial",
    tags: ["Sports", "Editorial", "Campaign"],
    role: "Art Direction · Editorial Design · Motion",
    cover: giro,
    gallery: [giroStage01, giroStage02, giroStage03, giroStage04, giroStage05, giroStage06],
    aspect: "tall",
    tagline: "Creation of 25 Giro d'Italia contextualized graphics, stage by stage.",
    accent: "Rosa",
    overview:
      "A pre-race editorial concept treating the Giro as cinema: dust, golden light, mountain silhouettes. Built for print, social and a generative title sequence.",
    direction:
      "Pink reduced to a single accent — used only at peaks and finish lines. The rest of the palette lives in burnt amber, asphalt grey and dawn pink.",
    approach:
      "Long-form features paired with a typographic system inspired by 1970s Italian sports magazines. A live broadcast lower-third kit shipped alongside the print volume.",
    outcome:
      "Distributed across nine media partners. Featured in WePresent and AIGA's annual editorial roundup.",
    closing: "Twenty-one stages. One language.",
  },
  {
    slug: "first",
    index: "04",
    title: "FIRS1",
    client: "FIRS1 Sports",
    year: "2023",
    category: "Player Oriented Matchday Visuals",
    tags: ["Sports", "Branding"],
    role: "Brand System · Livery Concept · Digital",
    cover: firs1,
    aspect: "square",
    tagline: "Creation of weekly matchday & celebrative graphics across UCL, EL and FIFA World Cup.",
    accent: "Pace",
    overview:
      "FIRS1 needed an identity that could survive both the paddock and the press release. We designed a system built around speed, restraint and engineered precision.",
    direction:
      "Matte black bodywork, a single orange chevron, technical mono numerals. Nothing decorative — every mark earns its surface area.",
    approach:
      "Wordmark, livery scheme, driver kit and a race-weekend content template. Built on a modular grid that flexes from helmet decals to broadcast graphics.",
    outcome:
      "Rolled out across two seasons of the championship. Adopted by partner teams as their internal templating standard.",
    closing: "Pace, made visible.",
  },
  {
    slug: "arenteiro",
    index: "05",
    title: "CD Arenteiro",
    client: "CD Arenteiro",
    year: "2022",
    category: "Matchday & Editorial Visuals",
    tags: ["Sports", "Branding", "Editorial"],
    role: "Brand Refresh · Crest System · Print",
    cover: arenteiro,
    aspect: "landscape",
    tagline: "Matchday & Editorial visuals creation for a Galician Club.",
    accent: "Heritage",
    overview:
      "Arenteiro's ascent through Spanish football needed a visual identity that could carry the weight of its history without freezing in it. We rebuilt the brand around a single artefact: the crest.",
    direction:
      "Cream paper, scorched ink, weathered orange. A heritage palette refused the temptation to modernise into anonymity.",
    approach:
      "Crest refresh, supporter merchandise, matchday programme, season campaign film. Every artefact built to feel printed — even on screen.",
    outcome:
      "Sold out the inaugural supporter drop in 48 hours. Featured in Mundial's annual heritage issue.",
    closing: "Built to outlast the season.",
  },
  {
    slug: "corgomo",
    index: "06",
    title: "CD Córgomo",
    client: "CD Córgomo",
    year: "2023",
    category: "Matchday & Editorial Visuals\n",
    tags: ["Sports", "Editorial", "Branding"],
    role: "Art Direction · Photography · Visual System",
    cover: "/corgomo.png",
    aspect: "landscape",
    tagline: "Matchday & Editorial visuals for a little big club. ",
    accent: "Sodium Nights",
    overview:
      "CD Córgomo — a village side from the Galician hinterland — wanted a visual identity that took its players as seriously as the Premier League takes its own.",
    direction:
      "Sodium floodlights against twilight blue. Players framed as silhouettes. A grain density that refuses digital cleanliness.",
    approach:
      "A photographic system, a typographic kit, and a programme of matchday posters distributed across the village. Built to feel both intimate and monumental.",
    outcome:
      "Picked up by It's Nice That, Eurosport and the regional broadcaster. Doubled season-ticket interest year over year.",
    closing: "Same pitch. Bigger language.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getAdjacentProjects = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
};