import type { Lang } from "@/interfaces";
import type { MetadataRoute } from "next";

export default function sitemap({
  lang,
}: {
  lang: Lang;
}): MetadataRoute.Sitemap {
  const domain = process.env.DOMAIN;

  return [
    {
      url: domain + "/" + lang + "/tournament",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: domain + "/" + lang + "/tournament/create",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: domain + "/" + lang + "/tournament/participate",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
