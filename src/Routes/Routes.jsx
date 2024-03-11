import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import MainLayout from "../Layout/MainLayout";
import ProductsLayout from "../Pages/Products/ProductsLayout";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import ShippingCart from "../Pages/ShippingCart/ShippingCart";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/products",
        element: <ProductsLayout />,
      },
      {
        path: "/products/details/:id",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/api/products/${params.id}`),
      },
      {
        path: "/cart",
        element: <ShippingCart/>
      }
    ],
  },
]);

export default routes;
