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

export const FilterList: FC<FilterListProps> = ({ control, options }) => {
  const categoryOptions = Array.from(
    new Set(options.map((option) => option.category))
  );
  return (
    <div className="flex flex-row space-x-5 items-center">
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Autocomplete
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
          <div className="flex flex-col">
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
          <div className="flex flex-col">
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
