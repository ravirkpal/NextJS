"use client";

import React, { useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginProps {
  open: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ open, onClose }) => {
  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCredit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://fakestoreapi.com/auth/login",
        credential
      );
      console.log("credential:", response.data);
      toast.success("Login successful!");
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("credentials", JSON.stringify(credential));
      setLoading(false);
      onClose(); // Close the modal after successful login
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      setLoading(false);
    }
  };

  if (!open) return null; // Render nothing if modal is not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-gray-800 bg-opacity-50">
      <div className="relative w-full max-w-md p-8 mx-auto my-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <h2 className="text-2xl font-semibold">Login</h2>
        </div>
        <form onSubmit={login}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              onChange={handleCredit}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              onChange={handleCredit}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-600 focus:outline-none"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
