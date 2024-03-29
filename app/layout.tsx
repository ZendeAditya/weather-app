import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ weight: "300", subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} bg-[url('https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYXRoZXJ8ZW58MHwwfDB8fHww')] bg-center bg-cover bg-no-repeat `}
      >
        {children}
      </body>
    </html>
  );
}
