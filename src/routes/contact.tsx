import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import logoAcMilan from "@/assets/clients/ac-milan.png";
import logoAstonVilla from "@/assets/clients/aston-villa.png";
import logoGiro from "@/assets/clients/giro.png";
import logoFirs1 from "@/assets/clients/firs1.png";
import logoArenteiro from "@/assets/clients/arenteiro.png";
import logoCorgomo from "@/assets/clients/corgomo.png";

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
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ paddingBottom: 80, letterSpacing: "-0.02em" }}
    >
      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ paddingTop: 140, paddingLeft: 48 }}
      >
        <span style={headlineStyle}>Let's work</span>
        <span style={headlineStyle}>together.</span>
      </motion.div>

      {/* Two columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="flex flex-col md:flex-row gap-12 md:gap-24"
        style={{ marginTop: 64, padding: "0 48px" }}
      >
        {/* Left column */}
        <div>
          <p style={labelStyle}>Drop me a line:</p>
          <ul
            style={{
              fontSize: 22,
              fontWeight: 300,
              color: "rgba(245,166,35,0.85)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <a className="glow-hover hover:text-primary-glow" href="mailto:francesco.carpino33@gmail.com">
                Mail
              </a>
            </li>
            <li>
              <a className="glow-hover hover:text-primary-glow" href="https://www.linkedin.com/in/francescocarpino">
                Linkedin
              </a>
            </li>
            <li>
              <a className="glow-hover hover:text-primary-glow" href="https://www.instagram.com/imcicc">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Right column */}
        <div>
          <p style={labelStyle}>Clients & collaborations:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "32px 40px" }}>
            {CLIENTS.map((c) => (
              <Link key={c.slug} to="/work/$slug" params={{ slug: c.slug }} className="contact-logo-link" aria-label={c.name}>
                <img
                  src={c.logo}
                  alt={c.name}
                  loading="lazy"
                  className="contact-logo-img"
                  style={{ maxHeight: 56, maxWidth: 100, objectFit: "contain" }}
                />
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
