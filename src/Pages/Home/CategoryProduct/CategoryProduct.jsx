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
  const photo = photoUrl;

  const {
    data: products,
    isLoading: productLoading,
    error: productError,
  } = useQuery("products", getProductAPI);

  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery("category", getCategoryAPI);

  // Filter category with associated products having status === true
  const categoryWithData = category.filter((categoryItem) =>
    products.some(
      (product) =>
        product.category._id === categoryItem._id && product.status === true
    )
  );

  const displayCategory = categoryWithData.slice(0, 3);

  const [activeTab, setActiveTab] = useState(displayCategory[0]?._id);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
    <section>
      {displayCategory.length !== 0 ? (
        <div className="md:mt-10 mt-5">
          {/* Category Button */}
          <div className="flex flex-wrap items-center justify-between mb-2 border-b-2 border-gray-400">
            <h1 className="text-3xl font-bold text-gray-600">Products</h1>
            <div className="flex flex-wrap gap-y-1 justify-center">
              {displayCategory.map((category, index) => (
                <button
                  key={index}
                  className={`${
                    activeTab === category._id ? "bg-blue-600" : "bg-gray-400"
                  } text-white text-sm font-semibold px-2 py-1 ${
                    displayCategory.length === 1
                      ? "rounded"
                      : index === 0
                      ? "rounded-l"
                      : index === displayCategory.length - 1
                      ? "rounded-r"
                      : ""
                  }`}
                  onClick={() => handleTabClick(category._id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Data */}
          <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2">
            {products
              .filter(
                (product) =>
                  product.status === true && product.category._id === activeTab
              )
              .slice(0, items)
              .map((product) => (
                <div key={product._id} className="product-card">
                  <div className="image">
                    <img src={photo + product.photos[0]} alt="" />
                    <div className="panel space-y-2">
                      <IoCartOutline className="h-[24px] w-[24px] text-white hover:text-orange-600" />
                      <IoHeartOutline className="h-[21px] w-[21px] text-white hover:text-orange-600" />
                      <IoShareSocialOutline className="h-[20px] w-[20px] text-white hover:text-orange-600" />
                    </div>

                    <button>Add to Cart</button>
                  </div>

                  <div className="px-1 mb-2">
                    <p className="font-semibold line-clamp-2">{product.name}</p>
                    <p className="text-lg text-orange-600 font-semibold">
                      {product.price - product.discount}
                      <span className="text-base font-serif">৳</span>
                    </p>
                    {product.discount > 0 && (
                      <p className="-mt-1.5">
                        <del className="text-sm text-gray-500">
                          {product.price}
                          <span className="font-serif">৳</span>
                        </del>
                        <span className="text-sm ml-1 text-gray-700 font-semibold">
                          -
                          {Math.round((product.discount / product.price) * 100)}
                          %
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default CategoryProduct;
