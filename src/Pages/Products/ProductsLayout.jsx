import { useState } from "react";
import "./Products.css";
import { IoGridOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { ImFilter } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Products from "./Products";
import { useQuery } from "react-query";
import {
  getCategoryAPI,
  getSubCategoryAPI,
  getProductAPI,
  getBrandAPI,
} from "../../Components/Fetcher/Fetcher";

const ProductsLayout = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const location = useLocation();
  const isBrand = new URLSearchParams(location.search).get("brand");
  const isCategory = new URLSearchParams(location.search).get("category");
  const isFlashSale = new URLSearchParams(location.search).get("flashsales") === "products";
  const isNewArrival = new URLSearchParams(location.search).get("newarrivals") === "products";

  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery("category", getCategoryAPI);

  const {
    data: subCategory,
    isLoading: subCategoryLoading,
    error: subCategoryError,
  } = useQuery("subcategory", getSubCategoryAPI);

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useQuery("products", getProductAPI);

  const {
    data: brand,
    isLoading: brnadLoading,
    error: brnadError,
  } = useQuery("brand", getBrandAPI);

  if (categoryLoading || subCategoryLoading || productLoading || brnadLoading) {
    return <div className="text-center font-semibold">Loading...</div>;
  }
  if (categoryError || subCategoryError || productError || brnadError) {
    return <div className="text-center font-semibold">Data Not Found</div>;
  }

  let products = [...product];

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    const brand = !isBrand || product.brand._id === isBrand;
    const category = !isCategory || product.category._id === isCategory;
    const FlashSale = !isFlashSale || product.flashSale === true;
    const newArrival = !isNewArrival || product.newProduct === true;
    return brand && category && FlashSale && newArrival;
  });

  // Dynamic breadcrumb based on filters
  const breadcrumbItems = [{ label: "Home", link: "/" }];

  if (isBrand) {
    const items = product.find((item) => item.brand._id === isBrand);
    if (items) {
      breadcrumbItems.push({ label: "Brand" });
      breadcrumbItems.push({ label: items.brand.name });
    }
  }

  if (isCategory) {
    const items = product.find((item) => item.category._id === isCategory);
    if (items) {
      breadcrumbItems.push({ label: "Category" });
      breadcrumbItems.push({ label: items.category.name });
    }
  }

  if (isFlashSale) breadcrumbItems.push({ label: "Flash Sales" });
  if (isNewArrival) breadcrumbItems.push({ label: "New Arrivals" });

  return (
    <section className="container">
      <nav className="font-semibold capitalize">
        <ol className="flex items-center justify-center">
          {breadcrumbItems.map((item, index) => (
            <li key={index}>
              <Link to={item.link} className="text-gray-600">
                {item.label}
              </Link>
              {index < breadcrumbItems.length - 1 && (
                <span className="mx-1">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

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
          brand={brand}
          category={category}
          subCategory={subCategory}
        />
        <div className="product-container">
          <Products isGridView={isGridView} products={filteredProducts} />
        </div>
      </div>
    </section>
  );
};

export default ProductsLayout;
