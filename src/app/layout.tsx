import type { Metadata } from "next";
import { Outfit, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohit Raj | Futuristic Full Stack Developer & AI Engineer Portfolio",
  description: "Explore the JARVIS-inspired portfolio of Rohit Raj, Computer Science Engineering Student and Full Stack Developer. Featuring next-generation UI, coding analytics, and 3D skill orbit visualizations.",
  keywords: [
    "Rohit Raj",
    "Portfolio",
    "Computer Science Student",
    "Full Stack Developer",
    "SRM Institute of Science and Technology",
    "JARVIS UI",
    "React",
    "Next.js",
    "Three.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${orbitron.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505] text-white flex flex-col font-sans select-none scroll-smooth">
        {children}
      </body>
    </html>
  );
}
