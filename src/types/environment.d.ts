export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      BACKEND_BASE_URL: string;
      SECRET: string;
      DOMAIN: string;
      GOOGLE_OAUTH_CLIENTID: string;
      GOOGLE_OAUTH_CLIENT_SECRET: string;
      DISCORD_CLIENT_ID: string;
    }
  }
}
