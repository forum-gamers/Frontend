import { verifyToken, customToken, customVerify } from "@/helpers/jwt";
import type { CustomSession } from "@/interfaces";
import type { NextAuthOptions, Session, TokenSet } from "next-auth";
import type { JWT } from "next-auth/jwt";
import credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        access_token: {
          placeholder: "access_token",
          type: "access_token",
          label: "access_token",
        },
      },
      async authorize(credentials) {
        try {
          const {
            id,
            isVerified = false,
            discordData = null,
            ...rest
          } = verifyToken(credentials?.access_token);

          return {
            id,
            name: "user",
            access_token: credentials?.access_token,
            isVerified,
            discordData,
          };
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  jwt: {
    decode({ secret, token }) {
      return customVerify(token, secret) as JWT;
    },
    encode({ secret, token }) {
      return customToken(token as JWT, secret);
    },
  },
  callbacks: {
    session({
      session,
      token,
    }: {
      session: Session | CustomSession | any;
      token: TokenSet;
    }) {
      session.user.id = token.id;
      session.user.access_token = token.access_token;
      session.user.isVerified = token.isVerified;
      session.user.discordData = token.discordData ?? null;

      return session;
    },
    jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT | any;
      user?: any;
      account?: any;
      profile?: any;
      isNewUser?: boolean | undefined;
    }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.discordData = user.discordData ?? null;
      }
      if (account) {
        token.access_token = user?.access_token;
      }
      return token;
    },
  },
};
