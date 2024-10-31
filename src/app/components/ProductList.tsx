import { Box, Grid2, InputAdornment, TextField } from "@mui/material";
import { Fragment, useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductContext } from "../context/ProductDataContext";
import { CardProductProps } from "../types";
import { BasicBreadcrumbs } from "./Breadcrumbs";
import { FilterProduct } from "./FilterProduct";
import { ProductCard } from "./ProductCard";
import { SortProduct } from "./SortProduct";
import { SearchIcon } from "../../../public/icons/SearchIcon";

export const ProductList = () => {
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useContext(ProductContext);

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
    const filtered = data.filter((product: CardProductProps) => {
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

      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesPrice && matchesRating && matchesSearch;
    });

    return filtered.sort((a: CardProductProps, b: CardProductProps) => {
      switch (sortOption) {
        case "priceLowToHigh":
          return Number(a.price) - Number(b.price);
        case "priceHighToLow":
          return Number(b.price) - Number(a.price);
        case "ratingHighToLow":
          return Number(b.rating.rate) - Number(a.rating.rate);
        case "nameAToZ":
          return a.title.localeCompare(b.title);
        case "nameZToA":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [data, filters, sortOption, searchTerm]);

  return (
    <Fragment>
      <div className="px-3">
        <div className="row-start-2 row-end-3 w-full">
          <BasicBreadcrumbs />
          <Box className="w-full flex flex-col md:flex-row justify-between px-5 py-3 md:justify-center mb-5">
            <FilterProduct control={control} options={options} />
            <SortProduct
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </Box>
        </div>
        <Box className="mb-5 flex justify-center">
          <TextField
            className="max-w-full w-[50%] rounded"
            variant="outlined"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon width={24} height={24} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <div className="row-start-3 row-end-4 w-full">
          <Grid2 container spacing={3} className="flex justify-center">
            {filteredData.map((value: CardProductProps, index: number) => {
              return (
                <ProductCard
                  key={index}
                  id={value.id}
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
