import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
export default function CategorySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  let { data } = useQuery("getAllCat", getAllCat);

  function getAllCat() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  return (
    <>
      <div className="container mt-5 py-5 mb-4">
        <Slider {...settings}>
          {data?.data.data.map((category) => (
            <img src={category.image} height={250} className="w-100" alt="" />
          ))}
        </Slider>
      </div>
    </>
  );
}
