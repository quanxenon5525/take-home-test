"use client";
import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { CardProductProps } from "../types";
import { LoadingList } from "./LoadingList";

export const ProductList = () => {
  const [data, setData] = useState<CardProductProps | any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch("https://fakestoreapi.com/products").then(
          (res) => res.json()
        );
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!data && loading) return <LoadingList />;

  return (
    <div className="row-start-3 row-end-4 w-full">
      <Grid2 container spacing={3} className="flex justify-center">
        {data?.map((value: CardProductProps, index: number) => {
          return (
            <ProductCard
              key={index}
              title={value.title}
              image={value.image}
              description={value.description}
              category={value.category}
              price={value.price}
              rating={value.rating.rate}
              review={value.rating.count}
            />
          );
        })}
      </Grid2>
    </div>
  );
};
