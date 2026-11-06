# Yuanqian(Ayla) Liu Portfolio

Content-driven Astro portfolio for UX Design and Design Engineering work.

## Current implementation — V2

The V2 layout is implemented locally. The sidebar displays the selected headshot in a circular frame and `Yuanqian(Ayla) Liu`, with Resume, LinkedIn, and Email below. These three links retain their order and destinations, with document, LinkedIn, and envelope icons before their labels in the site's blue-violet `--color-accent`; no Google Scholar link is added. The links always occupy three vertical rows, with their icon column and text starting positions left-aligned. The content-width link group is centered as a whole: on desktop it shares the portrait and naturally wrapping name's center axis; on narrow screens it is centered below the name within the right-hand text column, while the portrait stays on the left. The former large career title and sidebar practice labels are no longer displayed. The shared top navigation links to About Me, Projects, and Others; the Education section and its navigation entry were removed at the user's request on 2026-11-02.

The introduction appears first in the main column, without a visible “About Me” heading; that heading remains available to screen readers, and the About Me navigation and anchors are unchanged. Projects use two independent, equal-width cards per row on desktop and one column on small screens. Each card shows one 16:9 cover, title, year, summary, role, the first two capability tags, and a detail link when enabled. The fifth card keeps the same width as the others. Old `#about` and `#work` links remain valid aliases.

Selected Projects displays PhageX, EchoBloom, The Reading Pensieve, and Tutela, in that order. Others contains From Following to Discovery (2025), The Evolution of Commemoration (2026), Where Is My Body? (2023), and finally LingGou EduBot (`featuredOrder: 90`), using the same card layout and responsive grid. LingGou retains its complete existing design detail page. Both sections use the same Astro `projects` collection and `/project/<id>/` detail routes. Each coursework detail keeps its existing Overview, then presents the original PDF text and figures in a centered reading column instead of a rewritten project narrative. Where Is My Body? opens a minimal same-site video detail page without Overview or case-study chapters. PhageX retains its YouTube detail-page hero. All four Others detail pages return to Others; the four Selected Projects detail pages return to Projects.

## Before public release

The Where Is My Body? cover-first update on 2026-11-02 passed Astro checks (41 files, zero diagnostics), content validation (eight projects), formatting checks for changed files, a ten-page build, and all 27 tests. The detail player starts with the supplied cover and an accessible Play button, loading the privacy-enhanced `youtube-nocookie.com` iframe only after activation; Watch on YouTube remains available. Browser checks verified the loaded cover, click/Enter activation and focus transfer, and no horizontal overflow at 375 and 936 px. Playback is user-confirmed; the in-app test browser still reports video unavailable after activation, so those checks verify the preview and player handoff, not full playback.

Others is no longer a missing-content draft. The original-coursework restoration passed `npm run ci`: 40 Astro files with zero errors, warnings, or hints, seven validated projects, nine built pages, and 25/25 passing tests. Browser checks confirmed Overview followed by Original coursework, with two and 19 figures respectively; both detail pages had no horizontal overflow at 320 and 1280 px. Independent review found no omitted original text, confirmed all 21 figures match the source PDFs' embedded images by SHA-256, and found no student IDs in the rendered HTML. The results below are historical. On 2026-11-01, `npm run ci` passed (21 tests, seven built pages), and local browser checks covered 320–1440 px layouts, navigation, legacy anchors, and the PhageX video embed. These are historical checks; the site is now deployed at https://yuanqianayla.com/.

After removing Education on 2026-11-02, `npm run ci` passed again: zero Astro errors or warnings, five validated projects, seven built pages, and 23 passing tests. The local browser also confirmed three navigation targets, no Education section, and all five project cards. This focused check does not replace the remaining release review.

Before the original-coursework correction, the Others research adaptation's final full CI run after the MDX, image-comparison, and research-only CSS fixes passed: 39 Astro files with zero errors, warnings, or hints, seven validated projects, nine built pages, and 24 passing tests. Browser checks at 1280 and 936 px confirmed the two matching Others cards and five original Selected Projects; at 320 px, the homepage and both research detail pages had no horizontal overflow. Both five-chapter navigation sets, the first study's two comparison images, the second study's Findings chart, and navigation to/from Others were checked live. The built HTML also independently confirmed two actual images in ImageComparison. Research-only CSS fixes corrected the SVG hero's aspect ratio and narrow-screen title overflow. At that time broader accessibility review, the real deployment origin, and publishing were still pending; the site has since been published at https://yuanqianayla.com/.

