import style from "./Navbar.modules.css";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
export default function Navbar() {
  let Context = useContext(UserContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top  ">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4 ms-1" to="/">
            <i className="fa-solid fa-cart-shopping main-color"></i>Fresh Cart
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {Context.userToken ? (
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Wishlist">
                    Wishlist
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Cart">
                    Cart
                  </Link>
                </li>
              </ul>
              <div className="nav-item me-5 d-flex">
                <Link
                  className="nav-link mx-2"
                  onClick={() => {
                    localStorage.clear();
                    Context.setUserToken(null);
                  }}
                  to={"Login"}
                >
                  Logout
                </Link>
                <span>
                  <Link className="nav-link" to="Cart">
                    <i className="fa-solid fa-cart-shopping main-color"></i>
                  </Link>
                </span>
              </div>
            </div>
          ) : (
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="Register"
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
