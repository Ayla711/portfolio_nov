import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://example.github.io",
  base: "/portfolio",
  output: "static",
  trailingSlash: "always",
  image: {
    service: { entrypoint: "./src/services/image-service.ts" },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.endsWith("/404/"),
    }),
  ],
});
