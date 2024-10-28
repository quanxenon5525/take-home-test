import { Autocomplete, TextField, Slider, Typography } from "@mui/material";
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
  const ratingOptions = Array.from({ length: 11 }, (_, i) =>
    (i * 0.5).toFixed(1)
  );

  return (
    <div className="flex flex-row space-x-5 items-center">
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                onChange={(event, value) => field.onChange(value || "")}
                disablePortal
                options={categoryOptions}
                getOptionLabel={(option) => option || ""}
                isOptionEqualToValue={(option, value) => option === value}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
            )}
          />
        )}
      />

      {/* <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            onChange={(event, value) => {
              console.log("=> value rating", value);
              field.onChange(value || "");
            }}
            disablePortal
            options={ratingOptions}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Rating" />}
          />
        )}
      /> */}

      <Controller
        name="maxPrice"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Slider
            valueLabelDisplay="auto"
            value={value}
            onChange={(event, value) => onChange(value || "")}
            step={10}
            min={0}
            max={500}
            sx={{ width: 200 }}
          />
        )}
      />
    </div>
  );
};
