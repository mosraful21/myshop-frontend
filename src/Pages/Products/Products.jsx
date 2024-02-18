import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getProductAPI, photoUrl } from "../../Components/Fetcher/Fetcher";
import {
  IoCartOutline,
  IoHeartOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

const Products = ({ isGridView }) => {
  const photo = photoUrl;
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get("category");
    setSelectedCategory(categoryParam);
    const brandParam = searchParams.get("brand");
    setSelectedBrand(brandParam);
  }, [location.search]);

  const { data, isLoading, error } = useQuery("products", getProductAPI);

  if (isLoading) {
    return <div className="text-center font-semibold">Loading...</div>;
  }
  if (error) {
    return <error className="text-center font-semibold">Error Data</error>;
  }

  let filteredProducts = [...data];

  if (selectedCategory || selectedBrand) {
    filteredProducts = filteredProducts.filter((product) => {
      return (
        (!selectedCategory || product.category === selectedCategory) &&
        (!selectedBrand || product.brand === selectedBrand)
      );
    });
  }

  return (
    <section>
      {filteredProducts.length !== 0 ? (
        <div
          className={
            isGridView
              ? "grid 2xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2 px-1"
              : "grid grid-cols-1 gap-2 px-1"
          }
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className={isGridView ? "grid-card" : "list-card"}
            >
              <div className="image">
                <img src={photo + product.photos[0]} alt="" />
                <div className="panel space-y-2">
                  <IoCartOutline className="h-[24px] w-[24px] text-gray-700 hover:text-orange-600" />
                  <IoHeartOutline className="h-[21px] w-[21px] text-gray-700 hover:text-orange-600" />
                  <IoShareSocialOutline className="h-[20px] w-[20px] text-gray-700 hover:text-orange-600" />
                </div>

                <button>Add to Cart</button>
              </div>

              <div className="px-1 mb-2 details">
                <p className="font-semibold line-clamp-2">{product.name}</p>
                <p>Category: {product.category}</p>
                <p>Brand: {product.brand}</p>
                <p className="text-lg text-orange-600 font-semibold">
                  {product.price - product.discount}
                  <span className="text-base font-serif">৳</span>
                </p>
                <p className="-mt-1.5">
                  <del className="text-sm text-gray-500">
                    {product.price}
                    <span className="font-serif">৳</span>
                  </del>
                  <span className="text-sm ml-1">
                    -
                    {parseFloat(
                      (product.discount / product.price) * 100
                    ).toFixed(1)}
                    %
                  </span>
                </p>
                <p
                  className={
                    isGridView ? "hidden" : "md:block hidden line-clamp-3"
                  }
                >
                  {product.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-2xl font-semibold font-serif">
          <h1>Product Not Avaiable</h1>
        </div>
      )}
    </section>
  );
};

export default Products;
