import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

export function versionDevImageUrl(url: string): string {
  const parsed = new URL(url, "http://localhost");
  const source = parsed.searchParams.get("href");
  if (!source?.startsWith("/@fs/")) return url;

  // Read current bytes at render time, not when the image module was imported.
  // Same-name replacements need a new URL even if dimensions stay unchanged.
  const filePath = source.slice("/@fs".length).split("?")[0];
  const version = createHash("sha256")
    .update(readFileSync(filePath))
    .digest("hex")
    .slice(0, 16);
  parsed.searchParams.set("v", version);
  return `${parsed.pathname}${parsed.search}`;
}
