import type { Transition, Variants } from "framer-motion";

/** Shared cinematic ease-out used for entrances, transitions and hovers. */
export const EASE_STANDARD = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  hover: 0.3,
  entrance: 0.5,
  page: 0.6,
  hero: 0.8,
} as const;

/** Stagger applied between sibling elements on scroll-reveal. */
export const STAGGER = 0.08;

export const entranceTransition: Transition = {
  duration: DURATION.entrance,
  ease: EASE_STANDARD,
};

/** Fade up from below — default scroll-reveal for sections/cards. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: entranceTransition },
};

/** Wrap around a group of `fadeUp` children to stagger their reveal. */
export const fadeUpContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: STAGGER },
  },
};

/** Cinematic reveal for hero headline lines on first load. */
export const heroLine: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.hero, ease: EASE_STANDARD },
  },
};

/** Gallery image — fade + slight scale on viewport entry. */
export const fadeScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: entranceTransition,
  },
};

export const pageEnter: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.page, ease: EASE_STANDARD },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: EASE_STANDARD },
  },
};
