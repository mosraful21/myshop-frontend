import { useLoaderData } from "react-router-dom";
import { photoUrl } from "../../Components/Fetcher/Fetcher";

const ProductDetails = () => {
  const product = useLoaderData();
  const photo = photoUrl;

  return (
    <section className="container">
      <div className="grid grid-cols-4 gap-2 py-4">
        <div className="bg-orange-400">
          <img src={photo + product.photos[0]} alt="" />
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
