import { Link, useLoaderData } from "react-router-dom";
import { getProductAPI, photoUrl } from "../../Components/Fetcher/Fetcher";
import { useEffect, useState } from "react";
import "./ProductDetails.css";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useQuery } from "react-query";
import {
  IoCartOutline,
  IoHeartOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

const ProductDetails = () => {
  const photo = photoUrl;
  const product = useLoaderData();
  const [current, setCurrent] = useState(0);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(product.minimumOrderQty);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { data, isLoading, error } = useQuery("products", getProductAPI);

  const sellingPrice = product.price - product.discount;

  useEffect(() => {
    if (data && product) {
      const filteredProducts = data.filter(
        (item) => item.category.name === product.category.name
      );
      setCategoryProducts(filteredProducts);
    }
  }, [data, product]);

  const [showFullDetails, setShowFullDetails] = useState(false);
  const toggleDetails = () => {
    setShowFullDetails(!showFullDetails);
  };

  // Order Quantity : ---------------------------
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const color = product.productDetails[activeColorIndex]?.color || "No Color";

    const cartItem = {
      id: product._id,
      name: product.name,
      price: sellingPrice,
      color: color,
      quantity: quantity,
      brand: product.brand.name,
      photo: product.photos[current],
    };

    const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = [...existingCartItems, cartItem];

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    alert("Product added to cart!");
  };

  if (isLoading) {
    return <div className="text-center font-semibold">Loading...</div>;
  }
  if (error) {
    return <div className="text-center font-semibold">Error fetching data</div>;
  }

  return (
    <section className="container">
      <div className="grid md:grid-cols-3 gap-4 py-4">
        {/********** Images Section **********/}
        <div>
          {product.photos.length !== 0 ? (
            <div className="overflow-hidden relative border border-gray-400 bg-white">
              <div
                className="flex transition ease-out duration-500"
                style={{
                  transform: `translateX(-${current * 100}%)`,
                }}
              >
                {product.photos.map((image, index) => (
                  <img
                    key={index}
                    src={photo + image}
                    alt="image"
                    className="flex flex-shrink-0 w-full aspect-square object-contain p-1"
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="aspect-square flex items-center justify-center bg-slate-300">
              Image not available
            </p>
          )}

          <div className="flex items-center justify-center mt-1 gap-0.5 overflow-x-auto">
            {product.photos.map((image, index) => (
              <img
                key={index}
                src={photo + image}
                alt="image"
                className={`border h-12 w-12 cursor-pointer aspect-square object-contain p-0.5 bg-white ${
                  index === current ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>

        {/********** Details Section **********/}
        <div className="md:col-span-2 space-y-3 md:px-0 px-1">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-lg text-gray-500 font-semibold">
            Avaiable: {product.totalQuantity} items In Stock
          </p>
          <p className="text-lg font-semibold">Brand: {product.brand.name}</p>

          <div>
            <p className={showFullDetails ? "" : "line-clamp-3"}>
              {product.details}
            </p>
            <button
              onClick={toggleDetails}
              className="underline text-[#3eab9a] text-xs font-bold float-end"
            >
              {showFullDetails ? "Show Less" : "Show More"}
            </button>
          </div>

          <p className="text-lg font-semibold">Warranty: {product.warranty}</p>

          <p>
            <span className="text-xl font-bold mr-2">
              Price: {product.price - product.discount}
              <span className="text-lg font-serif">৳</span>
            </span>
            <del className="text-lg text-orange-500">{product.price}</del>
            <span className="text-base text-orange-500 font-serif">৳</span>
          </p>

          <hr className="h-[2px] bg-gray-400" />

          <div className="flex gap-10">
            {/* Color Section */}
            <div>
              <label className="text-lg font-semibold flex items-center gap-1">
                <span> Color:</span>
                {product.productDetails.length !== 0 ? (
                  <p>
                    {
                      product?.productDetails[activeColorIndex]?.color.split(
                        "-"
                      )[1]
                    }
                  </p>
                ) : (
                  <p className="text-gray-500 font-medium">No Color</p>
                )}
              </label>

              {product.productDetails.length !== 0 ? (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
                  {product.productDetails.map((color, index) => (
                    <button
                      key={index}
                      className={`flex items-center gap-0.5 ${
                        activeColorIndex === index
                          ? "text-gray-800 font-medium underline"
                          : "text-gray-400 font-medium"
                      }`}
                      onClick={() => setActiveColorIndex(index)}
                    >
                      <span
                        className="w-4 h-4 rounded-sm"
                        style={{
                          backgroundColor: `${color.color.split("-")[0]}`,
                        }}
                      ></span>
                      {color.color.split("-")[1]}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 mt-3">Color not available</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="text-lg font-semibold">Quantity</label>
              <div className="min-w-[120px] flex items-center border border-gray-500 justify-between mt-3">
                <button
                  className="px-1.5 py-1 border-r border-gray-500"
                  onClick={handleDecrement}
                >
                  <IoIosRemove />
                </button>
                <p>{quantity}</p>
                <button
                  className="px-1.5 py-1 border-l border-gray-500"
                  onClick={handleIncrement}
                >
                  <IoIosAdd />
                </button>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="flex flex-wrap justify-center gap-4 py-8">
            <button className="add-to-cart" onClick={handleAddToCart}>
              <i className="animation"></i>Add To Cart
              <i className="animation"></i>
            </button>

            <button className="buy-now">Buy Now</button>
          </div>
        </div>
      </div>

      {/********** Similar Category Product **********/}
      <div className="mt-10">
        <div className="mb-2 border-b-2 border-gray-400">
          <h1 className="text-3xl font-bold text-gray-600">Similar Products</h1>
        </div>
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2">
          {categoryProducts?.map((product) => (
            <div key={product._id} className="product-card">
              <div className="image">
                <img src={photo + product.photos[0]} alt="image" />
                <div className="panel space-y-2">
                  <IoCartOutline className="h-[24px] w-[24px] text-white hover:text-orange-600" />
                  <IoHeartOutline className="h-[21px] w-[21px] text-white hover:text-orange-600" />
                  <IoShareSocialOutline className="h-[20px] w-[20px] text-white hover:text-orange-600" />
                </div>

                <button>Add to Cart</button>
              </div>
              <div className="px-1 mb-2">
                <Link
                  to={`/products/details/${product._id}`}
                  className="font-semibold line-clamp-2"
                >
                  {product.name}
                </Link>
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
                      -{Math.round((product.discount / product.price) * 100)}%
                    </span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
