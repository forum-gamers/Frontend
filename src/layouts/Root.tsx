import { memo, Suspense } from "react";
import "@/styles/globals.css";
import "aos/dist/aos.css";
import TopLoader from "nextjs-toploader";
import { SessionProvider } from "@/providers/Session";
import AppThemeProvider from "@/providers/Theme";
import type { ChildrenProps } from "@/interfaces";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import InitPage from "@/layouts/Init";
import type { UserAttributes } from "@/interfaces/model";
import LoadGPT from "@/components/scripts/gpt";
import LoadGtm from "@/components/scripts/gtm";

const font = Inter({ subsets: ["latin"], variable: "--font-sans" });

export interface RootLayoutProps extends ChildrenProps {
  user: UserAttributes | null;
}

function RootLayout({ children, user }: RootLayoutProps) {
  return (
    <html lang="id-ID" suppressContentEditableWarning suppressHydrationWarning>
      <head>
        <LoadGPT />
        <LoadGtm />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>Forum Gamers</title>
      </head>
      <body
        className={cn(font.variable, `bg-background dark:bg-dark-theme-600`)}
      >
        <Suspense>
          <SessionProvider>
            <AppThemeProvider>
              <TopLoader
                color="#05b6d3"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #05b6d3,0 0 5px #45c6c0"
              />
              <InitPage user={user}>{children}</InitPage>
            </AppThemeProvider>
          </SessionProvider>
        </Suspense>
      </body>
    </html>
  );
}

export default memo(RootLayout);
