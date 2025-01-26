import "@/app/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { config } from "@/config";

/** Providers */
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/app/providers/theme-provider";

export const metadata: Metadata = {
  title: config.layout.meta.name,
  description: config.layout.meta.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={config.layout.lang}
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme={config.layout.defaultTheme}
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
