import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MementoAI - Never Build The Same Thing Twice",
  description: "Your AI-powered coding memory layer. Stop recreating the same integrations over and over. Turn your GitHub history into an intelligent coding assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Script to prevent flashing of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storageKey = "mementoai-theme";
                  const theme = localStorage.getItem(storageKey) || "system";
                  const isDark = theme === "dark" || 
                    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
                  
                  document.documentElement.classList.add(isDark ? "dark" : "light");
                } catch (e) {
                  console.error(e);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          defaultTheme="system"
          storageKey="mementoai-theme"
      >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
