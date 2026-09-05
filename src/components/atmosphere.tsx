export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-well absolute inset-x-[-12%] top-[-32%] h-[38rem] bg-[radial-gradient(ellipse_at_50%_0%,rgb(77_138_245_/_0.28),transparent_64%)]" />
      <div className="animate-well absolute bottom-[-18%] right-[-8%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgb(147_192_255_/_0.12),transparent_70%)] [animation-delay:1.1s]" />
      <div className="animate-rail absolute top-[42%] left-0 h-px w-1/3 bg-gold/40" />
    </div>
  );
}
