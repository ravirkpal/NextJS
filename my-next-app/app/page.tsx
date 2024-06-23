'use client'

import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard/page";
import { useRouter } from "next/navigation";
import Login from "./login/page";

const Home = () => {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const credit = localStorage.getItem("user");
    if (!credit) {
      setIsLoginOpen(true);
    }
  }, [router]);

  return (
    <>
      <div>
        <Dashboard />
      </div>
      <Login open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Home;
