import { useState } from "react";
import {
  IoCartOutline,
  IoHeartOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import {
  getCategoryAPI,
  getProductAPI,
  photoUrl,
} from "../../../Components/Fetcher/Fetcher";
import { useQuery } from "react-query";

const CategoryProduct = () => {
  const [activeTab, setActiveTab] = useState("phone");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const photo = photoUrl;

  const {
    data: products,
    isLoading: productLoading,
    error: productError,
  } = useQuery("products", getProductAPI);

  const {
    data: categories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery("category", getCategoryAPI);
  const category = categories?.map((category) => category.name);

  if (productLoading || categoryLoading) {
    return <div className="text-center font-semibold">Loading...</div>;
  }
  if (productError || categoryError) {
    return <div className="text-center font-semibold">Error fetching data</div>;
  }

  const innerWidth = window.innerWidth;
  const items =
    innerWidth >= 1536
      ? 12
      : innerWidth >= 1280
      ? 10
      : innerWidth >= 768
      ? 8
      : 8;

  return (
    <section className="md:mt-10 mt-5">
      {/* Category Button */}
      <div className="flex flex-wrap items-center justify-between mb-2 border-b-2 border-gray-400">
        <h1 className="text-3xl font-bold text-gray-600">Products</h1>
        <div className="flex justify-center">
          {category.map((name, index) => (
            <button
              key={index}
              className={`${
                activeTab === name.toLowerCase() ? "bg-blue-600" : "bg-gray-400"
              } text-white text-sm font-semibold px-2 py-1 ${
                index === 0
                  ? "rounded-l"
                  : index === category.length - 1
                  ? "rounded-r"
                  : ""
              }`}
              onClick={() => handleTabClick(name.toLowerCase())}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Data */}
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2">
        {products
          .filter((product) => product.category.toLowerCase() === activeTab)
          .slice(0, items)
          .map((product) => (
            <div key={product._id} className="product-card">
              <div className="image">
                <img
                  className="w-full h-[200px]"
                  src={photo + product.photos[0]}
                  alt=""
                />
                <div className="panel space-y-2">
                  <IoCartOutline className="h-[24px] w-[24px] text-gray-700 hover:text-orange-600" />
                  <IoHeartOutline className="h-[21px] w-[21px] text-gray-700 hover:text-orange-600" />
                  <IoShareSocialOutline className="h-[20px] w-[20px] text-gray-700 hover:text-orange-600" />
                </div>

                <button>Add to Cart</button>
              </div>

              <div className="px-1 mb-2">
                <p className="font-semibold">{product.name}</p>
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
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoryProduct;
