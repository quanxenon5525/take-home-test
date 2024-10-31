"use client";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useMemo, useState } from "react";
import { CloseIcon } from "../../../public/icons/CloseIcon";
import { DeleteIcon } from "../../../public/icons/DeleteIcon";
import { MinusIcon } from "../../../public/icons/MinusIcon";
import { PlusIcon } from "../../../public/icons/PlusIcon";
import { VisibleIcon } from "../../../public/icons/VisibleIcon";
import { ProductContext } from "../context/ProductDataContext";
import useMobileView from "../hooks/mobile-view";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../components/Loading";

const CartPage = () => {
  const router = useRouter();
  const {
    cartItems,
    updateCartItemQuantity,
    handleRemoveItem,
    calculateTotalPrice,
  } = useContext(ProductContext);

  const { width } = useMobileView();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleClickOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  const handleCheckout = () => {
    cartItems.forEach((item) => {
      handleRemoveItem(item.id);
    });
    localStorage.removeItem("cartItems");
    router.push("/");
  };

  const paginatedData = useMemo(
    () => cartItems.slice(0, page * itemsPerPage),
    [cartItems, page, itemsPerPage]
  );

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="p-4">
      <div className="text-center">
        <Typography variant="h5" gutterBottom>
          Sản phẩm trong giỏ hàng của bạn:
        </Typography>

        <InfiniteScroll
          dataLength={paginatedData.length}
          next={fetchMoreData}
          hasMore={paginatedData.length < cartItems.length}
          loader={<Loading />}
        >
          <div className="flex flex-col items-center">
            {cartItems?.map((item, index) => (
              <Box
                key={index}
                // className="flex flex-col items-center justify-between w-full max-w-2xl px-5 py-4 border rounded-lg sm:flex-row space-y-2"
                className="box-cart"
              >
                <div className="relative">
                  <IconButton
                    onClick={() => handleClickOpen(item.image)}
                    className="absolute top-[-15px] right-[-10px]"
                  >
                    <VisibleIcon fontSize="large" />
                  </IconButton>
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    alt={item.title}
                  />
                </div>
                <Typography className="flex-1 mx-4">{item.title}</Typography>
                <Box className="flex items-center">
                  <IconButton
                    onClick={() => {
                      if (item.quantity === 1) {
                        handleRemoveItem(item.id);
                      } else {
                        updateCartItemQuantity(item.id, item.quantity - 1);
                      }
                    }}
                    color="secondary"
                  >
                    <MinusIcon />
                  </IconButton>
                  <Typography className="mx-2">{item.quantity}</Typography>
                  <IconButton
                    onClick={() =>
                      updateCartItemQuantity(item.id, item.quantity + 1)
                    }
                    color="secondary"
                  >
                    <PlusIcon />
                  </IconButton>
                </Box>
                <Typography className="mx-4">
                  Giá: ${item.price * item.quantity}
                </Typography>
                <IconButton
                  onClick={() => handleRemoveItem(item.id)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </div>
        </InfiniteScroll>
        <Typography variant="h6" className="font-bold mt-4 mb-4">
          Tổng giá: ${calculateTotalPrice()}
        </Typography>
        <Button onClick={handleCheckout} variant="contained" color="primary">
          <Typography variant="h6" className="text-white">
            Thanh toán
          </Typography>
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="flex justify-center">
          <Image
            src={selectedImage}
            width={500}
            height={500}
            alt="Image error"
            className="rounded"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartPage;
