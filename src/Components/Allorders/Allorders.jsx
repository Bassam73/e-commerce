import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { CartContext } from "../../Contexts/CartContext";

export default function Allorders() {
  let { getCartData } = useContext(CartContext);

  async function getCartToken() {
    let data = await getCartData();
    return data?.data?.data?._id;
  }
  async function getData() {
    let id = await getCartToken();

    let req = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
    console.log(req);
  }
  useEffect(() => {
    getData();
    console.log("done");
  }, []);

  return <></>;
}
