"use client";

import { motion, type MotionProps } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0.3 },
  show: { opacity: 1 },
};

export function Stagger({
  children,
  delay,
  ...props
}: MotionProps & React.ComponentProps<"ul"> & { delay?: number }) {
  const variants = {
    ...container,
    show: {
      ...container.show,
      transition: {
        ...container.show.transition,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.ul {...props} variants={variants} initial="hidden" animate="show">
      {children}
    </motion.ul>
  );
}

export function StaggerItem({
  children,
  ...props
}: MotionProps & React.ComponentProps<"li">) {
  return (
    <motion.li {...props} variants={item}>
      {children}
    </motion.li>
  );
}
