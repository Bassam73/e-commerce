import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.modules.css";
import { CartContext } from "../../Contexts/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  let { updateProductQuantity, getCartData, removeSpecificItem, clearCart } =
    useContext(CartContext);
  let [cartData, setCartData] = useState([]);
  let [cartId, setCartId] = useState();

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    let { data } = await getCartData();
    setCartId(data?.data?._id);
    setCartData(data);
    console.log(data);
  }
  async function removeItem(id) {
    let { data } = await removeSpecificItem(id);
    setCartData(data);
  }
  async function clear() {
    let { data } = await clearCart();
    setCartData(data);
  }

  async function updateItem(id, counter) {
    console.log(id);
    let { data } = await updateProductQuantity(id, counter);
    console.log(data);
    setCartData(data);
    console.log("done");
  }

  return cartData ? (
    <>
      <div className="container bg-body-tertiary w-75 my-5">
        <div className="py-4">
          <div className="parent py-3 ">
            <div className="header d-flex justify-content-between">
              <h2>Cart Shop </h2>
              <Link to={"/Checkout/" + cartId} className="btn btn-primary mx-4">
                Check Out
              </Link>
            </div>
            <div className="propriteis">
              <p>
                Total price : <span>{cartData?.data?.totalCartPrice}</span>
              </p>
              <p>
                Total number of items : <span> {cartData.numOfCartItems}</span>
              </p>
            </div>
          </div>

          <div className="row">
            {cartData.data?.products?.map((product) => {
              return (
                <>
                  <div className="col-md-2">
                    <img
                      src={product.product.imageCover}
                      className="w-100"
                      alt=""
                    />
                  </div>
                  <div className="col-md-10 d-flex justify-content-between">
                    <div>
                      <h4>{product.product.title}</h4>
                      <h6 className="main-color">Price : {product.price}</h6>
                      <button
                        className="btn"
                        onClick={() => {
                          removeItem(product._id);
                        }}
                      >
                        <i className="text-danger fa fa-trash"></i>
                        remove
                      </button>
                    </div>
                    <div className="m-4">
                      <button
                        className="btn-brdr rounded"
                        onClick={() => {
                          updateItem(
                            product.product._id,

                            product.count + 1
                          );
                        }}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button
                        className="btn-brdr rounded"
                        onClick={() => {
                          updateItem(product.product._id, product.count - 1);
                        }}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                  </div>
                </>
              );
            })}

            <div className="d-flex justify-content-center my-4">
              <button
                className="btn btn-danger px-5 py-2"
                onClick={() => {
                  clear();
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className=" min-vh-100 w-100 d-flex justify-content-center align-items-center">
      <h2>Your Cart Is empty</h2>
    </div>
  );
}
