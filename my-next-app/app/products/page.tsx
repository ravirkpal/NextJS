/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/modules/loading";
import { toast } from "react-toastify";
import { Product } from "@/app/components/Interface/page";
import { BiSearch } from "react-icons/bi";
import { useRouter, usePathname } from "next/navigation";
import { IoStarSharp } from "react-icons/io5";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(true);
 const router = useRouter();
 const pathname = usePathname()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        console.log("products :", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        toast.error("Error fetching data!");
      }
    };

    fetchData();
  }, []);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  if (loading) {
    return (
      <div className="loading-tag">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-4 bg-sky-100">
      <div className="p-2 flex justify-between items-center mb-2 shadow">
        <p className="text-2xl font-bold">Products</p>

        <div className="p-2.5 flex items-center w-[400px] rounded-md px-4 mb-1 duration-300 cursor-pointer bg-gray-700 text-white">
          <BiSearch className="text-[24px]" />
          <input
            type="text"
            placeholder="Search"
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
            onChange={handleFilter}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 justify-items-center mx-auto">
        {products
          .filter((item) =>
            item.title.toLowerCase().includes(filterValue.toLowerCase())
          )
          .map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-80 rounded-lg overflow-hidden c-shadow p-4 flex flex-col items-center bg-white m-3 transform hover:scale-105 transition duration-300"
              onClick={() => router.push(`${pathname}/${item.id}`)}
            >
              <div className="w-full h-64 flex justify-center items-center">
                <img
                  src={item.image}
                  alt={`Product Image ${index}`}
                  className="object-contain h-full"
                />
              </div>
              <div className="w-full mt-4 text-center">
                <p className="font-bold text-lg">{item.title}</p>
                <p className="text-gray-700 text-sm truncate">
                  {item.description}
                </p>
                <p className="text-start font-medium flex items-center">
                  <IoStarSharp className="text-yellow-500" />
                  &nbsp;{item.rating.rate}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold text-xl">${item.price}</p>
                  <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-4 rounded">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
