import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PDF Komprimieren - Kostenlos & Schnell | Simple Tools",
  description: "Komprimiere PDF-Dateien schnell und kostenlos direkt im Browser.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://pdf-compressor-two.vercel.app"),
  openGraph: {
    title: "Simple Tools - PDF-Kompressor",
    description: "Komprimiere PDFs mit einem Klick.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Screenshot des Tools",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple Tools - PDF-Kompressor",
    description: "Komprimiere PDFs mit einem Klick",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <NavBar /> 
        {children}
      </body>
    </html>
  );
}
