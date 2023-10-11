import React from "react";
import style from "./Home.modules.css";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { RotatingSquare } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Products from "../Products/Products";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";


export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <Products />;
    </>
  );
}
