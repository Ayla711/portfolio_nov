import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import matter from "gray-matter";

const home = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
const canonical = home.match(
  /<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/,
)?.[1];
assert.ok(canonical, "A canonical home URL must be present");
const base = new URL(canonical).pathname;
const sections = [
  ["about-me", "About Me"],
  ["projects", "Projects"],
  ["others", "Others"],
] as const;
const sourceDirectory = new URL("../src/content/projects/", import.meta.url);
const projects = (await Promise.all(
  (await readdir(sourceDirectory))
    .filter((name) => name.endsWith(".mdx"))
    .map(async (name) => ({
      id: name.replace(/\.mdx$/, ""),
      ...matter(await readFile(new URL(name, sourceDirectory), "utf8")).data,
    })),
)) as Array<{
  id: string;
  status: string;
  featuredOrder?: number;
  detailPage: boolean;
  homeSection?: "projects" | "others";
}>;
const featured = projects
  .filter(
    (project) =>
      project.status === "published" && project.featuredOrder !== undefined,
  )
  .sort((a, b) => a.featuredOrder! - b.featuredOrder!);

function primaryNavigation(html: string) {
  const nav = html.match(
    /<nav\b[^>]*aria-label="Primary navigation"[^>]*>[\s\S]*?<\/nav>/,
  )?.[0];
  assert.ok(nav, "A shared primary navigation must be rendered");
  return [...nav.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map(
    (link) => ({
      href: link[1],
      label: link[2].replace(/<[^>]+>/g, "").trim(),
    }),
  );
}

test("top navigation has the three current homepage destinations without Education", () => {
  assert.deepEqual(
    primaryNavigation(home),
    sections.map(([id, label]) => ({ href: base + "#" + id, label })),
  );
  for (const [id] of sections)
    assert.match(home, new RegExp('<section\\b[^>]*id="' + id + '"'));
  assert.doesNotMatch(
    home,
    /\bid="education(?:-title)?"|href="[^"]*#education"/,
  );
});

test("identity uses a portrait and exact name instead of the oversized career heading", () => {
  const rail = home.match(/<aside\b[^>]*>[\s\S]*?<\/aside>/)?.[0];
  assert.ok(rail);
  const heading = rail.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
  assert.ok(heading);
  assert.equal(
    heading
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim(),
    "Yuanqian(Ayla) Liu",
  );
  assert.match(rail, /<img\b[^>]*alt="Yuanqian\(Ayla\) Liu(?: [^"]+)?"/);
  assert.match(rail, /<img\b[^>]*src="[^"]*\/headshot\.[^"]+"/);
  assert.doesNotMatch(rail, /\/ayla\./);
  assert.doesNotMatch(rail, /UX Designer|&amp; Design Engineer/);
  assert.match(
    rail,
    /href="https:[^"]+"[^>]*target="_blank"[^>]*>[\s\S]*?Resume/,
  );
  assert.match(rail, /href="https:\/\/www\.linkedin\.com\/in\//);
  assert.match(rail, /href="mailto:/);
});

test("the transparent signature sits between the name and contact links", () => {
  const rail = home.match(/<aside\b[^>]*>[\s\S]*?<\/aside>/)?.[0];
  assert.ok(rail);
  const signature = rail.match(
    /<img\b[^>]*class="personal-signature"[^>]*>/,
  )?.[0];
  assert.ok(
    signature,
    "The supplied signature must appear in the identity rail",
  );
  assert.match(signature, /src="[^"]*\/ayla-signature\.[^"]+"/);
  assert.ok(rail.indexOf(signature) > rail.indexOf("</h1>"));
  assert.ok(
    rail.indexOf(signature) < rail.indexOf('<nav class="profile-links"'),
  );
});

test("contact links have decorative leading icons without replacing their labels", () => {
  const nav = home.match(
    /<nav\b[^>]*aria-label="Resume and contact"[^>]*>[\s\S]*?<\/nav>/,
  )?.[0];
  assert.ok(nav);
  const links = [...nav.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)];
  assert.equal(links.length, 3);
  for (const [index, label] of ["Resume", "LinkedIn", "Email"].entries()) {
    const content = links[index][1];
    assert.match(content, /^\s*<svg\b/);
    const icon = content.match(/<svg\b[^>]*>/)?.[0];
    assert.ok(icon);
    assert.match(icon, /aria-hidden="true"/);
    assert.match(icon, /focusable="false"/);
    assert.equal(
      content
        .replace(/<svg\b[\s\S]*?<\/svg>/, "")
        .replace(/<[^>]+>/g, "")
        .replace(/↗/g, "")
        .trim(),
      label,
    );
  }
});

