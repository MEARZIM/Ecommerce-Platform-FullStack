import { createBrowserRouter } from "react-router-dom";


import Home from "./pages/Home/Home"
import LoginPage from "./pages/Login/LoginPage";
import SignUp from "./pages/SignUp/SignUp";
import CartPage from "./pages/Cart/CartPage";
import CheckOut from "./pages/CheckOut/CheckOut";
import ProductDetailsPage from "./pages/ProductDetails/ProductDetailsPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/product-details/:id",
    element: <ProductDetailsPage />,
  },
]);