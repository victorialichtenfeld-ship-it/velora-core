export function siteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:4317";
  return raw.replace(/\/$/, "");
}

export function siteHost() {
  try {
    return new URL(siteUrl()).host;
  } catch {
    return "127.0.0.1:4317";
  }
}