test("about precedes projects and legacy anchors remain available exactly once", () => {
  const positions = sections.map(([id]) => home.indexOf('id="' + id + '"'));
  assert.ok(
    positions.every(
      (position, index) => index === 0 || position > positions[index - 1],
    ),
  );
  for (const id of ["about", "work", ...sections.map(([id]) => id)]) {
    assert.equal(
      [...home.matchAll(new RegExp('\\bid="' + id + '"', "g"))].length,
      1,
      id,
    );
  }
  const about = home.match(
    /<section\b[^>]*id="about-me"[^>]*>[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(about);
  assert.match(about, /aria-labelledby="about-title"/);
  assert.match(
    about,
    /<h2\b[^>]*id="about-title"[^>]*class="visually-hidden"[^>]*>About Me<\/h2>/,
    "The introduction keeps an accessible section heading without a visible title",
  );
  assert.doesNotMatch(about, /<img\b/);
  assert.ok(about.includes('id="about"'));
});

test("the personal mark is a base-aware favicon on every page, not a sidebar decoration", async () => {
  const rail = home.match(/<aside\b[^>]*>[\s\S]*?<\/aside>/)?.[0];
  assert.ok(rail);
  assert.doesNotMatch(rail, /images\/personal-mark\./);

  const pages = [
    "index.html",
    "404.html",
    ...projects
      .filter((project) => project.status === "published" && project.detailPage)
      .map((project) => `project/${project.id}/index.html`),
  ];
  for (const page of pages) {
    const html = await readFile(
      new URL(`../dist/${page}`, import.meta.url),
      "utf8",
    );
    const head = html.match(/<head>[\s\S]*?<\/head>/)?.[0];
    assert.ok(head);
    const icons = [...head.matchAll(/<link\b[^>]*rel="icon"[^>]*>/g)];
    assert.equal(icons.length, 1, `${page} must declare one site icon`);
    const href = icons[0][0].match(/href="([^"]+)"/)?.[1];
    assert.ok(href, `${page} favicon must have a URL`);
    assert.ok(
      href.startsWith(base),
      `${page} favicon must respect the site base`,
    );
    const path = href.slice(base.length);
    assert.match(path, /^images\/personal-mark\.(svg|png)\?v=[a-f0-9]+$/);
    const asset = path.split("?")[0];
    assert.deepEqual(
      await readFile(new URL(`../dist/${asset}`, import.meta.url)),
      await readFile(new URL(`../public/${asset}`, import.meta.url)),
      "The favicon must reuse the supplied personal mark",
    );
  }
});

test("the project grid retains every featured project with a single image and valid detail link", () => {
  assert.match(home, /class="project-grid"/);
  const cards = [
    ...home.matchAll(
      /<article\b[^>]*data-project-card[^>]*>[\s\S]*?<\/article>/g,
    ),
  ].map((match) => match[0]);
  assert.equal(cards.length, featured.length);
  assert.deepEqual(
    cards.map((card) => card.match(/data-project-id="([^"]+)"/)?.[1]),
    featured.map((project) => project.id),
  );
  cards.forEach((card, index) => {
    assert.equal([...card.matchAll(/<img\b/g)].length, 1);
    assert.match(card, /<h3\b/);
    assert.doesNotMatch(
      card,
      /Challenge|My contribution|Outcome|<video\b|<iframe\b|<dl\b/,
    );
    if (featured[index].detailPage)
      assert.ok(
        card.includes('href="' + base + "project/" + featured[index].id + '/"'),
      );
  });
});

test("LingGou EduBot is last in Others and absent from the four selected projects", async () => {
  const others = home.match(
    /<section\b[^>]*id="others"[^>]*>[\s\S]*?<\/section>/,
  )?.[0];
  const selected = home.match(
    /<section\b[^>]*id="projects"[^>]*>[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(others);
  assert.ok(selected);
  assert.match(others, /class="project-grid"/);
  assert.doesNotMatch(others, /Draft section|Content to be added/);
  assert.deepEqual(
    [...others.matchAll(/data-project-id="([^"]+)"/g)].map((match) => match[1]),
    [
      "following-to-discovery",
      "evolution-of-commemoration",
      "where-is-my-body",
      "linggou-edubot",
    ],
  );
  assert.equal([...selected.matchAll(/data-project-card\b/g)].length, 4);
  assert.doesNotMatch(
    selected,
    /following-to-discovery|evolution-of-commemoration|where-is-my-body|linggou-edubot/,
  );
  for (const id of [
    "following-to-discovery",
    "evolution-of-commemoration",
    "where-is-my-body",
    "linggou-edubot",
  ]) {
    assert.ok(others.includes(`href="${base}project/${id}/"`));
  }
  const detail = await readFile(
    new URL("../dist/project/linggou-edubot/index.html", import.meta.url),
    "utf8",
  );
  assert.ok(detail.includes(`href="${base}#others"`));
  assert.match(detail, /id="overview"/);
});

test("the film shows its local cover and play control before loading YouTube", async () => {
  const html = await readFile(
    new URL("../dist/project/where-is-my-body/index.html", import.meta.url),
    "utf8",
  );
  assert.equal([...html.matchAll(/<iframe\b/g)].length, 0);
  const playButton = html.match(
    /<button\b[^>]*aria-label="Play Where Is My Body\?"[^>]*>[\s\S]*?<\/button>/,
  )?.[0];
  assert.ok(playButton, "The cover must offer an accessible play control");
  assert.match(playButton, /<img\b[^>]*src="[^\"]+"/);
  const poster = playButton.match(/<img\b[^>]*src="([^\"]+)"/)?.[1];
  assert.ok(
    poster?.startsWith(base),
    "The poster must be a local, base-aware asset",
  );
  assert.match(playButton, /alt="Title card for Where Is My Body\?/);
  assert.match(
    html,
    /data-src="https:\/\/www.youtube-nocookie.com\/embed\/uyxzaYrkF1g\?rel=0"/,
  );
  assert.match(html, /<h1\b[^>]*>Where Is My Body\?<\/h1>/);
  assert.ok(html.includes(`href="${base}#others"`));
  assert.ok(
    html.includes('href="https://www.youtube.com/watch?v=uyxzaYrkF1g"'),
  );
  assert.doesNotMatch(
    html,
    /Case study chapters|id="overview"|case-content|project-facts|Keep exploring/,
  );
  assert.doesNotMatch(html, /[?&]autoplay=1/);
});

test("coursework detail pages keep Overview then the original assignment with all figures and references", async () => {
  for (const id of ["following-to-discovery", "evolution-of-commemoration"]) {
    const html = await readFile(
      new URL(`../dist/project/${id}/index.html`, import.meta.url),
      "utf8",
    );
    assert.match(html, /Coursework/);
    const chapterNav = html.match(
      /<nav\b[^>]*aria-label="Case study chapters"[^>]*>[\s\S]*?<\/nav>/,
    )?.[0];
    assert.ok(chapterNav);
    assert.deepEqual(
      [...chapterNav.matchAll(/href="([^"]+)"/g)].map((match) => match[1]),
      ["#overview", "#original"],
    );
    assert.ok(html.indexOf('id="original"') > html.indexOf('id="overview"'));
    const original = html.match(
      /<section\b[^>]*id="original"[^>]*>[\s\S]*?<\/section>/,
    )?.[0];
    assert.ok(original);
    assert.equal(
      [...original.matchAll(/<img\b/g)].length,
      id === "following-to-discovery" ? 2 : 19,
    );
    assert.match(
      original,
      id === "following-to-discovery"
        ? /The Shift from Following to Discovery/
        : /Discussion and Interpretation/,
    );
    assert.match(original, /Reference(?: List|s)/);
    assert.doesNotMatch(html, /14335905|<a[^>]*>Prototype<\/a>/);
    assert.ok(html.includes(`href="${base}#others"`));
    const bar = html.match(
      /<nav\b[^>]*aria-label="Project navigation"[^>]*>[\s\S]*?<\/nav>/,
    )?.[0];
    assert.ok(bar?.includes(`href="${base}#others"`));
    assert.match(html, /Back to others/);
  }
});

test("each existing case retains its route and the shared homepage navigation", async () => {
  for (const project of projects.filter(
    (entry) => entry.status === "published" && entry.detailPage,
  )) {
    const html = await readFile(
      new URL("../dist/project/" + project.id + "/index.html", import.meta.url),
      "utf8",
    );
    assert.deepEqual(
      primaryNavigation(html),
      sections.map(([id, label]) => ({ href: base + "#" + id, label })),
    );
    assert.ok(html.includes('href="' + base + '#projects"'));
    assert.match(html, /id="main-content"/);
  }
});
