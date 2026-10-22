import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artfolio — Discover Art. Support Artists.",
  description: "Discover original art, fine art prints, photography and digital creations from independent artists.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}