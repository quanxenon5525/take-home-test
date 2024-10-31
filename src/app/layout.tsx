import type { Metadata } from "next";
import "./globals.css";
import { ProductProvider } from "./context/ProductDataContext";
import HomeLayout from "./components/HomeLayout";

export const metadata: Metadata = {
  title: "Good thing take time",
  description: "Shopping template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.png" type="image/x-icon" />
      <body suppressHydrationWarning>
        <ProductProvider>
          <HomeLayout>{children}</HomeLayout>
        </ProductProvider>
      </body>
    </html>
  );
}
