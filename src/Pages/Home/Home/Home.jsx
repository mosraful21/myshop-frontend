import Banner from "../Banner/Banner";
import ShortBanner from "../Banner/ShortBanner";
import BrandAndCategory from "../BrandAndCategory/BrandAndCategory";
import CategoryProduct from "../CategoryProduct/CategoryProduct";
import NewAndFlash from "../NewAndFlash/NewAndFlash";
import Product from "../Product/Product";

const Home = () => {
  return (
    <section className="container">
      <Banner />
      <ShortBanner />
      <BrandAndCategory />
      <NewAndFlash />
      <CategoryProduct />
      <Product />
    </section>
  );
};

export default Home;
