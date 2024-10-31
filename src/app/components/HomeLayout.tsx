"use client";

import { FC } from "react";
import { LayoutProps } from "../types";
import { Footer } from "./Footer";
import { TopNav } from "./TopNav";

const HomeLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] grid-cols-1 min-h-screen gap-8">
      <div className="row-start-1 row-end-2 w-full">
        <TopNav />
      </div>
      {children}
      <div className="row-start-4 row-end-5 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
