import sharpService from "astro/assets/services/sharp";
import type { LocalImageService } from "astro";
import { versionDevImageUrl } from "../utils/dev-image-version";

const service: LocalImageService = {
  ...sharpService,
  async getURL(options, config) {
    const url = await sharpService.getURL(options, config);
    return import.meta.env.DEV ? versionDevImageUrl(url) : url;
  },
};

export default service;
