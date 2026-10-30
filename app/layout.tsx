import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BootstrapJs from "@/components/BootstrapJs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Paraíso",
  description: "Reserva tu habitación en Hotel Paraíso",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        <div className="flex-1">
          {children}
        </div>

        <footer className="bg-green-800 text-white text-center py-4 mt-8">
          <p>Hotel Paraíso &copy; 2026</p>
        </footer>
        <BootstrapJs />
      </body>
    </html>
  );
}
