import { LANGS } from "@/constants/global";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.DOMAIN;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/*"],
    },
    sitemap: [
      `${domain}/sitemap.xml`,
      ...LANGS.map((lang) => `${domain}/${lang}`),
    ],
  };
}
