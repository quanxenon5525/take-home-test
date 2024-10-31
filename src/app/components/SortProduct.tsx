import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SortProductProps } from "../types";

export const SortProduct = ({
  sortOption,
  setSortOption,
}: SortProductProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value as string);
  };

  return (
    <Select
      value={sortOption}
      onChange={handleChange}
      displayEmpty
      className="md:w-[15%] w-[55%] h-[5%]"
    >
      <MenuItem value="">Sort by</MenuItem>
      <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
      <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
      <MenuItem value="ratingHighToLow">Rating: High to Low</MenuItem>
      <MenuItem value="nameAToZ">Name: A-Z</MenuItem>
      <MenuItem value="nameZToA">Name: Z-A</MenuItem>
    </Select>
  );
};
