import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, fadeUpContainer } from "@/lib/motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — IMCICC" },
      { name: "description", content: "Hi! I'm Francesco and I'm a Sports Visual Designer. I work in the sports industry since I was 20. I've always tried to combine my two big passions: sports & design." },
      { property: "og:title", content: "About — IMCICC" },
      { property: "og:description", content: "Hi! I'm Francesco and I'm a Sports Visual Designer. I had the big pleasure to work with big brands such as AC Milan, Aston Villa and Giro d'Italia." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const reduced = useReducedMotion();
  return (
    <div className="pt-20 px-6 md:px-12" style={{ paddingBottom: 30 }}>
      {/* Intro */}
      <motion.section
        className="grid md:grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-20"
        initial={reduced ? "show" : "hidden"}
        animate="show"
        variants={fadeUpContainer}
      >
        <div className="md:col-span-7">
          <motion.h1
            variants={fadeUp}
            className="font-display font-light tracking-[-0.03em] leading-[0.85]"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            About Me
          </motion.h1>
          <motion.div
            variants={fadeUp}
            className="mt-6 space-y-3 text-lg md:text-xl text-primary-glow/75 leading-relaxed max-w-2xl"
          >
            <p>
              Hi! I'm Francesco and I'm a Sports Visual Designer. I work in the sports industry since I was 20. I've always tried to combine my two big passions: sports & design. And I'm happy and lucky that it became my job.
            </p>
            <p>
              I had the big pleasure to work with big brands such as AC Milan, Aston Villa and Giro d'Italia.
            </p>
            <a
              href="mailto:francesco.carpino33@gmail.com"
              className="outline-cta-btn font-display"
              style={{ marginTop: 32 }}
            >
              drop me a line
            </a>
          </motion.div>
        </div>
        <div className="md:col-span-5">
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden"
            style={{ width: "100%", maxWidth: 420, aspectRatio: "3 / 4" }}
          >
            <img
              src="/imcicc.webp"
              alt="Francesco Carpino"
              loading="lazy"
              decoding="async"
              className="h-full w-full"
              style={{ objectFit: "cover", filter: "saturate(0.85) contrast(1.05)" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(26,10,5,0) 55%, rgba(26,10,5,0.6) 100%), linear-gradient(0deg, rgba(26,10,5,0) 80%, rgba(26,10,5,0.35) 100%)",
              }}
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
