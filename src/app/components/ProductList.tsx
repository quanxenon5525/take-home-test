"use client";
import { Grid2 } from "@mui/material";
import { Fragment, useContext, useMemo, useState } from "react";
import { CardProductProps } from "../types";
import { ProductContext } from "./context/ProductDataContext";
import { FilterList } from "./FilterList";
import { LoadingList } from "./LoadingList";
import { ProductCard } from "./ProductCard";
import { useForm } from "react-hook-form";
import { BasicBreadcrumbs } from "./Breadcrumbs";

export const ProductList = () => {
  const { data, loading } = useContext(ProductContext);

  const { control, watch } = useForm({
    defaultValues: {
      category: "",
      maxPrice: 500,
      //   rating: "",
    },
  });

  const options = useMemo(() => {
    return data.filter(
      (option: any, index, self) =>
        index ===
        self.findIndex(
          (value: CardProductProps) => value?.category === option?.category
        )
    );
  }, [data]);
  const filters = watch();

  const filteredData = useMemo(() => {
    return data.filter((product: CardProductProps) => {
      const matchesCategory = filters.category
        ? product.category === filters.category
        : true;

      const price = Number(product.price);
      const maxPrice = Number(filters.maxPrice);
      const matchesPrice = maxPrice ? price <= maxPrice : true;

      //   const matchesRating = filters.rating
      //     ? product.rating.rate >= parseFloat(filters.rating)
      //     : true;

      return matchesCategory && matchesPrice;
    });
  }, [data, filters]);

  if (!data && loading) return <LoadingList />;
  return (
    <Fragment>
      <div className="px-3">
        <div className="row-start-2 row-end-3 w-full">
          <div className="flex flex-row px-5 py-3 items-center mb-5 max-w">
            {/* <BasicBreadcrumbs /> */}
            <FilterList control={control} options={options} />
          </div>
        </div>
        <div className="row-start-3 row-end-4 w-full">
          <Grid2 container spacing={3} className="flex justify-center">
            {filteredData.map((value: CardProductProps, index: number) => {
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
      </div>
    </Fragment>
  );
};
