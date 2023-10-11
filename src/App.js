import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Brands from "./Components/Brands/Brands";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import UserContextProvider from "./Contexts/UserContext";
import Guard from "./Components/Guard/Guard";
import Products from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Contexts/CartContext";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import WishContextProvider from "./Contexts/WishContext";
import Wishlist from "./Components/Wishlist/Wishlist";
import Checkout from "./Components/Checkout/Checkout";
import Allorders from "./Components/Allorders/Allorders";
import Forgetpassword from "./Components/Forgetpassword/Forgetpassword";

function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "Register", element: <Register /> },
        { path: "Login", element: <Login /> },
        { path: "Forgetpassword", element: <Forgetpassword /> },

        {
          path: "Brands",
          element: (
            <Guard>
              <Brands />
            </Guard>
          ),
        },
        {
          path: "Products",
          element: (
            <Guard>
              <Products />
            </Guard>
          ),
        },
        {
          path: "Categories",
          element: (
            <Guard>
              <Categories />
            </Guard>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <Guard>
              <ProductDetails />
            </Guard>
          ),
        },
        {
          path: "Cart",
          element: (
            <Guard>
              <Cart />
            </Guard>
          ),
        },
        {
          path: "Wishlist",
          element: (
            <Guard>
              <Wishlist />
            </Guard>
          ),
        },
        {
          path: "Checkout/:id",
          element: (
            <Guard>
              <Checkout />
            </Guard>
          ),
        },
        {
          path: "allorders",
          element: (
            <Guard>
              <Allorders />
            </Guard>
          ),
        },
        {
          index: true,
          element: (
            <Guard>
              <Home />
            </Guard>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <UserContextProvider>
        <WishContextProvider>
          <CartContextProvider>
            <RouterProvider router={routers}></RouterProvider>
          </CartContextProvider>
        </WishContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
