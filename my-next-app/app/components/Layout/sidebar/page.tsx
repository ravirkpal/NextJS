"use client";

import React from "react";
import {
  BiFilter,
  BiX,
  BiSearch,
  BiChevronDown,
  BiAperture,
  BiLogOut,
  BiMessageRoundedDetail,
} from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RiDashboardLine,
  RiCustomerServiceLine,
  RiProductHuntLine,
  RiShoppingCartLine,
  RiContactsLine,
} from "react-icons/ri"; // Import icons from react-icons/ri
import sidebarOptions from "../../jsonData/page";

const Sidebar = () => {
  const router = useRouter();

  const handleRedirect = (routing: string) => {
    router.push(routing);
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute top-5 left-4 cursor-pointer">
        <BiFilter className="px-2 bg-gray-900 rounded-md text-white text-4xl" />
      </div>
      <div className="sidebar fixed top-0 bottom-0 p-2 w-340px overflow-y-auto text-center bg-gray-900 transition-transform duration-300">
        <div className="text-gray-100 text-4xl">
          <div className="p-2.5 mt-1 flex items-center">
            <BiAperture className="px-2 py-1 rounded-md bg-blue-600" />
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">
              Pal Store
            </h1>
            <BiX className="bi bi-x cursor-pointer ml-28 lg:hidden" />
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
          <BiSearch className="text-[24px]" />
          <input
            type="text"
            placeholder="Search"
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          />
        </div>
        {sidebarOptions.map((option, index) => (
          <Link key={index} href={option.routing}>
            <a className="text-[15px] hover:bg-blue-600 p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white">
              {option.icon}
              <span className="ml-4 text-gray-200 font-bold">
                {option.title}
              </span>
            </a>
          </Link>
        ))}
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 text-2xl duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={() => handleRedirect("/logout")}
        >
          <BiLogOut />
          <span className="text-[15px] ml-4 text-gray-200 font-bold">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;