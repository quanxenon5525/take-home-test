import { Rating } from "@mui/material";

export const RatingStar = ({ rating }: { rating: number }) => {
  const integerValue = Math.floor(rating);
  const precision = rating % 1 === 0 ? 1 : 0.5;

  return (
    <Rating
      name="half-rating-read"
      defaultValue={integerValue}
      precision={precision}
      readOnly
    />
  );
};
