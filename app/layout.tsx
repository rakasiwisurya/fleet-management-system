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
  metadataBase: new URL("https://fms-mit.arcdigitalinnovation.my.id"),

  title: "Fleet Management System",

  description:
    "Fleet Management System that integrates with the MBTA V3 API to monitor vehicle locations, trip status, and operational data in updated time.",

  openGraph: {
    type: "website",
    url: "https://fms-mit.arcdigitalinnovation.my.id",
    title: "Fleet Management System",
    description:
      "Fleet Management System that integrates with the MBTA V3 API to monitor vehicle locations, trip status, and operational data in updated time.",
    images: [
      {
        url: "https://metatags.io/images/meta-tags.png",
        width: 1200,
        height: 630,
        alt: "Fleet Management System",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Fleet Management System",
    description:
      "Fleet Management System that integrates with the MBTA V3 API to monitor vehicle locations, trip status, and operational data in updated time.",
    images: ["https://metatags.io/images/meta-tags.png"],
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
