import {
  Autocomplete,
  TextField,
  Slider,
  Typography,
  Rating,
} from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { CardProductProps } from "../types";

interface FilterListProps {
  control: any;
  options: CardProductProps[];
}

export const FilterProduct: FC<FilterListProps> = ({ control, options }) => {
  const categoryOptions = Array.from(
    new Set(options.map((option) => option.category))
  );
  return (
    <div className="w-full flex flex-col md:flex-row md:space-x-5 md:items-center">
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Autocomplete
            className="md:w-[15%] w-[55%]"
            onChange={(event, value) => field.onChange(value || "")}
            disablePortal
            defaultValue={field.value}
            options={categoryOptions}
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
        )}
      />

      <Controller
        name="minRating"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col mt-2 md:mt-0">
            <Typography>Rating:</Typography>
            <Rating
              {...field}
              onChange={(event, newValue) => {
                field.onChange(newValue);
              }}
              value={field.value || 0}
              precision={1}
            />
          </div>
        )}
      />

      <Controller
        name="maxPrice"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col mt-3 md:mt-4">
            <Typography>Price:</Typography>
            <Slider
              defaultValue={field.value}
              valueLabelDisplay="auto"
              value={field.value}
              onChange={(event, value) => field.onChange(value || "")}
              step={10}
              min={10}
              max={1000}
              sx={{ width: 200 }}
            />
          </div>
        )}
      />
    </div>
  );
};
