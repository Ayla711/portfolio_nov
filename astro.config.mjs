import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeSectionHeadingIds from "./src/plugins/rehype-section-heading-ids.mjs";

export default defineConfig({
  site: "https://yuanqianayla.com",
  output: "static",
  trailingSlash: "always",
  image: {
    service: { entrypoint: "./src/services/image-service.ts" },
  },
  markdown: {
    rehypePlugins: [rehypeSectionHeadingIds],
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.endsWith("/404/"),
    }),
  ],
});
