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
      <div className="text-center space-y-5">
        <Typography variant="h5" gutterBottom>
          Sản phẩm trong giỏ hàng của bạn:
        </Typography>

        <InfiniteScroll
          dataLength={paginatedData.length}
          next={fetchMoreData}
          hasMore={paginatedData.length < cartItems.length}
          loader={<Loading />}
        >
          <div className="flex flex-col items-center space-y-5">
            {cartItems?.map((item, index) => (
              <Box key={index} className="box-cart">
                <div className="relative mr-8">
                  <IconButton
                    onClick={() => handleClickOpen(item.image)}
                    className="icon-visible"
                  >
                    <VisibleIcon width={24} height={24} />
                  </IconButton>
                  <Image
                    className="object-cover"
                    src={item.image}
                    width={120}
                    height={120}
                    alt={item.title}
                  />
                </div>
                <Typography>{item.title}</Typography>
                <div className="space-x-5 flex flex-row items-center">
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
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      onClick={() =>
                        updateCartItemQuantity(item.id, item.quantity + 1)
                      }
                      color="secondary"
                    >
                      <PlusIcon />
                    </IconButton>
                  </Box>
                  <Typography>Giá: ${item.price * item.quantity}</Typography>
                  <IconButton
                    onClick={() => handleRemoveItem(item.id)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Box>
            ))}
          </div>
        </InfiniteScroll>
        <div className="space-y-1 mt-5">
          <Typography className="text-lg font-bold text-field">
            Tổng giá: ${calculateTotalPrice()}
          </Typography>
          <Button onClick={handleCheckout} variant="contained" color="primary">
            <Typography className="text-white">Thanh toán</Typography>
          </Button>
        </div>
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
