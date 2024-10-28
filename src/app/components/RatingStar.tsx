import { Rating } from "@mui/material";
import { RatingReview } from "../types";

export const RatingStar = (rating: RatingReview | any) => {
  const integerValue = Math.round(rating?.rate) || 0;
  const precision = 1;

  return (
    <Rating
      name="half-rating-read"
      value={integerValue}
      precision={precision}
      readOnly
    />
  );
};
