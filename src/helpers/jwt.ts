import { type JwtPayload, verify, sign } from "jsonwebtoken";
import type { JWT } from "next-auth/jwt";

export interface TokenValue extends JwtPayload {
  id: string;
  isVerified: boolean;
}

export const verifyToken = (token: string | any): JwtPayload =>
  verify(token, process.env.SECRET) as TokenValue;

export const createToken = (payload: object): string =>
  sign(payload, process.env.SECRET);

export const customVerify = (
  token: string | undefined,
  secret: string | Buffer
): JwtPayload | string | JWT =>
  verify(token as string, secret, { algorithms: ["HS256"] });

export const customToken = (
  token: string | JWT,
  secret: string | Buffer
): string => sign(token as string, secret, { algorithm: "HS256" });
