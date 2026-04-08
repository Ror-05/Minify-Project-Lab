// npm install react-hot-toast

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Minify - Smart URL Shortener",
  description: "Minify is a fast and intelligent URL shortener that lets you create clean, customizable short links with ease. Track clicks, set expiry dates, and manage your links with powerful analytics—all in one simple platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
      
        <body className="min-h-screen flex flex-col bg-linear-to-br from-slate-900 via-gray-900 to-slate-800">
          <SessionWrapper>
            <Navbar/>
            <main className="flex-1">
              {children}
              <Toaster position="top-center" toastOptions={{style: {background: "#181E29",color: "#C9CED6",border: "1px solid #323E59",},}}/>
            </main>
          </SessionWrapper>
        </body>
    </html>
  );
}
