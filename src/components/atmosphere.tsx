export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-well absolute left-1/2 top-[-22%] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(124_108_255_/_0.42),transparent_62%)] blur-3xl" />
      <div className="animate-well absolute -right-[12%] top-[26%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgb(91_140_255_/_0.22),transparent_68%)] blur-3xl [animation-delay:1.15s]" />
      <div className="animate-well absolute -left-[14%] bottom-[-16%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgb(124_108_255_/_0.18),transparent_70%)] blur-3xl [animation-delay:0.55s]" />
    </div>
  );
}
