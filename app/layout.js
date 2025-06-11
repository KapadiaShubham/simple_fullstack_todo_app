import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Todo App',
  description: 'A simple fullstack todo app with MongoDB and Next.js 15',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`p-4 bg-gray-100 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
