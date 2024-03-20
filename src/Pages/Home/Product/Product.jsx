import { useQuery } from "react-query";
import { getProductAPI, photoUrl } from "../../../Components/Fetcher/Fetcher";
import {
  IoCartOutline,
  IoHeartOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../Components/CartContextApi/CartContextApi";


const Product = () => {
  const photo = photoUrl;

  const { handleAddToCart } = useContext(CartContext);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery("products", getProductAPI);

  if (isLoading) {
    return <div className="text-center font-semibold">Loading...</div>;
  }
  if (error) {
    return <div className="text-center font-semibold">Error fetching data</div>;
  }

  return (
    <section>
      {products.filter((p) => p.status === true).length !== 0 ? (
        <div className="mt-10">
          <div className="mb-2 border-b-2 border-gray-400">
            <h1 className="text-3xl font-bold text-gray-600">Just For You</h1>
          </div>
          <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2">
            {products
              .filter((product) => product.status === true)
              .map((product) => (
                <div key={product._id} className="product-card">
                  <div className="image">
                    <img src={photo + product.photos[0]} alt="image" />
                    <div className="panel space-y-2">
                      <IoCartOutline className="h-[24px] w-[24px] text-white hover:text-orange-600" />
                      <IoHeartOutline className="h-[21px] w-[21px] text-white hover:text-orange-600" />
                      <IoShareSocialOutline className="h-[20px] w-[20px] text-white hover:text-orange-600" />
                    </div>

                    <button onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
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

export default Product;
