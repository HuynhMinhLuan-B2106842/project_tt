import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./components/AuthContext";
import { ReactNode } from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phòng Khám Đa Khoa",
  description: "Hệ thống quản lý quy trình khám bệnh tại phòng khám đa khoa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
