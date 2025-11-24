export const animationDurations = {
  fast: 0.15,
  base: 0.3,
  slow: 0.5,
} as const;

export const easeSpring = [0.34, 1.56, 0.64, 1];
export const easeSmooth = [0.4, 0, 0.2, 1];

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationDurations.base,
      ease: easeSmooth,
    },
  },
};

export const slideInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationDurations.base,
      ease: easeSmooth,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: animationDurations.fast,
    },
  },
};

export const springScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: animationDurations.base,
      ease: easeSpring,
    },
  },
};

export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: animationDurations.fast,
    ease: easeSmooth,
  },
};

export const tapScale = {
  scale: 0.98,
};

export const pulseAnimation = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};
