"use client";

import {
  motion,
  type Transition,
  useInView,
  type UseInViewOptions,
  type Variant,
} from "framer-motion";
import { type ReactNode, useRef } from "react";

interface InViewProps {
  children: ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  disable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function InView({
  children,
  variants = defaultVariants,
  transition,
  viewOptions,
  disable = false,
  ...props
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      {...props}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={disable ? {} : variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
