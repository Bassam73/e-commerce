import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

import { UserContext } from "../../Contexts/UserContext";
export default function Layout() {
  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
