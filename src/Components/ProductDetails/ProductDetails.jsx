import React from "react";
import style from "./ProductDetails.modules.css";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RotatingSquare } from "react-loader-spinner";
import Slider from "react-slick";

export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let { id } = useParams();

  let { isLoading, data } = useQuery("getProductDetails", getProductDetails, {
    cacheTime: 0,
  });
  let product = data?.data.data;

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
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
        <div className="container my-3">
          <div className="row">
            <div className="col-md-4">
              <Slider {...settings}>
                {product?.images.map((image) => {
                  return <img src={image} className="w-100" alt="" />;
                })}
              </Slider>
            </div>
            <div className="col-md-8 d-flex  flex-column justify-content-center">
              <h2>{product?.title}</h2>
              <p>{product?.description}</p>
              <div className="d-flex justify-content-between">
                <span>{product?.price}EGP </span>
                <span>
                  {" "}
                  <i className="fa fa-star"></i> {product?.ratingsAverage}
                </span>
              </div>
              <div className="d-flex justify-content-center mt-4 w-100">
                <button className="btn btn-success w-75"> Add To Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
