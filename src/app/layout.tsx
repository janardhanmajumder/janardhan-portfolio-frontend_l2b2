import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans as FontSans, Outfit as FontHeading } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "@/lib/Provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = FontHeading({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "JANARDHAN | Home",
  description: "Passionate web developer skilled in creating dynamic, user-friendly websites with innovative design and seamless functionality. Web Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-7xl mx-auto",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
