import localFont from "next/font/local";
import React from "react";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Happy Santa App",
  description: "Merry Christmas!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blue-500 overflow-hidden">
        <div className="relative z-20 flex flex-col items-center justify-center h-screen text-center text-white">
          {children}
        </div>
      </body>
    </html>
  );
}
