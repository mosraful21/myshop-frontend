import { useLoaderData } from "react-router-dom";
import { photoUrl } from "../../Components/Fetcher/Fetcher";
import { useState } from "react";

const ProductDetails = () => {
  const product = useLoaderData();
  const photo = photoUrl;

  const [current, setCurrent] = useState(0);
  const previousSlide = () => {
    if (current === 0) setCurrent(product.photos.length - 1);
    else setCurrent(current - 1);
  };
  const nextSlide = () => {
    if (current === product.photos.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <section className="container">
      <div className="grid grid-cols-4 gap-2 py-4">
        <div className="">
          <div className="overflow-hidden relative rounded border-2 border-gray-400 bg-white">
            <div
              className="image flex transition ease-out duration-1000"
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
                <p>No images available</p>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            <span onClick={previousSlide}>{"<"}</span>
            <div className="flex items-center gap-0.5 overflow-x-auto">
              {product.photos.map((image, index) => (
                <img
                  key={index}
                  src={photo + image}
                  alt={`Product Image ${index}`}
                  className={`border-2 rounded-lg md:h-12 md:w-12 h-8 w-8 cursor-pointer ${
                    index === current ? "border-blue-500" : ""
                  }`}
                  onClick={() => setCurrent(index)}
                />
              ))}
            </div>
            <span onClick={nextSlide}>{">"}</span>
          </div>
        </div>

        <div className="col-span-2">{product.name}</div>

        <div className="bg-white border border-gray-400 rounded">
          <p>
            <span className="text-3xl font-bold">
              {product.price - product.discount}৳
            </span>
            <del className="text-xl text-gray-500">{product.price}৳</del>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