Use the [design plan](docs/PORTFOLIO_WEBSITE_PLAN.md) for layout requirements and remaining content, and the [technical plan](docs/TECHNICAL_IMPLEMENTATION_PLAN.md) for implementation and validation contracts. The site is deployed from the `Ayla711/portfolio_nov` GitHub repository to GitHub Pages at the custom domain https://yuanqianayla.com/.

## Toolchain

- Astro + TypeScript
- Build-time Content Collections
- MDX
- Astro Assets
- Minimal vanilla JavaScript
- GitHub Actions and GitHub Pages

Node 24 is defined in `.nvmrc`; commit `package-lock.json` to keep installs reproducible.

## Local commands

```sh
npm ci
npm run dev
npm run ci
```

The site is served from the domain root, so the local homepage is at `http://localhost:4321/` (no `/portfolio/` subpath).

`npm run ci` runs Astro diagnostics, content validation, formatting checks, a production build, and tests. Some tests read `dist`, so use the complete command on a fresh checkout.

## Add a project

1. Copy `templates/project.mdx` into `src/content/projects/` and give it a new kebab-case filename.
2. Add project images to `src/assets/projects/<project-id>/`.
3. Fill the frontmatter, including one `cover`, its `coverAlt`, and 3–5 capability values. Put the two most important capabilities first: only those appear on the card.
4. Set `homeSection: others` for an Others card; omitted `homeSection` defaults to `projects`. `caseStudyType` accepts `design` (default), `research`, `coursework`, `video`, or `pdf`. A `pdf` page is rebuilt from the project's PDF (see section 7.1 of the design plan): it lists its tagline, facts and rail stops under `pdfPage` in the frontmatter, each chapter is a `<section id="…" class="pdf-chapter">` in the MDX body, and shared plus per-project styles live under `.pdf-case` in `src/pages/project/[id].astro`. `pdfPage.rail` (required: 4–6 stops such as Overview / Challenge / Solution / Validation, each an existing section id) renders the sticky left chapter rail, which replaces the hero chapter chips on these pages (`ChapterRail.astro`, plan section 7.2.8); `pdfPage.hideHeroMedia: true` drops the cover or video from the hero. These are independent choices, not separate content collections. Others currently contains two `coursework` entries and one `video` entry.
5. If `detailPage: true`, design and research pages require the five stable section IDs overview, insight, decisions, prototype, and reflection. Research pages may use the visible titles Overview, Research approach, Analysis, Findings, and Reflection; the retained `prototype` ID is not a claim that the research built a prototype. Coursework instead requires a `CaseSection` Overview and `CourseworkContent` with `id="original"`, preserving the original essay below the overview. Copy an existing coursework MDX for that structure: changing `caseStudyType` alone does not rewrite the body. Video mode requires a valid `heroVideo` and does not require MDX chapters; its minimal detail page has no Overview or case-study chapter navigation. Use `detailPage: false` for a homepage-only project without a detail link. Add `externalUrl` to a `detailPage: false` project to make its card open that link in a new tab (The Reading Pensieve and LingGou EduBot point at PDFs on Google Drive this way).
6. When ready, set `status: published` and add a globally unique `featuredOrder` across both homepage sections. Lower numbers come first within each section.
7. Run `npm run ci` and preview both the card and detail page before opening a pull request.

Homepage section is controlled by `homeSection`, and order by `featuredOrder`. Remove `featuredOrder` to keep a public detail page off both homepage grids. To remove a project from production, set `status: draft` or `status: archived` and remove `featuredOrder`. Existing five projects do not need new fields because the defaults preserve their current section and page type.

Reordering now requires changing only `featuredOrder`; there is no hero / standard / compact position rule. The legacy `presentation`, `home`, and `homeSecondary` fields are optional and do not control the cards. Existing data and media remain preserved: check detail-page references before removing any asset. A published project must have a homepage position or an enabled detail page so it is not unreachable.

## Edit project text and images

