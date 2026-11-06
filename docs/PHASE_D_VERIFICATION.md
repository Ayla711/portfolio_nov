# Phase D Verification Record

> **Historical snapshot.** This record describes an earlier phase of the project and is kept for reference only. It may mention the old `/portfolio` base, the placeholder origin, or outdated content. The site is now deployed at https://yuanqianayla.com/; see the README for the current setup.

Date: 2026-08-28

Phase D completes the website’s only second-level page: the shared project case study. Real project copy and final media remain deferred to Phase E.

## Shared detail route

`src/pages/project/[id].astro` now:

- reads published detail projects from the Content Collection
- generates one static route per eligible project
- sorts cases by homepage priority when present, followed by year and stable ID
- renders every MDX file through the same project layout and injected component map
- supplies previous and next project records without project-specific page code

Projects with `detailPage: false`, `draft`, or `archived` do not receive production detail routes.

## Case-study frame

Every detail page contains:

- sticky Back to Selected Work / Ayla Liu bar
- project title, summary, optimized cover, role, team, duration, platform, and capabilities
- direct chapter links
- five editorial case-study sections
- reusable evidence components selected by each project
- previous/next project navigation when neighboring cases exist
- Back to Selected Work, Email, and Résumé handoff

The layout remains a single scrollable page and does not introduce third-level routes.

## Required MDX chapter contract

Every project with `detailPage: true` must provide these fixed anchors and section kinds:

| Anchor / kind | Purpose                                                              |
| ------------- | -------------------------------------------------------------------- |
| `overview`    | context, relevance, role, team, duration, platform, and result       |
| `insight`     | one or two findings that changed the design direction                |
| `decisions`   | the tradeoffs and constraints that shaped the work                   |
| `prototype`   | flows, interfaces, prototypes, tests, media, and experience evidence |
| `reflection`  | outcome, limitations, learning, and next steps                       |

`validate-content.ts` rejects detail projects missing any required ID/kind pair. Removing the temporary project’s reflection kind produced the expected validation error.

## Reusable evidence components

The MDX component map now includes:

- `CaseSection`
- `InsightQuote`
- `MediaFigure`
- `VideoFigure`
- `ImageComparison`
- `ProcessGallery`
- `SystemDiagram`
- `RoleBreakdown`
- `ReflectionBlock`

This combination supports software screens, UX research evidence, creative-code prototypes, system diagrams, process sequences, video, comparisons, role clarity, and reflective outcomes without changing the route template.

## Multi-project and lightweight-project verification

Two temporary projects were added without route-template changes:

1. **Next Case** — published, `detailPage: true`, not featured on the homepage
2. **Lightweight Study** — published and featured, `detailPage: false`

Observed results:

- Next Case received its own static detail route.
- Signal Path linked forward to Next Case.
- Next Case linked back to Signal Path.
- Lightweight Study appeared as a complete homepage summary.
- Lightweight Study generated no detail route and no false case-study link.
- Its footer displayed the non-interactive “Homepage summary” state.

Both fixtures were deleted after verification, leaving only `test-project.mdx`.

## Final quality gate

`npm run ci` completed successfully:

- Astro check: 0 errors, 0 warnings, 0 hints
- Content validation: passed
- Formatting check: passed
- Static build: passed
- Local homepage: HTTP 200
- Local test detail page: HTTP 200
- Local detail video: HTTP 200, `video/mp4`

## Deferred to Phase E

- Real case-study writing and project-specific evidence
- Final project selection and ordering
- Real software interfaces, process media, system diagrams, and prototype videos
- Final résumé, LinkedIn URL, Profile biography, portrait, Experience, and Education
