import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Forum Gamers",
    short_name: "Forum Gamers",
    description: "Social media and forum for gamer",
    start_url: "/",
    display: "browser",
  };
}
