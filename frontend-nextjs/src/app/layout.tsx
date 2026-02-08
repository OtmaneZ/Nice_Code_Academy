import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nice Code Academy - Apprendre Python",
  description: "Plateforme interactive pour apprendre Python de manière ludique et progressive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
