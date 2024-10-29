import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home Test",
  description: "Shopping template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
