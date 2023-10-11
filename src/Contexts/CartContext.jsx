import axios from "axios";

const { useState, useContext } = require("react");
const { createContext } = require("react");
const { UserContext } = require("./UserContext");
const { useQuery } = require("react-query");

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let token = localStorage.getItem("userToken");

  function addProductToCart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getCartData() {
    return axios
      .get(
        "https://ecommerce.routemisr.com/api/v1/cart",

        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function removeSpecificItem(id) {
    console.log("hello");
    console.log(id);
    console.log(token);
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function clearCart() {
    console.log("hello");

    console.log(token);
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: token,
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function updateProductQuantity(id,count) {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count,
      },
      {
        headers: {
          token: token,
        },
      }
    );
  }
  return (
    <CartContext.Provider
      value={{
        updateProductQuantity,
        clearCart,
        removeSpecificItem,
        addProductToCart,
        getCartData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
