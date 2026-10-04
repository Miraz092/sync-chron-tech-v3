import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata = {
  title: "Sync Chron Tech — Ideas to Products That Scale",
  description:
    "Sync Chron Tech helps businesses grow with scalable custom software solutions — from design and build to scale.",
};

export const viewport = {
  themeColor: "#4C48FA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
