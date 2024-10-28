import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="text-md font-normal row-start-3 flex gap-6 flex-wrap items-center justify-center bg-neutral-700 w-full text-white p-2">
      @ Copyright {currentYear}
    </div>
  );
};
