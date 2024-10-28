// "use client";
// import { CardProductProps, MainBodyProps } from "@/app/types";
// import React, { createContext, useEffect, useState } from "react";
// import { LoadingList } from "../LoadingList";

// export const ProductContext = createContext<any>({
//   children: Array,
// });

// export const ProductProvider = (children: React.ReactNode) => {
//   const [data, setData] = useState<CardProductProps | any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetch("https://fakestoreapi.com/products").then(
//           (res) => res.json()
//         );
//         setData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <LoadingList />;

//   return (
//     <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
//   );
// };
