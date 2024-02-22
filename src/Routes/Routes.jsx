import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import MainLayout from "../Layout/MainLayout";
import ProductsLayout from "../Pages/Products/ProductsLayout";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";

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
        path: "/products",
        element: <ProductsLayout />,
      },
      {
        path: "/products/details/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

export default routes;
