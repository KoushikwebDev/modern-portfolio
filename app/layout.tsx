import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarsCanvas from "@/components/StarCanvas";
import FluidCursor from "@/components/FluidCursor";
import { DesignRotator } from "@/components/DesignRotator";
import { DesignIndicator } from "@/components/DesignIndicator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Portfolio",
  description:
    "A beautiful portfolio website built with Next.js and Framer Motion",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <DesignRotator>
            <div className="relative" style={{ isolation: 'isolate' }}>
              <StarsCanvas />
              <Navbar />
              {children}
              <Footer />
            </div>
            <DesignIndicator />
          </DesignRotator>
        </Providers>
        <FluidCursor />
      </body>
    </html>
  );
}
