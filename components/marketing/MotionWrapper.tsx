"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Use "item" inside a StaggerContainer, "section" for standalone fade-up */
  variant?: "item" | "section";
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0, 0, 1], delay },
  }),
};

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.3, delay },
  }),
};

/** Single element fade-up, triggered when it enters the viewport */
export function MotionWrapper({
  children,
  className,
  delay = 0,
}: MotionWrapperProps) {
  const reduced = useReducedMotion();
  const variants = reduced ? reducedVariants : sectionVariants;

  return (
    <motion.div
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

/** Wrap a group of MotionItem children for automatic stagger */
export function StaggerContainer({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Individual stagger item — must be a direct child of StaggerContainer */
export function MotionItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const variants: Variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0, 0, 1] } } };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
