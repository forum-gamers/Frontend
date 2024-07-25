"use server";

import type { CustomSession } from "@/interfaces";
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
