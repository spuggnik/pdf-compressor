import type { Metadata } from "next";

import "./globals.css";
import { ReactNode } from "react";



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
  children: ReactNode;
}>) {
  return (
      <html lang="en">
        <body>
        {children}
          
        </body>
      
      </html>
  );
}
