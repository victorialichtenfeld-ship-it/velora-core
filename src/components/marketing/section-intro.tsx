export function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 font-figure text-[2.05rem] leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[2.55rem]">
        {title}
      </h2>
      {body ? <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">{body}</p> : null}
    </div>
  );
}
