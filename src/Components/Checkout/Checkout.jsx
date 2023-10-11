import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";

export default function Checkout() {
  let { id } = useParams();

  async function order(shippingAdress) {
    let res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      { shippingAdress },
      {
        headers: { token: localStorage.getItem("userToken") },
      }
    );

    window.location.href = res.data.session.url;
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: order,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-75 mx-auto py-5 d-flex flex-column">
          <label htmlFor="userDetails" className="mt-4">
            Details:
          </label>
          <input
            id="userDetails"
            className="form-control"
            onBlur={formik.handleBlur}
            value={formik.values.details}
            onChange={formik.handleChange}
            type="tel"
            name="details"
          />

          <label htmlFor="userPhone" className="mt-4">
            Phone:
          </label>
          <input
            id="userPhone"
            className="form-control"
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            onChange={formik.handleChange}
            type="tel"
            name="phone"
          />
          <label htmlFor="userCity" className="mt-4">
            City:
          </label>
          <input
            id="userCity"
            className="form-control"
            onBlur={formik.handleBlur}
            value={formik.values.city}
            onChange={formik.handleChange}
            type="text"
            name="city"
          />
          <div className="mt-3 d-flex justify-content-between">
            <button type="submit" className="reglog w-100 rounded-2">
              Pay now
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
