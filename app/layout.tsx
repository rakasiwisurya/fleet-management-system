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
  title: "Fleet Management System",
  description:
    "Fleet Management System that integrates with the MBTA V3 API to monitor vehicle locations, trip status, and operational data in real time.",
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
