import React, { FC } from "react";
import { LayoutProps } from "../../types";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";

export const Layout: FC<LayoutProps> = ({ children }) => {
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
