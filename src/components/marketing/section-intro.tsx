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
    <div className="max-w-2xl">
      <motion.p
        initial={reduce ? false : { y: 10 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-gold"
      >
        <span className="size-1.5 rounded-full bg-gold animate-flash" />
        {eyebrow}
      </motion.p>
      <motion.span
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 block h-px w-10 origin-left bg-gold/70"
      />
      <motion.h2
        initial={reduce ? false : { y: 14 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 font-figure text-[2.05rem] leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[2.55rem]"
      >
        {title}
      </motion.h2>
      {body ? (
        <motion.p
          initial={reduce ? false : { y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground"
        >
          {body}
        </motion.p>
      ) : null}
    </div>
  );
}
