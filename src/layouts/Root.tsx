import { Suspense } from "react";
import "aos/dist/aos.css";
import "@/styles/globals.css";
import TopLoader from "nextjs-toploader";
import { SessionProvider } from "@/providers/Session";
import AppThemeProvider from "@/providers/Theme";
import type { ChildrenProps } from "@/interfaces";

/**
 *
 * @TODO : add font, add favicon, color theme
 */
export default function RootLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <html lang="id-ID" suppressContentEditableWarning suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>Forum Gamers</title>
      </head>
      <body>
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
              {children}
            </AppThemeProvider>
          </SessionProvider>
        </Suspense>
      </body>
    </html>
  );
}
