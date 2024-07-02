import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react"; // Import ReactNode for type annotations

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SurveyApp",
  description: "Admin side of the survey/notice distribution system",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en">
       <body>
       {/* <MainLayout>{children}</MainLayout> */}
       {children}
       </body>
    </html>
  );
}
