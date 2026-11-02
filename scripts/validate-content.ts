import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

type ProjectData = {
  title?: string;
  status?: "draft" | "published" | "archived";
  detailPage?: boolean;
  caseStudyType?: "design" | "research" | "coursework" | "video";
  heroVideo?: { provider: string; id: string; title: string };
  featuredOrder?: number;
  presentation?: "hero" | "standard" | "compact";
  previewVideo?: string;
};

export type ProjectRecord = {
  id: string;
  body: string;
  data: ProjectData;
};

const requiredDetailSections = [
  "overview",
  "insight",
  "decisions",
  "prototype",
  "reflection",
] as const;

export function validateProjectRecords(
  projects: ProjectRecord[],
  publicDirectory: string,
): string[] {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const seenOrders = new Map<number, string>();

  for (const project of projects) {
    if (seenIds.has(project.id))
      errors.push(`Duplicate project id: ${project.id}`);
    seenIds.add(project.id);

    const { data } = project;
    const isPublished = data.status === "published";
    const isFeatured = data.featuredOrder !== undefined;

    if (isFeatured && !isPublished) {
      errors.push(
        `${project.id}: Only published projects may appear on the homepage.`,
      );
    }

    if (isPublished && !isFeatured && data.detailPage === false) {
      errors.push(
        `${project.id}: published project is unreachable from both homepage and detail routes.`,
      );
    }

    if (isFeatured) {
      const existing = seenOrders.get(data.featuredOrder!);
      if (existing) {
        errors.push(
          `${project.id}: featuredOrder ${data.featuredOrder} is already used by ${existing}.`,
        );
      }
      seenOrders.set(data.featuredOrder!, project.id);
    }

    if (data.caseStudyType === "video") {
      if (
        data.heroVideo?.provider !== "youtube" ||
        !/^[A-Za-z0-9_-]{11}$/.test(data.heroVideo?.id ?? "") ||
        !data.heroVideo?.title?.trim()
      ) {
        errors.push(
          `${project.id}: video detail requires a valid YouTube heroVideo.`,
        );
      }
    } else if (data.detailPage) {
      if (!project.body.includes("<CaseSection")) {
        errors.push(
          `${project.id}: detailPage is true but the MDX body has no CaseSection.`,
        );
      }

      const detailSections =
        data.caseStudyType === "coursework"
          ? ["overview"]
          : requiredDetailSections;
      for (const section of detailSections) {
        const hasKind = new RegExp(
          `<CaseSection\\b[^>]*\\bkind=["']${section}["']`,
        ).test(project.body);
        const hasAnchor = new RegExp(
          `<CaseSection\\b[^>]*\\bid=["']${section}["']`,
        ).test(project.body);

        if (!hasKind || !hasAnchor) {
          errors.push(
            `${project.id}: detailPage requires a ${section} CaseSection with id="${section}" and kind="${section}".`,
          );
        }
      }

      if (
        data.caseStudyType === "coursework" &&
        !/<CourseworkContent\b[^>]*\bid=["']original["']/.test(project.body)
      ) {
        errors.push(
          `${project.id}: coursework requires an original CourseworkContent with id="original".`,
        );
      }
    }

    if (data.previewVideo) {
      if (data.previewVideo.startsWith("/")) {
        errors.push(
          `${project.id}: previewVideo must be relative to public without a leading slash.`,
        );
      } else {
        const mediaPath = resolve(publicDirectory, data.previewVideo);
        if (
          !mediaPath.startsWith(`${publicDirectory}/`) ||
          !existsSync(mediaPath)
        ) {
          errors.push(
            `${project.id}: previewVideo does not exist at public/${data.previewVideo}.`,
          );
        }
      }
    }
  }

  return errors;
}

function listMdxFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry);
    return statSync(fullPath).isDirectory()
      ? listMdxFiles(fullPath)
      : extname(entry) === ".mdx"
        ? [fullPath]
        : [];
  });
}

function main() {
  const repositoryRoot = resolve(import.meta.dirname, "..");
  const projectsDirectory = join(repositoryRoot, "src/content/projects");
  const publicDirectory = join(repositoryRoot, "public");
  const projects: ProjectRecord[] = listMdxFiles(projectsDirectory).map(
    (file) => {
      const parsed = matter(readFileSync(file, "utf8"));
      return {
        id: relative(projectsDirectory, file)
          .replace(/\.mdx$/, "")
          .replaceAll("\\", "/"),
        body: parsed.content.trim(),
        data: parsed.data as ProjectData,
      };
    },
  );
  const errors = validateProjectRecords(projects, publicDirectory);

  if (errors.length > 0) {
    console.error("Content validation failed:\n");
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`Content validation passed for ${projects.length} project(s).`);
  }
}

// Importing the validator in tests must not read or validate the working tree.
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main();
}
