# Phase C Verification Record

Date: 2026-08-28

Phase C completes the reusable homepage project stream. Real projects and final media are intentionally deferred; the repository was restored to one published test project after verification.

## Project-summary system

One `ProjectSummary` component now supports three content-controlled presentation modes:

- `hero`: the current priority case with the largest editorial title and media treatment
- `standard`: a full mini-case with medium visual weight
- `compact`: a split desktop composition for experiments and supporting work, with the same core evidence

Every mode renders the same stable content contract:

- project name and one-sentence definition
- role, team, duration, and platform
- three to five capability tags
- optimized project media
- Challenge
- My contribution
- Outcome
- optional case-study link

No project number, project-specific layout condition, or fixed project count is present in the component.

## Poster-first media behavior

The shared `ProjectPreview` component provides:

- Astro-optimized responsive Poster/still images
- no initial video `src` in built HTML
- base-safe video path stored in `data-src`
- Hero playback only after sufficient viewport visibility and only when reduced motion and data saving are not requested
- desktop pointer playback for eligible devices
- keyboard-focus playback when motion/data preferences allow
- explicit Play/Pause control for keyboard and touch users
- manually initiated playback even when automatic playback is suppressed
- pause and Poster restoration when the project leaves the viewport
- graceful Poster fallback if video loading fails

The final test project generated four responsive Poster variants. Its MP4 remained available at the configured `/portfolio/` base path with a `video/mp4` response.

## Content-only workflow verification

Two temporary project files were added without changing `src/pages/index.astro`:

| Fixture        | `featuredOrder` | Presentation | Initial result |
| -------------- | --------------: | ------------ | -------------- |
| Signal Path    |              10 | hero         | First          |
| Standard Field |              20 | standard     | Second         |
| Compact Signal |              30 | compact      | Third          |

Additional checks:

- Changing Compact Signal to order `15` moved it between the Hero and Standard cases.
- Changing Standard Field to `draft` and removing its order hid it from the homepage.
- All three presentation classes were generated from Frontmatter values.
- Exactly one Hero validation remained active.
- Temporary fixtures were deleted after verification.

These checks confirm that adding, hiding, reweighting, and reordering projects does not require homepage code changes.

## Final quality gate

`npm run ci` completed successfully:

- Astro check: 0 errors, 0 warnings, 0 hints
- Content validation: passed
- Formatting check: passed
- Static build: passed
- Local homepage: HTTP 200
- Local preview video: HTTP 200, `video/mp4`

## Deferred to later phases

- Real project summaries and media
- Final decisions about which projects receive Hero, Standard, or Compact weight
- Full project-detail editorial template and project-to-project navigation
- Final performance measurement with production assets
