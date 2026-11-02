function normalizeRelativePath(path: string): string {
  return path.replace(/^\/+/, "");
}

export function withBase(path = ""): string {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const normalized = normalizeRelativePath(path);

  if (!normalized) return base;
  if (normalized.startsWith("#")) return `${base}${normalized}`;

  return `${base}${normalized}`.replace(/\/{2,}/g, "/");
}

export function absoluteUrl(path: string, site: URL | undefined): string {
  if (!site) {
    throw new Error(
      "astro.config.mjs must define site before generating absolute URLs.",
    );
  }

  return new URL(withBase(path), site).toString();
}
