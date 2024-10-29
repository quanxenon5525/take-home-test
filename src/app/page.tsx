"use client";
import HomeLayout from "./components/HomeLayout";
import { ProductList } from "./components/ProductList";
import { ProductProvider } from "./context/ProductDataContext";

export default function Home() {
  return (
    <ProductProvider>
      <HomeLayout>
        <ProductList />
      </HomeLayout>
    </ProductProvider>
  );
}
