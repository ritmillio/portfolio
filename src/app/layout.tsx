import "@/app/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

/** Providers */
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/app/providers/theme-provider";

export const metadata: Metadata = {
  title: "Hello World",
  description: "Hello World",
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
          <ThemeProvider
            attribute="class"
            defaultTheme="dark" // default theme -> system if you want to use user preference
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
