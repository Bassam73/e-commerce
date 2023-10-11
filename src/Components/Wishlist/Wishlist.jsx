import React, { useContext, useEffect, useState } from "react";
import { wishContext } from "../../Contexts/WishContext";
import { CartContext } from "../../Contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { RotatingSquare } from "react-loader-spinner";
export default function Wishlist() {
  let [wishlistData, setWishlistData] = useState();
  let { getWishList, removeFromWishList } = useContext(wishContext);
  let { addProductToCart } = useContext(CartContext);
  let isLoading;
  async function getWishData() {
    isLoading = true;
    let { data } = await getWishList();
    setWishlistData(data);
    isLoading = false;
  }

  async function addToCart(id) {
    await addProductToCart(id);
    toast("The product added to your cart successfuly ✅😘.");
  }
  async function removeItem(id) {
    await removeFromWishList(id);

    await getWishData();
    toast("The product remove from your cart successfuly ✅😘.");
  }
  useEffect(() => {
    getWishData();
  }, []);
  return (
    <>
      <Toaster />
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
          <RotatingSquare
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="rotating-square-loading"
            strokeWidth="4"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="container bg-body-tertiary mt-5 ">
          <h2 className="py-5">My wishlist</h2>
          <div className="row">
            {wishlistData?.data.map((product) => {
              return (
                <>
                  <div className="col-md-2">
                    <img src={product.imageCover} className="w-100" alt="" />
                  </div>
                  <div className="col-md-10">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h2>{product.title}</h2>
                        <p className="main-color">{product.price} EGP</p>
                        <span className="text-danger">
                          <i
                            className="fa fa-trash "
                            onClick={() => {
                              removeItem(product._id);
                            }}
                          ></i>
                          Remove
                        </span>
                      </div>
                      <div className=" my-auto">
                        <button
                          className="btn btn-dark"
                          onClick={() => {
                            addToCart(product._id);
                          }}
                        >
                          {" "}
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
