import { useQuery } from "react-query";
import {
  getBrandAPI,
  getCategoryAPI,
} from "../../../Components/Fetcher/Fetcher";

const BrandAndCategory = () => {
  const photo = "http://localhost:3000/";

  const {
    data: brand,
    isLoading: brandLoading,
    error: brandError,
  } = useQuery("brand", getBrandAPI);

  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery("category", getCategoryAPI);

  if (brandLoading || categoryLoading) {
    return <div className="text-center font-semibold">Loading...</div>;
  }
  if (brandError || categoryError) {
    return <div className="text-center font-semibold">Error fetching data</div>;
  }

  return (
    <section className="grid xl:grid-cols-2 gap-5 md:mt-10 mt-5">
      {/* Category Section */}
      <div className="">
        <div className="mb-2 border-b-2 border-gray-400">
          <p className="text-xl font-bold">Category</p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
          {category.map((category) => (
            <div
              key={category._id}
              className="border border-gray-400 p-0.5 flex items-center gap-1"
            >
              <img
                src={photo + category.photo}
                className="w-10 h-10 bg-gray-200"
                alt=""
              />
              <p className="font-semibold">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Section */}
      <div className="">
        <div className="mb-2 border-b-2 border-gray-400">
          <p className="text-xl font-bold">Brand</p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
          {brand.map((brand) => (
            <div
              key={brand._id}
              className="border border-gray-400 p-0.5 flex items-center gap-1"
            >
              <img
                src={photo + brand.photo}
                className="w-10 h-10 bg-gray-200"
                alt=""
              />
              <p className="text-lg font-bold">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandAndCategory;
