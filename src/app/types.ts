export type LayoutProps = {
  children: React.ReactNode;
};

export type MainBodyProps = {
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
  data?: string[];
};
