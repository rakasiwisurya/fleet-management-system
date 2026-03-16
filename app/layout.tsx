import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import MainLayout from "./MainLayout";

import "leaflet/dist/leaflet.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fms-mit.vercel.app"),

  title: "Fleet Management System",
  description:
    "Fleet Management System that integrates with the MBTA V3 API to monitor vehicle locations, trip status, and operational data in updated time.",

  openGraph: {
    title: "Fleet Management System",
    description:
      "Monitor MBTA vehicles in real-time with route filtering and map tracking.",
    siteName: "Fleet Management System",
    images: [
      {
        url: "/images/bus-icon.png",
        width: 630,
        height: 630,
        alt: "Fleet Management System",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    images: ["/images/bus-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className}`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
