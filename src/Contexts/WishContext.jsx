import axios from "axios";
import { createContext } from "react";

export let wishContext = createContext();

export default function WishContextProvider({ children }) {
  let token = localStorage.getItem("userToken");
  function addProductToWishList(id) {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: id },
      {
        headers: {
          token,
        },
      }
    );
  }
  function getWishList() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token,
      },
    });
  }
  function removeFromWishList(id) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: { token },
      }
    );
  }
  return (
    <wishContext.Provider
      value={{ addProductToWishList, getWishList, removeFromWishList }}
    >
      {children}
    </wishContext.Provider>
  );
}
