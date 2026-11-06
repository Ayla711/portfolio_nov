import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import {
  validateProjectRecords,
  type ProjectRecord,
} from "../scripts/validate-content";

const publicDirectory = resolve("public");
const completeBody = [
  "overview",
  "insight",
  "decisions",
  "prototype",
  "reflection",
]
  .map(
    (kind) => `<CaseSection id="${kind}" kind="${kind}">Evidence</CaseSection>`,
  )
  .join("\n");

function project(index: number): ProjectRecord {
  return {
    id: `project-${index}`,
    body: "",
    data: {
      status: "published",
      detailPage: false,
      featuredOrder: index * 10,
    },
  };
}

for (const count of [0, 1, 3, 5, 6]) {
  test(`V2 accepts ${count} homepage projects without legacy presentation fields`, () => {
    const projects = Array.from({ length: count }, (_, index) =>
      project(index),
    );
    assert.deepEqual(validateProjectRecords(projects, publicDirectory), []);
  });
}

test("reordering is independent of legacy presentation values", () => {
  const projects = [project(4), project(0), project(2)];
  projects[0].data.presentation = "hero";
  projects[1].data.presentation = "compact";
  projects[2].data.presentation = "standard";
  assert.deepEqual(validateProjectRecords(projects, publicDirectory), []);
});

test("duplicate homepage positions and duplicate IDs are still rejected", () => {
  const first = project(0);
  const second = project(1);
  second.data.featuredOrder = 0;
  assert.match(
    validateProjectRecords([first, second], publicDirectory).join("\n"),
    /featuredOrder 0 is already used/,
  );
  assert.match(
    validateProjectRecords([first, first], publicDirectory).join("\n"),
    /Duplicate project id/,
  );
});

test("published projects must have a homepage position or a detail page", () => {
  const item = project(0);
  delete item.data.featuredOrder;
  assert.match(
    validateProjectRecords([item], publicDirectory).join("\n"),
    /unreachable/,
  );
  item.data.detailPage = true;
  item.body = completeBody;
  assert.deepEqual(validateProjectRecords([item], publicDirectory), []);
});

test("detail pages keep all five required chapters", () => {
  const item = project(0);
  item.data.detailPage = true;
  item.body = completeBody;
  assert.deepEqual(validateProjectRecords([item], publicDirectory), []);
  item.body = completeBody.replace('id="reflection"', 'id="other"');
  assert.match(
    validateProjectRecords([item], publicDirectory).join("\n"),
    /reflection CaseSection/,
  );
});

test("coursework accepts an overview followed by the original assignment instead of five case-study chapters", () => {
  const item = project(0);
  item.data.detailPage = true;
  item.data.caseStudyType = "coursework";
  item.body =
    '<CaseSection id="overview" kind="overview">Overview</CaseSection>\n<CourseworkContent id="original" title="Original title">Original assignment</CourseworkContent>';
  assert.deepEqual(validateProjectRecords([item], publicDirectory), []);
  item.body = item.body.replace('id="original"', 'id="wrong"');
  assert.match(
    validateProjectRecords([item], publicDirectory).join("\n"),
    /original CourseworkContent/,
  );
});

test("PDF-based detail pages list rail stops that point at existing sections", () => {
  const item = project(0);
  item.data.detailPage = true;
  item.data.caseStudyType = "pdf";
  item.data.pdfPage = {
    rail: [
      { id: "background", label: "Challenge" },
      { id: "testing", label: "Validation" },
    ],
  };
  item.body =
    '<section id="background" class="pdf-chapter">B</section>\n<section id="testing" class="pdf-chapter">T</section>';
  assert.deepEqual(validateProjectRecords([item], publicDirectory), []);
  item.body = item.body.replace('id="testing"', 'id="other"');
  assert.match(
    validateProjectRecords([item], publicDirectory).join("\n"),
    /PDF rail stop "testing"/,
  );
  item.data.pdfPage = { rail: [] };
  assert.match(
    validateProjectRecords([item], publicDirectory).join("\n"),
    /requires pdfPage\.rail/,
  );
});

test("a published card may open an external link instead of a detail page", () => {
  const item = project(0);
  item.data.featuredOrder = undefined;
  item.data.detailPage = false;
  item.data.externalUrl = "https://example.com/case-study.pdf";
  assert.deepEqual(validateProjectRecords([item], publicDirectory), []);
  item.data.externalUrl = undefined;
  assert.match(
    validateProjectRecords([item], publicDirectory).join("\n"),
    /unreachable/,
  );
});

test("draft and archived projects are valid off the homepage only", () => {
  for (const status of ["draft", "archived"] as const) {
    const item = project(0);
    item.data.status = status;
    assert.match(
      validateProjectRecords([item], publicDirectory).join("\n"),
      /Only published projects/,
    );
    delete item.data.featuredOrder;
    assert.deepEqual(validateProjectRecords([item], publicDirectory), []);
  }
});

test("video-only detail pages require a valid video rather than case-study chapters", () => {
  const item = project(0);
  item.data.detailPage = true;
  item.data.caseStudyType = "video";
  item.data.heroVideo = {
    provider: "youtube",
    id: "uyxzaYrkF1g",
    title: "Where Is My Body?",
  };
  assert.deepEqual(validateProjectRecords([item], publicDirectory), []);
  item.data.heroVideo.id = "invalid";
  assert.match(
    validateProjectRecords([item], publicDirectory).join("\n"),
    /video detail requires a valid YouTube heroVideo/,
  );
  delete item.data.heroVideo;
  assert.match(
    validateProjectRecords([item], publicDirectory).join("\n"),
    /video detail requires a valid YouTube heroVideo/,
  );
});

test("preview media must exist inside public and use a relative path", async () => {
  const root = await mkdtemp(join(tmpdir(), "portfolio-content-test-"));
  try {
    const mediaPublic = join(root, "public");
    await mkdir(mediaPublic);
    await writeFile(join(mediaPublic, "preview.mp4"), "fixture");
    await writeFile(join(root, "outside.mp4"), "fixture");
    const item = project(0);
    item.data.previewVideo = "preview.mp4";
    assert.deepEqual(validateProjectRecords([item], mediaPublic), []);
    for (const path of ["/preview.mp4", "missing.mp4", "../outside.mp4"]) {
      item.data.previewVideo = path;
      assert.ok(validateProjectRecords([item], mediaPublic).length > 0, path);
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
