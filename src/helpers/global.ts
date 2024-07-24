"use server";

import type { CustomSession } from "@/interfaces";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function getServerSideSession() {
  return (await getServerSession(authOptions)) as CustomSession | null;
}

export const domainUrl = (url: string) => `${process.env.DOMAIN}/${url}`;
