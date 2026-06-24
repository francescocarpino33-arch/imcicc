import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, fadeUpContainer } from "@/lib/motion";
import logoAcMilan from "@/assets/clients/ac-milan.png";
import logoAstonVilla from "@/assets/clients/aston-villa.webp";
import logoGiro from "@/assets/clients/giro.webp";
import logoFirs1 from "@/assets/clients/firs1.webp";
import logoArenteiro from "@/assets/clients/arenteiro.webp";
import logoCorgomo from "@/assets/clients/corgomo.webp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — IMCICC" },
      { name: "description", content: "Let's work together. Visual systems, sports identities and campaigns by Francesco Carpino." },
      { property: "og:title", content: "Contact — IMCICC" },
      { property: "og:description", content: "Let's work together." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const CLIENTS = [
  { name: "ac milan", logo: logoAcMilan, slug: "ac-milan" },
  { name: "aston villa", logo: logoAstonVilla, slug: "aston-villa" },
  { name: "giro d'italia", logo: logoGiro, slug: "giro-ditalia" },
  { name: "firs1", logo: logoFirs1, slug: "first" },
  { name: "arenteiro", logo: logoArenteiro, slug: "arenteiro" },
  { name: "còrgomo", logo: logoCorgomo, slug: "corgomo" },
];

const headlineStyle = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(8vw, 11vw, 150px)",
  fontWeight: 300,
  color: "#f5a623",
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
  display: "block" as const,
};

const labelStyle = {
  fontSize: 16,
  letterSpacing: "-0.02em",
  color: "rgba(255,255,255,0.4)",
  marginBottom: 20,
};

function ContactPage() {
  const reduced = useReducedMotion();
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ paddingBottom: 80, letterSpacing: "-0.02em" }}
    >
      {/* Headline */}
      <motion.div
        initial={reduced ? "show" : "hidden"}
        animate="show"
        variants={fadeUpContainer}
        style={{ paddingTop: 140, paddingLeft: 48 }}
      >
        <motion.span variants={fadeUp} style={headlineStyle}>Let's work</motion.span>
        <motion.span variants={fadeUp} style={headlineStyle}>together.</motion.span>
      </motion.div>

      {/* Two columns */}
      <motion.div
        initial={reduced ? "show" : "hidden"}
        animate="show"
        variants={fadeUpContainer}
        transition={{ delayChildren: reduced ? 0 : 0.3 }}
        className="flex flex-col md:flex-row gap-12 md:gap-24"
        style={{ marginTop: 64, padding: "0 48px" }}
      >
        {/* Left column */}
        <div>
          <motion.p variants={fadeUp} style={labelStyle}>Drop me a line:</motion.p>
          <ul
            style={{
              fontSize: 22,
              fontWeight: 300,
              color: "rgba(245,166,35,0.85)",
              lineHeight: 1.8,
            }}
          >
            <motion.li variants={fadeUp}>
              <a className="glow-hover hover:text-primary-glow" href="mailto:francesco.carpino33@gmail.com">
                Mail
              </a>
            </motion.li>
            <motion.li variants={fadeUp}>
              <a className="glow-hover hover:text-primary-glow" href="https://www.linkedin.com/in/francesco-carpino-b4852a1a4/">
                Linkedin
              </a>
            </motion.li>
            <motion.li variants={fadeUp}>
              <a className="glow-hover hover:text-primary-glow" href="https://www.instagram.com/imcicc">
                Instagram
              </a>
            </motion.li>
          </ul>
        </div>

        {/* Right column */}
        <div>
          <motion.p variants={fadeUp} style={labelStyle}>Clients & collaborations:</motion.p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "32px 40px" }}>
            {CLIENTS.map((c) => (
              <motion.div key={c.slug} variants={fadeUp} style={{ display: "inline-flex" }}>
                <Link to="/work/$slug" params={{ slug: c.slug }} className="contact-logo-link" aria-label={c.name}>
                  <img
                    src={c.logo}
                    alt={c.name}
                    loading="lazy"
                    decoding="async"
                    className="contact-logo-img"
                    style={{ maxHeight: 56, maxWidth: 100, objectFit: "contain" }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
