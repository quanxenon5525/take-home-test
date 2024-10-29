import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { CardProductProps } from "../types";
import { CardActionArea, Chip } from "@mui/material";
import { RatingStar } from "./RatingStar";

export const ProductCard: FC<CardProductProps> = ({
  title,
  description,
  image,
  category,
  price,
  rating,
}) => {
  const handleProduct = () => {
    console.log("==> product");
  };
  return (
    <Card sx={{ maxWidth: "250px", height: "auto" }}>
      <CardActionArea onClick={handleProduct}>
        <CardMedia
          component="img"
          className="aspect-square w-full h-full object-contain px-5"
          image={image}
          alt="Product Image"
        />
        <CardContent className="max-h-full">
          <div className="flex flex-row justify-between items-center">
            <Chip label={category} className="mb-2" />
            <p className="font-semibold">{price} $</p>
          </div>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="line-clamp-2"
          >
            {title}
          </Typography>
          <Typography
            className="min-h-44"
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className="ml-3">
        <div className="font-semibold">Review: {rating?.count} reviews </div>
        <RatingStar rate={rating?.rate} />
      </div>

      <CardActions className="mt-5 flex justify-center">
        <Button size="small" color="primary">
          Buy it now
        </Button>
        <Button size="small" color="primary">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