- Card text comes from `title`, `summary`, `year`, `role`, and `capabilities` in the project's MDX frontmatter. The MDX body contains the separate detail-page content.
- Replace the existing image at the same path to preserve its references. If you change its name or location, update the corresponding MDX path or import too.
- The card uses `cover` and `coverAlt`. Choose a landscape image suitable for a 16:9 crop and update the alternative text to accurately describe it.
- Changing a project filename changes its URL; changing only `title` does not.

## Site and deployment configuration

`astro.config.mjs` is the single source of truth for `site` and `base`. It currently sets `site: "https://yuanqianayla.com"` and no `base`, because the site is served from the root of its custom domain.

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist` to GitHub Pages. Because Pages deploys from GitHub Actions, the custom domain is controlled by Settings → Pages → Custom domain (with Enforce HTTPS) and DNS, not by a `CNAME` file; the `CNAME` file in the repository root is not used by this deployment, and no `public/CNAME` is needed. If you change the domain, update `site` here, the Pages setting, and DNS together, then rebuild.

## Media rules

- Images: `src/assets/` for Astro validation and optimization.
- Homepage media: one 16:9 `cover` per card. The legacy optional preview-video fields do not activate playback on V2 cards.
- Local videos: `public/media/`, referenced without a leading slash. Detail-page YouTube videos use the separate `heroVideo` field; PhageX keeps video ID `rArbDeBju0M`, and Where Is My Body? uses `uyxzaYrkF1g`.
- Resume: external URL in `src/data/site.ts`; currently a Google Docs `/preview` link (read-only view).
- Large source files do not belong in Git.

## Update name, portrait, Resume, and About

- `profileData.name` in `src/data/profile.ts` controls the visible name, home-link accessible label, and homepage title. The current exact display name is `Yuanqian(Ayla) Liu`.
- The current portrait is `src/assets/projects/profile/headshot.png`, imported by `src/data/profile.ts` and assigned to `about.portrait`. It is displayed only in the sidebar. Replace this file to update the photo without editing code. The previous `ayla.jpg` remains preserved but is no longer the displayed portrait. Do not create a second `src/assets/profile/` directory. If you intentionally change the filename or location, update the existing import in `src/data/profile.ts`.
- Local image preview URLs include a content-based version to prevent stale browser caching after a same-name replacement. Save the new file and refresh the page; no manual renaming or cache clearing is needed. Published static sites still require a fresh build/deployment after changing images.
- Change `resumeUrl` in `src/data/site.ts` to replace the Resume destination across the identity rail and project detail pages. Use the complete external URL, not `withBase()`. For Google Docs, prefer a `/preview` or `/view` URL over `/edit`, and set sharing to "Anyone with the link: Viewer" so visitors can view it without requesting access.
- Edit `about.heading`, `statement`, and `about.body` in `src/data/profile.ts` to update the introduction. The first paragraph starts with the bold greeting `Hi, I’m Yuanqian(Ayla).`, followed by the unchanged `statement`; `about.body` is the entire second paragraph about HCI, design engineering, and data visualization. The unused `about.introduction` field has been removed. The old `role`, `approach`, and capability groups remain compatible data but are not displayed as V2 sidebar text.
- In `src/data/profile.ts`, update `about.portraitAlt` to describe the photo and `about.portraitPosition` to adjust the crop (default `50% 50%`). The sidebar uses a square 1:1 frame with `border-radius: 50%` for a circular portrait and centered `object-fit: cover`. Its widths are 180 px (11.25rem) on desktop, 120 px (7.5rem) on medium screens, and 80 px (5rem) on small screens; no separately cropped image file is needed.
- To temporarily use the existing initials fallback, set `about.portrait` to `undefined as ImageMetadata | undefined`; restore `portrait as ImageMetadata | undefined` to show the imported photo again. Do not delete the photo file to hide it.

## Replace the website icon (favicon)

The cat logo no longer appears beside the sidebar name. The same `public/images/personal-mark.svg` is now the browser-tab icon on all pages. Its square canvas optically increases the cat's vertical size by about 16% while preserving its paths and color, without clipping the ears. Browser icon slots themselves remain fixed-size. To replace it, update `personal-mark.svg` or use `personal-mark.png` in the same folder; SVG takes priority if both exist. If neither file exists, no custom favicon link is emitted. The existing content-version mechanism remains in place. Refresh the page after a replacement; if the browser retains the previous tab icon, close and reopen the tab. Rebuild/redeploy to update the published static site. The old CSS signal bars remain removed.

## Maintain the original coursework in Others

Edit the same MDX and assets structure used by Selected Projects:

- `src/content/projects/following-to-discovery.mdx`: From Following to Discovery, `year: 2025`, `featuredOrder: 60`.
- `src/content/projects/evolution-of-commemoration.mdx`: The Evolution of Commemoration, `year: 2026`, `featuredOrder: 70`.
- Both set `homeSection: others` and `caseStudyType: coursework`. Their images live under `src/assets/projects/<same-id>/`, with an unchanged 16:9 `cover.svg` composition made from the original figures.

The homepage cards and existing Overview stay unchanged. Below Overview, `CourseworkContent.astro` renders the original essay's full title, headings, paragraphs, figures, and references in a centered reading column. Detail navigation contains only Overview (`#overview`) and Original coursework (`#original`), and the hero badge says Coursework. The first essay contains about 2,050 words, 11 references, and two figures; the second reproduces the 13-page source with 19 figures and two references, preserving their original order.

