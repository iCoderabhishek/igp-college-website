// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LoadingProvider } from "@/components/home/LoadingProvider";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Itahar Government Polytechnic",
  description:
    "Polytechnic College under Government of West Bengal, AICTE Approved",
  icons: {
    icon: "/ita-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <LoadingProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </LoadingProvider>
      </body>
    </html>
  );
}
