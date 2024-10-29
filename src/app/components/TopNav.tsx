import React from "react";
import { CartIcon } from "../../../public/icons/CartIcon";
import Link from "next/link";

export const TopNav = () => {
  const handleCart = () => {
    console.log("cart clicked");
  };

  return (
    <div
      className="relative w-full h-96 bg-cover bg-center"
      style={{
        backgroundImage: 'url("/background.jpeg")',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0 flex flex-col justify-between">
        <div className="flex justify-between items-center w-full px-5 py-4 backdrop-brightness-75">
          <div>
            <Link href="/">
              <p className="font-logo text-center text-lg w-24 text-white hover:text-gray-300">
                Good thing take time
              </p>
            </Link>
          </div>
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
          <div>
            <button onClick={handleCart}>
              <CartIcon color="white" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-5 right-5 flex gap-3">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
            Shop now
          </button>
          <button className="px-4 py-2 bg-gray-400 hover:bg-gray-600 text-white rounded-md">
            Explore more
          </button>
        </div>
      </div>
    </div>
  );
};
