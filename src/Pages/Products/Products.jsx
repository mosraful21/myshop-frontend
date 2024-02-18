import { useQuery } from "react-query";
import { getProductAPI, photoUrl } from "../../Components/Fetcher/Fetcher";
import {
  IoCartOutline,
  IoHeartOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

const Products = ({ isGridView }) => {
  const photo = photoUrl;

  const {
    data: products,
    isLoading: productLoading,
    error: productError,
  } = useQuery("products", getProductAPI);

  if (productLoading) {
    return <div className="text-center font-semibold">Loading...</div>;
  }
  if (productError) {
    return <div className="text-center font-semibold">Error fetching data</div>;
  }

  return (
    <div
      className={
        isGridView
          ? "grid 2xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2 px-1"
          : "grid grid-cols-1 gap-2 px-1"
      }
    >
      {products.map((product) => (
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
                {parseFloat((product.discount / product.price) * 100).toFixed(
                  1
                )}
                %
              </span>
            </p>
            <p
              className={isGridView ? "hidden" : "md:block hidden line-clamp-3"}
            >
              {product.details}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
