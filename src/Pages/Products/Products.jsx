import { useQuery } from "react-query";
import { getProductAPI } from "../../Components/Fetcher/Fetcher";
import {
  IoCartOutline,
  IoHeartOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

const Products = () => {
  const {
    data: products,
    isLoading: productLoading,
    error: productError,
  } = useQuery("products", getProductAPI);
  const photo = "http://localhost:3000/";

  if (productLoading) {
    return <div className="text-center font-semibold">Loading...</div>;
  }
  if (productError) {
    return <div className="text-center font-semibold">Error fetching data</div>;
  }

  return (
    <div className="grid 2xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2">
      {products.map((product) => (
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
                {parseFloat((product.discount / product.price) * 100).toFixed(
                  1
                )}
                %
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
