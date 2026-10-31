// framer-motion variants — poore app me yahi se use hote hain
export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

export const pop = {
  hidden: { opacity: 0, scale: 0.96, y: 6 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.16, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.12 } },
};

export const slideLeft = {
  hidden: { x: "-100%" },
  show: { x: 0, transition: { type: "tween", duration: 0.22 } },
  exit: { x: "-100%", transition: { type: "tween", duration: 0.18 } },
};
