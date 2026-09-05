"use client";

import { motion, useReducedMotion } from "motion/react";

export function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="max-w-3xl">
      <motion.p
        initial={reduce ? false : { y: 8 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        className="text-[13px] font-medium text-gold"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={reduce ? false : { y: 12 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 text-[2.15rem] font-semibold leading-[1.1] tracking-[-0.04em] text-foreground sm:text-[2.7rem]"
      >
        {title}
      </motion.h2>
      {body ? (
        <motion.p
          initial={reduce ? false : { y: 10 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 max-w-xl text-[16px] leading-8 text-muted-foreground"
        >
          {body}
        </motion.p>
      ) : null}
    </div>
  );
}
