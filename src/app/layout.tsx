import "@/app/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

/** Providers */
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import LenisScrollProvider from "./providers/lenis-provider";

export const metadata: Metadata = {
  title: "Zoltan Fodor",
  description: "Portfolio Website of Zoltan Fodor - @ritmillio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <LenisScrollProvider>
            <TooltipProvider delayDuration={0}>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark" // default theme -> system if you want to use user preference
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </TooltipProvider>
          </LenisScrollProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
