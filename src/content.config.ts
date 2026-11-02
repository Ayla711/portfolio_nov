import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const homeSchema = z.object({
  challenge: z.string().min(1),
  contributions: z.array(z.string().min(1)).min(2).max(3),
  outcome: z.string().min(1),
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
        homeSection: z.enum(["projects", "others"]).default("projects"),
        caseStudyType: z
          .enum(["design", "research", "coursework", "video"])
          .default("design"),
        featuredOrder: z.number().int().nonnegative().optional(),
        // Legacy V1 fields remain readable but no longer control card layout.
        presentation: z.enum(["hero", "standard", "compact"]).optional(),
        home: homeSchema.optional(),
        cover: image(),
        coverAlt: z.string().min(1),
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
