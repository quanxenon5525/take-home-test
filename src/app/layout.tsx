import type { Metadata } from "next";
import "./globals.css";
import { ProductProvider } from "./context/ProductDataContext";
import HomeLayout from "./components/HomeLayout";

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
      <body suppressHydrationWarning>
        <ProductProvider>
          <HomeLayout>{children}</HomeLayout>
        </ProductProvider>
      </body>
    </html>
  );
}
