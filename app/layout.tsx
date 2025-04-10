import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { TrackProvider } from "@/context/TrackContext";

const geistSans = Figtree({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lyrify | Turn your favorite lyrics into shareable art",
  description:
    "Lyrify transforms your emotions, memories, or random rants into high quality images, use it as a wallpaper or get a poloroid!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className={`${geistSans.className}  antialiased`}>
        <TrackProvider>{children}</TrackProvider>
      </body>
    </html>
  );
}
