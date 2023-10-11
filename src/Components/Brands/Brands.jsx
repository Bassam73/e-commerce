import React from "react";
import style from "./Brands.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { RotatingSquare } from "react-loader-spinner";

export default function Brands() {
  let { data, isLoading } = useQuery("getBrands", getBrands);
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  return (
    <>
      <Toaster />
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center w-100 vh-100 ">
          <div>
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
        </div>
      ) : (
        <div className="container py-5">
          <h2 className="main-color text-center my-4 fs-1">All Brands</h2>

          <div className="row g-2 py-4">
            {data?.data.data.map((brand) => {
              console.log(brand);
              return (
                <>
                  <div className="col-md-3 ">
                    <div className="brand">
                      <img
                        src={brand.image}
                        className="w-100"
                        alt={brand.slug}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
