import React, { useContext, useState } from "react";
import style from "./Products.modules.css";
import axios from "axios";
import { RotatingSquare } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { wishContext } from "../../Contexts/WishContext";

export default function Products() {
  let [searchValue, setSearch] = useState("");
  let { isLoading, isFetching, data } = useQuery("getProducts", getProducts);
  let nav = useNavigate();
  let { addProductToCart } = useContext(CartContext);
  let { addProductToWishList } = useContext(wishContext);
  async function addToCart(id) {
    let { data } = await addProductToCart(id);
    console.log(data);
    if (data?.status === "success") {
      console.log("done");
      toast("Product added to your cart successfully😘✅ ");
    }
  }
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  async function addToWishlist(id) {
    await addProductToWishList(id);
    toast("The product added to your wishlist successfuly ✅😘.");
  }
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
        <div className="container py-5">
          <input
            type="text"
            id="searchTitle"
            placeholder="search a product by name"
            className="form-control w-75 mx-auto mt-5"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <div className="row py-5 g-2">
            {data?.data.data.map((product) =>
              product?.title
                .toLowerCase()
                .includes(searchValue.toLocaleLowerCase()) ? (
                <div className="col-md-3 ">
                  <div className="product">
                    <div
                      onClick={() => {
                        nav(`/ProductDetails/${product._id}`);
                      }}
                    >
                      <img className="w-100" src={product.imageCover} alt="" />
                      <h5 className="main-color h6">{product.category.name}</h5>

                      <h3 className=" h6">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="d-flex justify-content-between">
                        <span> {product.price} EGP</span>
                        <span>
                          <i className="fa fa-star gold-star "></i>{" "}
                          {product.ratingsAverage}
                        </span>
                      </div>
                      <div></div>
                    </div>
                    <span className="d-flex justify-content-end mt-3">
                      <i
                        className="fa-solid fa-heart h4"
                        onClick={() => {
                          addToWishlist(product._id);
                        }}
                      ></i>
                    </span>
                    <button
                      onClick={() => {
                        addToCart(product._id);
                      }}
                      className="btn bg-success text-white w-75 mt-3 ms-4"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
