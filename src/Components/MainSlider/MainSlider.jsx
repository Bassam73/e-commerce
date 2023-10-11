import React from "react";
import Banner1 from "../../Assets/imgs/slider-image-1.jpeg";
import Banner2 from "../../Assets/imgs/slider-image-2.jpeg";
import Banner3 from "../../Assets/imgs/slider-image-3.jpeg";
import Blog1 from "../../Assets/imgs/blog-img-1.jpeg";
import Blog2 from "../../Assets/imgs/blog-img-2.jpeg";

import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 p-0">
            <Slider {...settings}>
              <img src={Banner1} height={500} className="w-100" alt="" />
              <img src={Banner2} height={500} className="w-100" alt="" />
              <img src={Banner3} height={500} className="w-100" alt="" />
            </Slider>
          </div>
          <div className="col-md-4 p-0">
            <img src={Blog1} height={250} className="w-100" alt="" />
            <img src={Blog2} height={250} className="w-100" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
