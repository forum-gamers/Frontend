"use server";

import type { CustomSession, Lang } from "@/interfaces";
import type { UserRecomendationSource } from "@/interfaces/model";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function getServerSideSession() {
  return (await getServerSession(authOptions)) as CustomSession | null;
}

export const domainUrl = (url: string) => `${process.env.DOMAIN}/${url}`;

export const isInIndonesia = (latitude: number, longitude: number) => {
  const indonesiaBoundingBox = {
    north: 5.9,
    south: -10.5,
    west: 95.0,
    east: 141.0,
  };

  return (
    latitude <= indonesiaBoundingBox.north &&
    latitude >= indonesiaBoundingBox.south &&
    longitude >= indonesiaBoundingBox.west &&
    longitude <= indonesiaBoundingBox.east
  );
};

export const getSourceDescription = (
  source: UserRecomendationSource,
  lang: Lang = "id"
) => {
  switch (source) {
    case "community":
      return lang === "id"
        ? "kamu berada di komunitas yang sama"
        : "you are in same community";
    case "group":
      return lang === "id"
        ? "kamu berada di grup chat yang sama"
        : "you are in same group chat";
    case "tag":
      return lang === "id"
        ? "kamu mungkin memiliki ketertarikan yang sama"
        : "you may have same interest";
    default:
      return "";
  }
};

export const isValidUUID = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id
  );
