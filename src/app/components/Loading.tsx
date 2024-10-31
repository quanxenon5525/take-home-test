import { CircularProgress } from "@mui/material";
import React from "react";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center mt-[30%] space-y-5">
      <CircularProgress color="inherit" />
      <p className="font-bold">Please waiting a few minutes...</p>
    </div>
  );
};
