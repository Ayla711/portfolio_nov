import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const homeSchema = z.object({
  challenge: z.string().min(1),
  contributions: z.array(z.string().min(1)).min(2).max(3),
  outcome: z.string().min(1),
});

// Detail pages rebuilt from a project's PDF (see docs/PORTFOLIO_WEBSITE_PLAN.md §7.1).
const pdfPageSchema = z.object({
  tagline: z.string().min(1).optional(),
  // Hide the cover/video block in the hero (the home card still uses `cover`).
  hideHeroMedia: z.boolean().default(false),
  facts: z
    .array(z.object({ label: z.string().min(1), value: z.string().min(1) }))
    .default([]),
  // Reading stops for the sticky left chapter rail: 4–6 short labels
  // (Overview, Challenge, Solution …), each pointing at a <section id>.
  rail: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z][a-z0-9-]*$/),
        label: z.string().min(1),
      }),
    )
    .min(1)
    .max(7),
});

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.mdx",
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        summary: z.string().min(1),
        year: z.number().int().min(2000).max(2100),
        role: z.string().min(1),
        team: z.string().min(1),
        duration: z.string().min(1),
        platforms: z.array(z.string().min(1)).min(1),
        capabilities: z.array(z.string().min(1)).min(3).max(5),
        technologies: z.array(z.string().min(1)).default([]),
        status: z.enum(["draft", "published", "archived"]),
        detailPage: z.boolean(),
        // Instead of a detail page on this site, the card opens this link
        // (e.g. a PDF on Google Drive). Requires detailPage: false.
        externalUrl: z.url().optional(),
        homeSection: z.enum(["projects", "others"]).default("projects"),
        caseStudyType: z
          .enum(["design", "research", "coursework", "video", "pdf"])
          .default("design"),
        featuredOrder: z.number().int().nonnegative().optional(),
        // Legacy V1 fields remain readable but no longer control card layout.
        presentation: z.enum(["hero", "standard", "compact"]).optional(),
        home: homeSchema.optional(),
        cover: image(),
        coverAlt: z.string().min(1),
        // Optional detail-page hero image; the home card always uses `cover`.
        heroCover: image().optional(),
        heroVideo: z
          .object({
            provider: z.literal("youtube"),
            id: z.string().regex(/^[A-Za-z0-9_-]{11}$/),
            title: z.string().min(1),
          })
          .optional(),
        homeSecondary: z
          .object({
            image: image(),
            alt: z.string().min(1),
          })
          .optional(),
        pdfPage: pdfPageSchema.optional(),
        previewPoster: image().optional(),
        previewVideo: z.string().min(1).optional(),
      })
      .superRefine((project, context) => {
        const isFeatured = project.featuredOrder !== undefined;

        if (project.caseStudyType === "video" && !project.heroVideo) {
          context.addIssue({
            code: "custom",
            path: ["heroVideo"],
            message: "Video details require a YouTube heroVideo.",
          });
        }

        if (project.externalUrl && project.detailPage) {
          context.addIssue({
            code: "custom",
            path: ["externalUrl"],
            message:
              "externalUrl replaces the detail page; set detailPage: false.",
          });
        }

        if (project.caseStudyType === "pdf" && !project.pdfPage) {
          context.addIssue({
            code: "custom",
            path: ["pdfPage"],
            message: "PDF-based details require pdfPage with rail stops.",
          });
        }

        if (project.status !== "published" && isFeatured) {
          context.addIssue({
            code: "custom",
            path: ["featuredOrder"],
            message: "Only published projects may appear on the homepage.",
          });
        }

        if (project.previewVideo && !project.previewPoster) {
          context.addIssue({
            code: "custom",
            path: ["previewPoster"],
            message: "A preview video requires a preview poster.",
          });
        }

        if (project.previewVideo?.startsWith("/")) {
          context.addIssue({
            code: "custom",
            path: ["previewVideo"],
            message: "Public media paths must not start with a slash.",
          });
        }
      }),
});

export const collections = { projects };
