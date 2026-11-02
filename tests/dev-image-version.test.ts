import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { versionDevImageUrl } from "../src/utils/dev-image-version";

test("same-name image replacement changes the dev cache key, including srcset variants", async () => {
  const dir = await mkdtemp(join(tmpdir(), "portfolio-image-test-"));
  try {
    const file = join(dir, "portrait.jpg");
    const query = new URLSearchParams({
      href: `/@fs${file}?origWidth=800`,
      w: "320",
      f: "webp",
    });
    const url = `/portfolio/_image/?${query}`;
    await writeFile(file, "first image");
    const first = versionDevImageUrl(url);
    assert.notEqual(first, url);
    assert.equal(versionDevImageUrl(url), first);
    const parsed = new URL(first, "http://localhost");
    assert.equal(parsed.pathname, "/portfolio/_image/");
    assert.equal(parsed.searchParams.get("w"), "320");
    assert.equal(parsed.searchParams.get("href"), `/@fs${file}?origWidth=800`);
    await writeFile(file, "other image");
    assert.notEqual(versionDevImageUrl(url), first);
    const large = versionDevImageUrl(url.replace("w=320", "w=640"));
    assert.equal(
      new URL(large, "http://localhost").searchParams.get("v"),
      new URL(versionDevImageUrl(url), "http://localhost").searchParams.get(
        "v",
      ),
    );
  } finally {
    await rm(dir, { recursive: true });
  }
});

test("remote, public and production image URLs remain unchanged", () => {
  for (const url of [
    "/portfolio/_astro/photo.abc.webp",
    "/portfolio/_image/?href=https%3A%2F%2Fexample.com%2Fphoto.jpg",
    "/portfolio/_image/?href=%2Fmedia%2Fphoto.jpg",
  ]) {
    assert.equal(versionDevImageUrl(url), url);
  }
});
