import { Dispatch, SetStateAction } from "react";

export type LayoutProps = {
  children: React.ReactNode;
};

export type ProductContextProps = {
  children: React.ReactNode;
};

export type CardProductProps = {
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  price?: string;
  rating?: any;
  review?: any;
};

export type FilterProps = {
  options: Record<string, string>[];
  label?: string;
  // setFilter: Dispatch<SetStateAction<string>>;
  control: any;
};
