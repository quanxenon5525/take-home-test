export type LayoutProps = {
  children: React.ReactNode;
};

export type ProductContextProps = {
  children: React.ReactNode;
};

export interface RatingReview {
  rate?: number;
  count?: number;
}
export type CardProductProps = {
  title: string;
  image: string;
  description: string;
  category: string;
  price: number;
  rating: RatingReview;
};

export type FilterProps = {
  options: Record<string, string>[];
  label?: string;
  control: any;
};
