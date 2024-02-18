import { useState } from "react";
import Sidebar from "./Sidebar";
import Products from "./Products";
import { IoGridOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { ImFilter } from "react-icons/im";
import "./Products.css";

const ProductsLayout = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <section className="container">
      <div>
        <p>BreadGram section home / product</p>
      </div>

      <header className="flex items-center justify-between mb-2 py-2 box-shadow">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="flex items-center gap-3">
          <p className="flex items-center gap-2 text-gray-600">
            <span className="text-xl font-bold">View:</span>
            <IoGridOutline
              className={`h-5 w-5 mt-1 cursor-pointer ${
                isGridView ? "text-blue-600" : ""
              }`}
              onClick={() => setIsGridView(true)}
            />
            <FaList
              className={`h-5 w-5 mt-1 cursor-pointer ${
                !isGridView ? "text-blue-600" : ""
              }`}
              onClick={() => setIsGridView(false)}
            />
          </p>

          <ImFilter
            onClick={OpenSidebar}
            className={`text-xl h-6 w-6 font-bold ${
              openSidebarToggle ? "text-orange-600" : "text-blue-700"
            } xl:hidden`}
          />
        </div>
      </header>

      <div className="grid-container">
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <div className="product-container">
          <Products isGridView={isGridView} />
        </div>
      </div>
    </section>
  );
};

export default ProductsLayout;