# Phase E.1 Verification Record

> **Historical snapshot.** This record describes an earlier phase of the project and is kept for reference only. It may mention the old `/portfolio` base, the placeholder origin, or outdated content. The site is now deployed at https://yuanqianayla.com/; see the README for the current setup.

Date: 2026-08-29

## Outcome

Phase E.1 replaces the equal-weight homepage project stream with a recruiter-focused two-level hierarchy while preserving the existing architecture and all project detail content.

The current homepage sequence is now:

| Position | Project              | Presentation | Homepage treatment        |
| -------- | -------------------- | ------------ | ------------------------- |
| 1        | PhageX               | `hero`       | Full two-image mini case  |
| 2        | EchoBloom            | `standard`   | Full two-image mini case  |
| 3        | LingGou EduBot       | `compact`    | Single-image core summary |
| 4        | The Reading Pensieve | `compact`    | Single-image core summary |
| 5        | Tutela               | `compact`    | Single-image core summary |

## Full-case behavior preserved

PhageX and EchoBloom retain the pre-Phase E.1 homepage structure:

- Two 16:9 landscape images
- Role, Team, Duration, and Platform
- Challenge, My contribution, and Outcome
- Capability tags
- Made with line
- Full case-study link

Their project title scale and existing editorial grid were not changed.

## Compact behavior implemented

LingGou EduBot, The Reading Pensieve, and Tutela now render only:

- Project label and year
- Project title and shortened one-sentence definition
- Two priority capability tags
- One 16:9 landscape image
- Role and Platform
- A project link to each compact case

Compact homepage modules no longer render:

- The second homepage image
- Team and Duration
- Challenge, My contribution, and Outcome
- Made with

The compact desktop grid uses equal-width text and media columns. Its title, summary, and facts form one vertical text container aligned to the height range of the single image, removing the large blank area previously left below the media. A dedicated gap separates the capability tags from Role / Platform. The compact footer spans both grid columns below the text-and-image row and right-aligns “View project” to the same edge as the full cases’ “View full case study.” The footer has no internal top divider and uses a reduced row gap, so the link remains inside the project block above its bottom divider. Summary size, fact padding, and internal gaps are reduced while the project-title size, typography, dividers, and media treatment remain consistent with the full cases.

## Content and validation contract

- `home` and `homeSecondary` are required only for homepage projects using `hero` or `standard`.
- `compact` projects may retain those historical fields and assets, but the homepage does not render them.
- Featured projects are sorted by `featuredOrder`; validation requires position 1 to be `hero`, position 2 to be `standard`, and every later position to be `compact`.
- LingGou EduBot was changed from `standard` to `compact`.
- The three compact homepage summaries were shortened without removing detail-page MDX content.
- The Reading Pensieve and LingGou EduBot detail routes remain available. Tutela now also has a five-section detail route, restoring its homepage “View project” entrance.

## Generated-output verification

The production homepage contains:

- 1 `hero` project
- 1 `standard` project
- 3 `compact` projects
- 2 second-image figures, both belonging to the full cases
- 2 Challenge / My contribution / Outcome groups, both belonging to the full cases
- 3 compact Role / Platform fact groups
- 3 compact project links, including Tutela

## Automated checks

- Astro diagnostics: 30 files, 0 errors, 0 warnings, 0 hints
- Content validation: 5 valid projects
- Formatting check: passed
- Static build: passed
- Generated routes: homepage, 404, and five project detail pages
- Sitemap generation: passed

## Deferred to Phase F

- Final résumé and LinkedIn content
- Final personal profile image
- Production domain and social-preview metadata
- Explicit browser-based desktop, tablet, mobile, keyboard, and reduced-motion acceptance testing
- Deployment
