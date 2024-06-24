"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./components/modules/loading";
import Login from "./login/page";

const UseAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setIsLoginOpen(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="loading-tag">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Login open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default UseAuth;
