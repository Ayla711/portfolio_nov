import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export function getPersonalMarkPath(
  publicDirectory: string,
): string | undefined {
  for (const extension of ["svg", "png"]) {
    const path = `images/personal-mark.${extension}`;
    const file = join(publicDirectory, path);
    if (!existsSync(file)) continue;
    const version = createHash("sha256")
      .update(readFileSync(file))
      .digest("hex")
      .slice(0, 16);
    return `${path}?v=${version}`;
  }
  return undefined;
}
