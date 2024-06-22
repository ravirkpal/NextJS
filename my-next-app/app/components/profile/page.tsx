"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import User from "../Interface/page";

const Profile = () => {
  const [data, setData] = useState<User[]>([]);
  const [filterData, setFilterData] = useState<User[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get<User[]>(
        "https://fakestoreapi.com/users"
      );
      setData(response.data);
      setFilterData(response.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (userId: number) => {
    console.log(`Edit user with ID: ${userId}`);
    router.push(`/profile/${userId}`); 
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.trim() === "") {
      setFilterData(data); 
    } else {
      const filtered = data.filter(
        (item) =>
          item.name.firstname.toLowerCase().includes(searchValue) ||
          item.name.lastname.toLowerCase().includes(searchValue) ||
          item.address.city.toLowerCase().includes(searchValue) ||
          item.username.toLowerCase().includes(searchValue) ||
          item.email.toLowerCase().includes(searchValue) ||
          item.phone.toLowerCase().includes(searchValue) 
      );
      setFilterData(filtered);
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      console.log(`Deleting user with ID: ${userId}`);
      await axios.delete(`https://fakestoreapi.com/users/${userId}`);
      setData((prevData) => prevData.filter((item) => item.id !== userId));
      setFilterData((prevData) => prevData.filter((item) => item.id !== userId)); 
      console.log(`User with ID ${userId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="p-2 flex justify-between items-center">
        <p className="text-2xl font-bold">UserData</p>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border-2 border-gray-700"
          onChange={handleFilter}
        />
      </div>
      <div className="w-full">
        <table className="min-w-full bg-white border">
          <thead className="bg-[#383939] text-white">
            <tr>
              <th className="py-2">Sr. No</th>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Username</th>
              <th className="py-2">City</th>
              <th className="py-2">Phone No</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((user, index) => (
              <tr key={user.id} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{`${user.name.firstname} ${user.name.lastname}`}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.address.city}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(user.id)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    onClick={() => handleDelete(user.id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
