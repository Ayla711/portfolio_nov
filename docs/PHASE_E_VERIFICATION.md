# Phase E Verification Record

> **Historical snapshot.** This record describes an earlier phase of the project and is kept for reference only. It may mention the old `/portfolio` base, the placeholder origin, or outdated content. The site is now deployed at https://yuanqianayla.com/; see the README for the current setup.

Date: 2026-08-28

Phase E replaces the temporary architecture fixture with real portfolio content sourced from `Portfolio_Yuanqian Liu.pdf`.

## Project hierarchy

| Homepage order | Project              | Presentation | Detail page | Portfolio role                                      |
| -------------- | -------------------- | ------------ | ----------- | --------------------------------------------------- |
| 10             | PhageX               | Hero         | Yes         | Primary software, UX, and immersive-system case     |
| 20             | EchoBloom            | Standard     | Yes         | Creative coding and app-design case                 |
| 30             | LingGou EduBot       | Standard     | Yes         | Product strategy and cross-functional case          |
| 40             | The Reading Pensieve | Compact      | Yes         | Focused emerging-experience exploration             |
| 50             | Tutela               | Compact      | No          | Supporting physical interaction and research sample |

The hierarchy is controlled entirely by frontmatter. There are no project-number labels or project-specific page files, so future projects can replace any entry without changing the shared page structure.

## Homepage completeness

Every featured project now includes:

- a direct problem statement
- role, team, duration, and platform facts
- three to five capability tags
- two or three specific personal contributions
- a concrete outcome or validated limitation
- a project-specific cover image

This lets a recruiter understand the breadth and priority of the work from the homepage. Detail pages provide evidence and reflection without adding a third navigation level.

## Case-study migration

Four complete detail pages use the same five-chapter contract:

1. Overview
2. Key Insight
3. Design Decisions
4. Prototype & Experience
5. Outcome & Reflection

The writing distinguishes working prototypes from simulated experiences. PhageX and The Reading Pensieve explicitly identify video compositing and experience simulation; neither claims production hardware or validated detection accuracy.

## Media migration

The source PDF stores each portfolio page as one flattened image. Website assets were therefore exported as project-specific crops rather than uploaded as full PDF pages.

The migration removes page numbers, portfolio numbering, QR codes, and most slide-level headings. Astro Assets validates and generates responsive WebP variants from the retained PNG sources at build time.

Prototype walkthroughs remain external YouTube links because the corresponding source video files are not present in the workspace. They can be replaced with poster-first local video previews later without changing the content model.

## Placeholder cleanup

- Removed the Signal Path test project.
- Removed the test preview video and gradient images.
- Removed the test résumé file and hid the résumé links until a final PDF is available.
- Removed unused cropped media that was not selected for the website.

## Verification

`npm run ci` passes with:

- Astro check: 0 errors, 0 warnings, 0 hints
- Content validation: 5 valid projects and exactly 1 homepage hero
- Formatting check: passed
- Static build: 6 pages generated
- Detail routes: PhageX, EchoBloom, LingGou EduBot, and The Reading Pensieve
- Homepage-only route state: Tutela has no detail page

Browser checks:

- 1440 × 900 homepage: five projects appear in the intended order and hierarchy
- 1440 × 900 PhageX detail page: all five chapters and evidence components render
- 390 × 844 homepage: no horizontal overflow
- 390 × 844 PhageX prototype section: comparison media stacks to one column and all visible images load

## Deferred to Phase F or final-content handoff

- Final résumé PDF and résumé link
- Final LinkedIn URL
- Final profile portrait, experience, and education data
- Local source video files for optimized poster-first previews
- Deployment-domain, SEO, social-image, and production accessibility audit
