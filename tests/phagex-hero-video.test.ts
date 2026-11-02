import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const pagePath = resolve(
  import.meta.dirname,
  "../dist/project/phagex/index.html",
);
const pageHtml = await readFile(pagePath, "utf8");

test("PhageX detail hero renders the requested YouTube video instead of its cover image", () => {
  const heroMedia = pageHtml.match(
    /<figure class="hero-media"[^>]*>([\s\S]*?)<\/figure>/,
  );

  assert.ok(
    heroMedia,
    "Expected the PhageX page to contain its hero media region",
  );
  assert.match(heroMedia[1], /<iframe\b/);
  assert.match(
    heroMedia[1],
    /src="https:\/\/www\.youtube-nocookie\.com\/embed\/rArbDeBju0M(?:\?[^\"]*)?"/,
  );
  assert.match(heroMedia[1], /title="PhageX prototype walkthrough"/);
  assert.match(heroMedia[1], /loading="lazy"/);
  assert.doesNotMatch(heroMedia[1], /<img\b/);
});
