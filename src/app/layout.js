import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Movie Reviews",
  description:
    "Welcome to Movie Reviews! Read the latest movie reviews from users and critics.",
  openGraph: {
    title: "Movie Reviews",
    description:
      "Welcome to Movie Reviews! Find the best movie reviews and ratings from real users!",
    type: "website",
    url: "#",
    images: ["image-url"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-rows-[2rem_1fr_2rem] items-start justify-items-start min-h-screen px-8 pt-0 pb-20 gap-16 sm:px-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
