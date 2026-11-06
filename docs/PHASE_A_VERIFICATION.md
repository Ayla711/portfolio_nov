# Phase A Verification Record

> **Historical snapshot.** This record describes an earlier phase of the project and is kept for reference only. It may mention the old `/portfolio` base, the placeholder origin, or outdated content. The site is now deployed at https://yuanqianayla.com/; see the README for the current setup.

Date: 2026-08-28

Phase A has been verified with temporary content only. The repository was restored to one `test-project.mdx` entry after the state tests.

## Final quality gate

`npm run ci` completed successfully and ran the same local checks configured for pull requests:

- `astro check`: 0 errors, 0 warnings, 0 hints
- `validate:content`: passed for one project
- `prettier --check`: all files matched
- `astro build`: generated the homepage, 404 page, and test-project detail page

## Content-state tests

| Scenario                                               | Observed result                                                     |
| ------------------------------------------------------ | ------------------------------------------------------------------- |
| Test project order `10`, control order `20`            | Test project appeared first                                         |
| Test project order changed to `30`                     | Control project appeared first                                      |
| Removed test-project `featuredOrder`                   | Project disappeared from the homepage; detail route remained        |
| `detailPage: false` while project remained featured    | Homepage summary remained; detail route was not generated           |
| `status: draft` with no `featuredOrder`                | Project disappeared from both homepage and production detail routes |
| `published` + no `featuredOrder` + `detailPage: false` | Content validator failed with an unreachable-project error          |
| Two featured projects set to `presentation: hero`      | Content validator failed because it found two heroes                |
| One or more featured projects with exactly one hero    | Content validator passed                                            |

The temporary order-control entry used for these checks was deleted after verification.

## Asset and base-path tests

- The local cover image was validated through the Content Collection image helper.
- Astro generated four optimized responsive cover variants.
- Built image, project, video, and file URLs all include the configured `/portfolio/` base.
- The local preview returned HTTP `200` for:
  - `/portfolio/`
  - `/portfolio/project/test-project/`
  - `/portfolio/media/projects/test-project/preview.mp4`
  - `/portfolio/files/path-test.txt`
- The MP4 response used the `video/mp4` content type.

`public/files/path-test.txt` and the matching “Resume path test” link are Phase A fixtures. Replace them with the final PDF path and “Resume” label during content integration.

## GitHub readiness

- Node 24 is pinned in `.nvmrc`.
- Exact dependency resolution is committed through `package-lock.json`.
- `.github/workflows/ci.yml` runs the complete quality gate on pushes and pull requests.
- `.github/workflows/deploy.yml` checks, builds, and uploads `dist/` to GitHub Pages.

The workflows can only be observed remotely after the repository is pushed to GitHub. Before deployment, replace the placeholder `site` origin in `astro.config.mjs` with the real GitHub Pages or custom-domain origin.
