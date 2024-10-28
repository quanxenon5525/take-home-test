"use client";
import { Grid2 } from "@mui/material";
import { Fragment, useContext, useMemo } from "react";
import { CardProductProps } from "../types";
import { ProductContext } from "./context/ProductDataContext";
import { FilterList } from "./FilterList";
import { ProductCard } from "./ProductCard";
import { useForm } from "react-hook-form";
import { BasicBreadcrumbs } from "./Breadcrumbs";
import CircularProgress from "@mui/material/CircularProgress";

export const ProductList = () => {
  const { data, loading } = useContext(ProductContext);
  const options = useMemo(() => {
    return data.filter(
      (option: any, index, self) =>
        index ===
        self.findIndex(
          (value: CardProductProps) => value?.category === option?.category
        )
    );
  }, [data]);
  const { control, watch } = useForm({
    defaultValues: {
      category: "",
      maxPrice: 1000,
      minRating: 5,
    },
  });

  const filters = watch();
  const filteredData = useMemo(() => {
    return data
      .filter((product: CardProductProps) => {
        const matchesCategory = filters.category
          ? product.category === filters.category
          : true;

        const price = Number(product.price);
        const maxPrice = Number(filters.maxPrice);
        const matchesPrice = maxPrice ? price <= maxPrice : true;

        const minRating = Number(filters.minRating);
        const matchesRating = minRating
          ? Number(product.rating.rate) <= minRating
          : true;

        return matchesCategory && matchesPrice && matchesRating;
      })
      .sort((a: CardProductProps, b: CardProductProps) => {
        const ratingDifference = Number(b.rating.rate) - Number(a.rating.rate);
        if (ratingDifference !== 0) return ratingDifference;
        return Number(b.price) - Number(a.price);
      });
  }, [data, filters]);

  if (!data && loading) return <CircularProgress />;
  // if (!data && loading) return <LoadingList />;

  return (
    <Fragment>
      <div className="px-3">
        <div className="row-start-2 row-end-3 w-full">
          <BasicBreadcrumbs />
          <div className="flex flex-row px-5 py-3 items-center mb-5 max-w">
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
                  rating={value.rating}
                />
              );
            })}
          </Grid2>
        </div>
      </div>
    </Fragment>
  );
};
