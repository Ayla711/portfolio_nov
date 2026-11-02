import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { getPersonalMarkPath } from "../src/utils/personal-mark";

test("personal mark is hidden until a file is supplied and updates on replacement", async () => {
  const root = await mkdtemp(join(tmpdir(), "portfolio-mark-"));
  try {
    assert.equal(getPersonalMarkPath(root), undefined);
    await mkdir(join(root, "images"));
    const png = join(root, "images/personal-mark.png");
    await writeFile(png, "first image");
    const first = getPersonalMarkPath(root);
    assert.match(first ?? "", /^images\/personal-mark\.png\?v=[a-f0-9]+$/);
    await writeFile(png, "second image");
    assert.notEqual(getPersonalMarkPath(root), first);
    await writeFile(
      join(root, "images/personal-mark.svg"),
      '<svg xmlns="http://www.w3.org/2000/svg"/>',
    );
    assert.match(
      getPersonalMarkPath(root) ?? "",
      /^images\/personal-mark\.svg\?v=/,
    );
  } finally {
    await rm(root, { recursive: true });
  }
});
