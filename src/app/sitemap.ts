import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = process.env.DOMAIN;

  return [
    {
      url: domain + "/feed",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: domain + "/bookmark",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: domain + "/community",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: domain + "/team",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: domain + "/login",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: domain + "/register",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: domain + "/forget-password",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: domain + "/reset-password",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: domain + "/discord/callback",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: domain + "/locked",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: domain + "/offline",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: domain + "/profile",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
  ];
}
