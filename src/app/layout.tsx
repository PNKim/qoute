"use client";
import "./globals.css";
import jwtInterceptor from "@/utils/jwtInterceptor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  jwtInterceptor();

  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
