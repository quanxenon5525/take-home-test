"use client";
import { CircularProgress } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { ProductContextProps } from "../types";
import useLocalStorage from "../hooks/use-local-storage";

interface CartItem {
  id: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

interface ProductContextType {
  data: any[];
  loading: boolean;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  handleRemoveItem: (id: string) => void;
  calculateTotalPrice: () => number;
}

export const ProductContext = createContext<ProductContextType>({
  data: [],
  loading: true,
  cartItems: [],
  addToCart: () => {},
  updateCartItemQuantity: () => {},
  handleRemoveItem: () => {},
  calculateTotalPrice: () => 0,
});

export const ProductProvider = ({ children }: ProductContextProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [productStorage, setProductStorage] = useLocalStorage(
    "productInCart",
    []
  );

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        if (typeof window.location !== undefined) {
          setProductStorage(JSON.stringify(updatedItems));
        }
        return updatedItems;
      }
      const updatedItems = [...prevItems, { ...item, quantity: 1 }];
      if (typeof window.location !== undefined) {
        setProductStorage(JSON.stringify(updatedItems));
      }
      return updatedItems;
    });
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return; // Không cho phép số lượng nhỏ hơn 1
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      if (typeof window.location !== undefined) {
        setProductStorage(JSON.stringify(updatedItems));
      }
      return updatedItems;
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      if (typeof window.location !== undefined) {
        setProductStorage(JSON.stringify(updatedItems));
      }
      return updatedItems;
    });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

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

  useEffect(() => {
    if (typeof window.location !== undefined) {
      setProductStorage(JSON.stringify(cartItems));
    }
  }, [cartItems]);

  if (loading)
    return (
      <div className="flex flex-col items-center mt-[30%] space-y-5">
        <CircularProgress color="inherit" />
        <p className="font-bold">Please waiting a few minutes...</p>
      </div>
    );

  return (
    <ProductContext.Provider
      value={{
        data,
        loading,
        cartItems,
        addToCart,
        updateCartItemQuantity,
        handleRemoveItem,
        calculateTotalPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
