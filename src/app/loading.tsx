export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 rounded-full border border-gold/30">
          <div className="size-full animate-spin rounded-full border-2 border-transparent border-t-gold" />
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Velora is preparing</p>
      </div>
    </div>
  );
}
