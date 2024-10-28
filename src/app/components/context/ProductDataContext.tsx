"use client";

import { ProductContextProps } from "@/app/types";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext({
  data: [],
  loading: false,
});

export const ProductProvider = ({ children }: ProductContextProps) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("https://fakestoreapi.com/products").then(
          (res) => res.json()
        );
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={{ data, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
