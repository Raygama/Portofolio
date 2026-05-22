import type { Metadata } from "next";
import { Syne, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "M. Daffa Raygama — AI Engineer",
  description:
    "AI Engineer building LLM agents, real-time AI pipelines, and open-source tools. Currently at PT Sigma Cipta Utama.",
  authors: [{ name: "M. Daffa Raygama" }],
  keywords: ["AI Engineer", "LLM", "Machine Learning", "Next.js", "Portfolio"],
  openGraph: {
    title: "M. Daffa Raygama — AI Engineer",
    description:
      "AI Engineer building LLM agents, real-time AI pipelines, and open-source tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
