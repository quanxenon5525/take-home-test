"use client";
import { Autocomplete, TextField } from "@mui/material";
import React, { FC, useContext } from "react";
import { FilterProps } from "../types";

export const FilterList: FC<FilterProps> = () => {
  return (
    <div className="flex flex-row space-x-5">
      {/* <Autocomplete
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      /> */}
      <div>Category</div>
      <div>Category</div>
      <div>Category</div>
    </div>
  );
};
