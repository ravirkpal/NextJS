"use client";

import React, { useEffect, useState } from "react";
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
import sidebarOptions from "../../jsonData/page";
import Loading from "../../modules/loading";
import { MdLogin } from "react-icons/md";
import Login from "@/app/login/page";

const Sidebar = () => {
  const router = useRouter();
  const [filterSidebar, setFilterSidebar] = useState(sidebarOptions);
  const [loading, setLoading] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [credit, setCredential] = useState();

  const handleRedirect = (routing: string) => {
    setLoading(true);
    router.push(routing);
    setLoading(false);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredOptions = sidebarOptions.filter((option) =>
      option.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterSidebar(filteredOptions);
  };

  useEffect(() => {
    const storedCredentials = localStorage.getItem("credentials");
    if (storedCredentials) {
      // Parse the stored string back into an object
      const parsedCredentials = JSON.parse(storedCredentials);
      setCredential(parsedCredentials);
    }
  }, []);

  if (loading) {
    return (
      <div className="loading-tag">
        <Loading />
      </div>
    );
  }


  return (
    <>
      <div className="sidebar fixed top-0 bottom-0 p-2 overflow-y-auto text-center bg-gray-900 transition-transform duration-300">
        <div className="text-gray-100 text-4xl">
          <div
            className="p-2.5 mt-1 flex items-center"
            onClick={() => handleRedirect("/")}
          >
            <BiAperture className="px-2 py-1 rounded-md bg-blue-600" />
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">
              Pal Store
            </h1>
            <BiX className="bi bi-x cursor-pointer ml-28 lg:hidden" />
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <div className="p-2.5 flex items-center rounded-md px-4 mb-1 duration-300 cursor-pointer bg-gray-700 text-white">
          <BiSearch className="text-[24px]" />
          <input
            type="text"
            placeholder="Search"
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
            onChange={handleFilter}
          />
        </div>

        {filterSidebar.map((option, index) => (
          <Link key={index} href={option.routing}>
            <div className="text-[15px] hover:bg-blue-600 p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white">
              {option.icon}
              <span className="ml-4 text-gray-200 font-bold">
                {option.title}
              </span>
            </div>
          </Link>
        ))}

        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 text-2xl duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={() => setIsLoginOpen(true)}
        >
          {credit ? <BiLogOut /> : <MdLogin />}
          <span className="text-[15px] ml-4 text-gray-200 font-bold">
            {credit ? "Logout" : "Login"}
          </span>
        </div>
      </div>
      <Login
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
};

export default Sidebar;
