import React from "react";
import style from "./Register.modules.css";
import { Formik, useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

export default function Register() {
  async function sendData(values) {
    console.log("Hello");
    let req = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      values
    );
    console.log("Hello", req);
  }
  let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  let validationSchema = Yup.object({
    name: Yup.string("Must be string")
      .min(3, "Length more than 3")
      .max(15, "Length less than 15")
      .required("Name is required"),
    email: Yup.string()
      .email("Email format doesnt valid")
      .required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegex, "Phone is not valid")
      .required("Phone is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,20}/, "Password is not valid")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")])
      .required("Repassword is required"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: sendData,
    validationSchema,
  });
  return (
    <>
      <div className="w-75 mx-auto mt-5">
        <form onSubmit={formik.handleSubmit}>
          <h3>Register Now :</h3>
          <label htmlFor="userName">Name:</label>
          <input
            id="userName"
            className="form-control"
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
            type="text"
            name="name"
          />

          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger ">{formik.errors.name}</div>
          ) : (
            ""
          )}
          <label htmlFor="userEmail">Email:</label>
          <input
            id="userEmail"
            className="form-control"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            name="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className=" alert alert-danger">{formik.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="userPhone">Phone:</label>
          <input
            id="userPhone"
            className="form-control"
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            onChange={formik.handleChange}
            type="tel"
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger ">{formik.errors.phone}</div>
          ) : (
            ""
          )}
          <label htmlFor="userPassword">Password:</label>
          <input
            id="userPassword"
            className="form-control"
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            name="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger ">{formik.errors.password}</div>
          ) : (
            ""
          )}
          <label htmlFor="userRePassword">Re Password:</label>
          <input
            id="userRePassword"
            className="form-control"
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            type="password"
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger ">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <button type="submit" className="reglog ms-auto mt-4">
            RegisterNow
          </button>
        </form>
      </div>
    </>
  );
}
