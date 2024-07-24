export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      BACKEND_BASE_URL: string;
      SECRET: string;
      DOMAIN: string;
    }
  }
}
