import {
  IoCartOutline,
  IoHeartOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import { photoUrl } from "../../Components/Fetcher/Fetcher";
import { Link } from "react-router-dom";

const Products = ({ isGridView, products }) => {
  const photo = photoUrl;

  return (
    <section>
      {products.filter((p) => p.status === true).length !== 0 ? (
        <div
          className={
            isGridView
              ? "grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2 px-1 mt-1 mb-1"
              : "grid grid-cols-1 gap-2 px-1 mt-1 mb-1"
          }
        >
          {products
            .filter((product) => product.status === true)
            .map((product) => (
              <div
                key={product._id}
                className={isGridView ? "grid-card" : "list-card"}
              >
                <div className="photo">
                  <img src={photo + product.photos[0]} alt="" />
                  <div className="panel space-y-2">
                    <IoCartOutline className="h-[24px] w-[24px] text-white hover:text-orange-600" />
                    <IoHeartOutline className="h-[21px] w-[21px] text-white hover:text-orange-600" />
                    <IoShareSocialOutline className="h-[20px] w-[20px] text-white hover:text-orange-600" />
                  </div>

                  <button>Add to Cart</button>
                </div>

                <div className="px-1 mb-2 details">
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
                  <p className={isGridView ? "hidden" : "md:block hidden"}>
                    <span className="line-clamp-2">{product.details}</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-2xl font-semibold font-serif">
          <h1>Product Not Available</h1>
        </div>
      )}
    </section>
  );
};

export default Products;
