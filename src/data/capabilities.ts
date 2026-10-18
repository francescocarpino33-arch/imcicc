/**
 * What Francesco does, framed around the thinking as well as the making.
 * Each capability must point to projects on the site that show it.
 */
type Capability = {
  title: string;
  description: string;
  seenIn: string[];
  it: { title: string; description: string };
};

export const CAPABILITIES: Capability[] = [
  {
    title: "Art Direction",
    description:
      "Setting the visual direction before anything is designed: the tone, the references and how the story should be told.",
    seenIn: ["giro-ditalia", "first"],
    it: {
      title: "Art Direction",
      description:
        "Definire la direzione visiva prima di disegnare: il tono, i riferimenti e il modo di raccontare la storia.",
    },
  },
  {
    title: "Visual Systems and Series",
    description:
      "A consistent visual language that holds together across dozens of pieces, from a weekly series to a whole race.",
    seenIn: ["giro-ditalia", "first", "arenteiro"],
    it: {
      title: "Sistemi visivi e serie",
      description:
        "Un linguaggio visivo coerente che tiene insieme decine di contenuti, da una serie settimanale a un'intera corsa.",
    },
  },
  {
    title: "Player Storytelling",
    description:
      "Visuals built around athletes and the moments that define them: milestones, performances and celebrations.",
    seenIn: ["first"],
    it: {
      title: "Storytelling degli atleti",
      description:
        "Contenuti costruiti intorno agli atleti e ai momenti che li definiscono: traguardi, prestazioni, celebrazioni.",
    },
  },
  {
    title: "Social and Digital Content",
    description:
      "Content for club and competition channels, designed for the formats people actually see and share.",
    seenIn: ["ac-milan", "aston-villa", "arenteiro", "corgomo"],
    it: {
      title: "Contenuti social e digitali",
      description:
        "Contenuti per i canali di club e competizioni, pensati per i formati che le persone vedono e condividono davvero.",
    },
  },
];

export function capabilityText(c: Capability, lang: "en" | "it") {
  return lang === "it" ? c.it : { title: c.title, description: c.description };
}
