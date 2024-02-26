import { useLoaderData } from "react-router-dom";
import { getProductAPI, photoUrl } from "../../Components/Fetcher/Fetcher";
import { useEffect, useState } from "react";
import "./ProductDetails.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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
  const [activeColorIndex, setActiveColorIndex] = useState(null);
  const [quantity, setQuantity] = useState(product.minimumOrderQty);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { data, isLoading, error } = useQuery("products", getProductAPI);

  useEffect(() => {
    if (data && product) {
      const filteredProducts = data.filter(
        (item) => item.category.name === product.category.name
      );
      setCategoryProducts(filteredProducts);
    }
  }, [data, product]);

  // Images Slider : ----------------------------
  const previousSlide = () => {
    if (current === 0) setCurrent(product.photos.length - 1);
    else setCurrent(current - 1);
  };
  const nextSlide = () => {
    if (current === product.photos.length - 1) setCurrent(0);
    else setCurrent(current + 1);
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

  // Add to Cart in Localstorage
  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: (product.price - product.discount) * quantity,
      quantity: quantity,
      color:
        activeColorIndex !== null
          ? product.productDetails[activeColorIndex].color
          : "Not Selected",
    };

    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductInCart = existingCartItems.some(
      (item) => item.id === cartItem.id && item.color === cartItem.color
    );

    if (isProductInCart) {
      alert("This item is already added to the cart.");
    } else {
      const updatedCart = [...existingCartItems, cartItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  if (isLoading) {
    return <div className="text-center font-semibold">Loading...</div>;
  }
  if (error) {
    return <div className="text-center font-semibold">Error fetching data</div>;
  }

  return (
    <section className="container">
      <div className="grid md:grid-cols-4 gap-2 py-4">
        {/* Images Section */}
        <div className="">
          <div className="overflow-hidden relative rounded border-2 border-gray-400 bg-white">
            <div
              className="details flex transition ease-out duration-1000"
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {product.photos.length !== 0 ? (
                product.photos.map((image, index) => (
                  <img
                    key={index}
                    src={photo + image}
                    alt={`Product Image ${index}`}
                  />
                ))
              ) : (
                <p className="aspect-square">No images available</p>
              )}
            </div>
          </div>

          {product.photos.length !== 0 ? (
            <div className="flex justify-center items-center gap-2 mt-0.5">
              <span onClick={previousSlide}>
                <IoIosArrowBack className="h-5 w-5" />
              </span>
              <div className="flex items-center gap-0.5 overflow-x-auto">
                {product.photos.map((image, index) => (
                  <img
                    key={index}
                    src={photo + image}
                    alt={`Product Image ${index}`}
                    className={`border-2 h-12 w-12 cursor-pointer ${
                      index === current ? "border-blue-500" : ""
                    }`}
                    onClick={() => setCurrent(index)}
                  />
                ))}
              </div>
              <span onClick={nextSlide}>
                <IoIosArrowForward className="h-5 w-5" />
              </span>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Details Section */}
        <div className="md:col-span-2 space-y-1">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-lg font-semibold">Brand: {product.brand.name}</p>
          <p className="line-clamp-4">{product.details}</p>
        </div>

        {/* Cart Section */}
        <div className="bg-white border border-gray-400 rounded p-2">
          <p className="text-lg text-gray-500 font-semibold">
            Avaiable: {product.totalQuantity}
          </p>
          {/* price */}
          <div>
            <span className="text-2xl font-bold">
              Price: {product.price - product.discount}
              <span className="text-lg font-serif">৳</span>
            </span>{" "}
            <del className="text-xl text-gray-500">
              {product.price}
              <span className="text-base font-serif">৳</span>
            </del>
          </div>

          {/* color */}
          <div className="text-lg font-semibold flex mt-2">
            Color:
            <span className="font-normal flex flex-wrap items-center gap-1 ml-1">
              {product.productDetails.map((color, index) => (
                <button
                  key={index}
                  className={`border-2 border-blue-400 rounded px-1 flex items-center gap-1 ${
                    activeColorIndex === index ? "bg-blue-400 text-white" : ""
                  }`}
                  onClick={() => setActiveColorIndex(index)}
                >
                  <span
                    className="flex items-center w-4 h-4 rounded-sm"
                    style={{
                      backgroundColor: `${color.color.split("-")[0]}`,
                    }}
                  ></span>
                  {color.color.split("-")[1]}
                </button>
              ))}
            </span>
          </div>

          {/* Order Quantity */}
          <div className="flex items-center w-1/2 mx-auto border-2 mt-2">
            <button
              onClick={handleDecrement}
              className="text-center w-1/5 font-bold text-lg"
            >
              -
            </button>
            <p className="border-x-2 w-3/5 text-center">{quantity}</p>
            <button
              onClick={handleIncrement}
              className="text-center w-1/5 font-bold text-lg"
            >
              +
            </button>
          </div>

          {/* Button */}
          <div className="mt-5">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full font-semibold bg-blue-700 hover:bg-blue-900 text-white px-3 py-1.5 rounded"
            >
              Add To Cart
            </button>

            <button
              type="button"
              className="w-full mt-2 font-semibold bg-gray-200 text-blue-500 px-3 py-1.5 rounded"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Similar Category Product */}
      <div className="mt-10">
        <div className="mb-2 border-b-2 border-gray-400">
          <h1 className="text-3xl font-bold text-gray-600">Similar Product</h1>
        </div>
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2">
          {categoryProducts?.map((p) => (
            <div key={p._id} className="product-card">
              <div className="image">
                <img src={photo + p.photos[0]} alt="image" />
                <div className="panel space-y-2">
                  <IoCartOutline className="h-[24px] w-[24px] text-white hover:text-orange-600" />
                  <IoHeartOutline className="h-[21px] w-[21px] text-white hover:text-orange-600" />
                  <IoShareSocialOutline className="h-[20px] w-[20px] text-white hover:text-orange-600" />
                </div>

                <button>Add to Cart</button>
              </div>
              <div className="px-1 mb-2">
                <p className="font-semibold line-clamp-2">{p.name}</p>
                <p className="text-lg text-orange-600 font-semibold">
                  {p.price - p.discount}
                  <span className="text-base font-serif">৳</span>
                </p>
                {p.discount > 0 && (
                  <p className="-mt-1.5">
                    <del className="text-sm text-gray-500">
                      {p.price}
                      <span className="font-serif">৳</span>
                    </del>
                    <span className="text-sm ml-1 text-gray-700 font-semibold">
                      -{Math.round((p.discount / p.price) * 100)}%
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
