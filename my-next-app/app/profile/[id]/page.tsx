"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/app/components/Interface/page";
import Loading from "@/app/components/modules/loading";

const Profile = ({ params }: { params: { id: number } }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const userId = params.id;

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<User>(
          `https://fakestoreapi.com/users/${userId}`
        );
        setUser(response.data);
        setUserData({
          email: response.data.email,
          username: response.data.username,
          firstname: response.data.name?.firstname || "",
          lastname: response.data.name?.lastname || "",
          city: response.data.address?.city || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const updatedUser = {
        ...user,
        email: userData.email,
        username: userData.username,
        name: {
          firstname: userData.firstname,
          lastname: userData.lastname,
        },
        address: {
          city: userData.city,
        },
      };

      const response = await axios.put(
        `https://fakestoreapi.com/users/${userId}`,
        updatedUser
      );

      console.log("Updated user data:", response.data);
      router.push("/profile");
      setLoading(false);

    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-tag">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            className="p-2 m-1 border border-gray-300"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            className="p-2 m-1 border border-gray-300"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="p-2 m-1 border border-gray-300"
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="p-2 m-1 border border-gray-300"
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleChange}
            className="p-2 m-1 border border-gray-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
