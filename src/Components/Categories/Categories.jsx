import axios from "axios";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RotatingSquare } from "react-loader-spinner";
import { useQuery } from "react-query";
import style from "./Categories.modules.css";
export default function Categories() {
  let { data, isLoading } = useQuery("getCats", getCats);
  console.log(data);
  function getCats() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  return (
    <>
      <Toaster />
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center w-100  vh-100">
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
        <div>
          <div className="container py-5">
            <div className="row py-5 g-2">
              {data?.data.data.map((cat) => {
                return (
                  <>
                    <div className="col-md-4 ">
                      <div className="category">
                        <img
                          src={cat.image}
                          height={300}
                          className="w-100"
                          alt=""
                        />
                        <h2 className="text-center">{cat.name}</h2>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