Use `maxWidth={400}` on a `MediaFigure` to cap its display width in pixels and center the figure with its caption; it still shrinks to fit small screens. The inscription report caps Figures 5, 6, and 7 at 400, 560, and 480 px respectively, and other standalone figures at 640 px. Paired figures and original image files remain unchanged; this prevents excessive enlargement without claiming to restore missing image detail.

Metadata retains Format, Document date, and Methods/tools instead of Team, Duration, and Platform. December 2025 and January 2026 come from PDF export metadata, not confirmed research durations or publication dates. This is a faithful reproduction of past assignments, not newly validated research or a publication claim. Preserve the original wording, arguments, statistics, and references—including the original Formulaicity Index and H2 claims—without editorial rewriting or correction. Only repair PDF spacing and paragraph wrapping, and remove page headers and student IDs. Reproduction does not independently confirm the original claims; the former policy of omitting questionable FI numbers no longer applies to these original-coursework pages.

The source PDFs are not copied into the site or offered as downloads. Extracted figures omit page headers and student IDs. `experience.ts` no longer owns an `others` array or type; only its existing empty experience / awards data remains. There is no Others draft notice; if all Others entries are hidden later, the section supports a neutral empty state. Education remains removed and is not a content task.

## Maintain the video entry in Others

`src/content/projects/where-is-my-body.mdx` owns Where Is My Body?, with `year: 2023`, `homeSection: others`, `caseStudyType: video`, and `featuredOrder: 80`. Preserve this exact summary:

> A collaborative stop-motion animation created in London in summer 2023, following a bodyless dragon's whimsical journey through the city in search of his missing parts, only to discover he had been whole all along.

The homepage and initial detail-player cover reuse `src/assets/projects/where-is-my-body/cover.jpg`, which matches the supplied cover. The card links to `/project/where-is-my-body/` on the site, not directly to YouTube. The minimal detail page uses `heroVideo` with YouTube ID `uyxzaYrkF1g`, loading its iframe only after the accessible Play button is activated; it does not need an MDX body, Overview, or case-study chapters. Keep the other Others entries and all four Selected Projects unchanged when maintaining this entry.

## Planning documents

The current plans live in `docs/`:

- [Design plan — V2 local implementation and remaining content](docs/PORTFOLIO_WEBSITE_PLAN.md) — section 7.1 holds the rules for rebuilding the five design project detail pages from their PDFs, and section 7.2 the reusable structure, styles, asset workflow and checks proven on PhageX
- [Technical plan — architecture, validation, and maintenance](docs/TECHNICAL_IMPLEMENTATION_PLAN.md)

The Phase A–E.1 verification documents are historical snapshots, not V2 acceptance results: [A](docs/PHASE_A_VERIFICATION.md), [B](docs/PHASE_B_VERIFICATION.md), [C](docs/PHASE_C_VERIFICATION.md), [D](docs/PHASE_D_VERIFICATION.md), [E](docs/PHASE_E_VERIFICATION.md), and [E.1](docs/PHASE_E_1_VERIFICATION.md). Their past project classifications and pending items do not override the current implementation or the V2 plans.
