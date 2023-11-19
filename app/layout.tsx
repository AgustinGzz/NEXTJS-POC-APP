import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agustin' website",
  description: "Agustin's playground"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        <main className='flex flex-col items-center justify-around px-24 py-2'>
          {children}
        </main>
      </body>
    </html>
  );
}
