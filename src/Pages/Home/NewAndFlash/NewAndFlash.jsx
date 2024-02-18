import { useQuery } from "react-query";
import { getProductAPI, photoUrl } from "../../../Components/Fetcher/Fetcher";
import {
  IoCartOutline,
  IoHeartOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

const NewAndFlash = () => {
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

  const innerWidth = window.innerWidth;
  const items =
    innerWidth >= 1280 ? 8 : innerWidth >= 1024 ? 6 : innerWidth >= 768 ? 6 : 6;

  return (
    <section className="grid lg:grid-cols-4 md:gap-3 md:mt-10 mt-5">
      {/* New Arrivals Section */}
      <div className="flex flex-col items-center justify-center text-center rounded space-y-1 p-4 md:mt-0 mt-4 bg-gradient-to-r from-[#2D9596] to-[#9BCF53]">
        <p>Season Sale!</p>
        <p className="text-2xl font-bold">New Arrivals</p>
        <p>Time</p>
        <button className="bg-orange-500 px-4 py-1 font-semibold text-white">
          Shop Now
        </button>
      </div>

      {/* Flash Sale Section */}
      <div className="lg:col-span-3 md:mt-0 mt-4">
        <div className="mb-2 border-b-2 border-gray-400">
          <p className="text-3xl font-bold text-gray-600">Flash Sale Today!</p>
        </div>
        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
          {products
            .filter((product) => product.flashSale === true)
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
      </div>
    </section>
  );
};

export default NewAndFlash;
