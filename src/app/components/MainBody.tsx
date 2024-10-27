"use client";

import React, { FC } from "react";
import { MainBodyProps } from "../types";

export const MainBody: FC<MainBodyProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      {children}
    </div>
  );
};
