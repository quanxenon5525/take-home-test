import { Box, CardActionArea, Chip } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../context/ProductDataContext";
import { CardProductProps } from "../types";
import { RatingStar } from "./RatingStar";

export const ProductCard: FC<CardProductProps> = ({
  id,
  title,
  description,
  image,
  category,
  price,
  rating,
}) => {
  const { addToCart } = useContext(ProductContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(
        descriptionRef.current.scrollHeight >
          descriptionRef.current.clientHeight
      );
    }
  }, [description]);

  const handleAddToCart = () => {
    addToCart({ id, title, quantity: 1, image, price });
  };

  return (
    <Card
      sx={{
        maxWidth: 250,
        height: "auto",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          className="aspect-square w-full h-full over-ride-img px-10"
          image={image}
          alt="Product Image"
        />
      </CardActionArea>
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
          ref={descriptionRef}
          variant="body2"
          sx={{
            color: "text.secondary",
            maxHeight: isExpanded ? "none" : "250px",
            overflow: isExpanded ? "visible" : "hidden",
            display: "-webkit-box",
            WebkitLineClamp: isExpanded ? "none" : 4,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>
        {isOverflowing && (
          <div className="flex justify-center mt-2">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              size="small"
              color="primary"
            >
              {isExpanded ? "Close" : "View more"}
            </Button>
          </div>
        )}
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p className="font-semibold">Review: {rating?.count} reviews</p>
        <RatingStar rate={rating?.rate} />
        <Box className="flex mt-2">
          <Button size="small" color="primary">
            Buy it now
          </Button>
          <Button size="small" color="primary" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
