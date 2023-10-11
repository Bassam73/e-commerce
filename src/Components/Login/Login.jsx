import React, { useContext, useEffect } from "react";
import style from "./Login.modules.css";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
export default function Login() {
  let { setUserToken } = useContext(UserContext);
  let nav = useNavigate();
  async function sendData(values) {
    console.log("Hello");

    let req = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      values
    );
    console.log("Hello", req);
    let token = req.data.token;
    console.log(token);
    if (req.data.message == "success") {
      localStorage.setItem("userToken", req.data.token);
      setUserToken(req.data.token);
      nav("/");
      console.log("done");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Email format doesnt valid")
      .required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,20}/, "Password is not valid")
      .required("Password is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendData,
    validationSchema,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-75 mx-auto mt-5">
          <h2>Login Now :</h2>

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

          <label htmlFor="userPassword" className="mt-4">
            Password:
          </label>
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
          <div className="mt-3 d-flex justify-content-between">
            <Link className="reg-log-Link " to="/Forgetpassword">
              Forget your password?
            </Link>
            <button type="submit" className="reglog rounded-2">
              Login Now
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
