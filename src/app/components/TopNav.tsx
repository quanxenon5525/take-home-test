import { Badge, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { CartIcon } from "../../../public/icons/CartIcon";
import { ProductContext } from "../context/ProductDataContext";
import useMobileView from "../hooks/mobile-view";

export const TopNav = () => {
  const router = useRouter();
  const { cartItems } = useContext(ProductContext);
  const totalItems = cartItems.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0
  );
  const { width }: any = useMobileView();
  const isMobile = width <= 768;

  return (
    <div
      className="relative w-full h-96 bg-cover bg-center"
      style={{
        backgroundImage: 'url("/background.jpeg")',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0 flex flex-col justify-between">
        <div className="fixed top-0 left-0 right-0 flex justify-between items-center w-full px-8 py-2 backdrop-brightness-75 bg-black bg-opacity-50 z-10">
          <div>
            <Link className="hover:bg-transparent" href="/">
              <p className="font-logo text-lg w-24 text-center text-white hover:text-gray-300">
                Good thing take time
              </p>
            </Link>
          </div>
          {!isMobile && (
            <div className="flex gap-5 text-white uppercase ">
              <Link
                href="/"
                className="text-base header-text transition duration-0 hover:duration-150 ease-in-out hover:text-gray-300"
              >
                <p>Home</p>
              </Link>
              <Link
                href="#"
                className="text-base header-text transition duration-0 hover:duration-150 ease-in-out hover:text-gray-300"
              >
                <p>About us</p>
              </Link>
              <Link
                href="#"
                className="text-base header-text transition duration-0 hover:duration-150 ease-in-out hover:text-gray-300"
              >
                <p>Shop</p>
              </Link>
              <Link
                href="#"
                className="text-base header-text transition duration-0 hover:duration-150 ease-in-out hover:text-gray-300"
              >
                <p>Contact</p>
              </Link>
            </div>
          )}
          <IconButton
            className="hover:bg-gray-400"
            onClick={() => router.push("/cart")}
          >
            <Badge badgeContent={totalItems} color="secondary">
              <CartIcon color="white" />
            </Badge>
          </IconButton>
        </div>

        {!isMobile && (
          <div className="absolute bottom-5 right-5 flex gap-3">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
              Shop now
            </button>
            <button className="px-4 py-2 bg-gray-400 hover:bg-gray-600 text-white rounded-md">
              Explore more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
