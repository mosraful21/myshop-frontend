import { useQuery } from "react-query";
import { getShortBannerAPI } from "../../../Components/Fetcher/Fetcher";

const ShortBanner = () => {
  const {
    data: shortBanner,
    isLoading: loading,
    error: error,
  } = useQuery("banner", () => getShortBannerAPI());
  const photo = "http://localhost:3000/";

  if (loading) {
    return <div className="text-center font-semibold">Loading...</div>;
  }
  if (error) {
    return <div className="text-center font-semibold">Error fetching data</div>;
  }
  return (
    <section className="md:mt-4 mt-2 grid grid-cols-3 gap-2">
      {shortBanner.slice(0, 3).map((banner) => (
        <img
          key={banner._id}
          src={photo + banner.photo}
          alt=""
          className="w-full h-auto rounded-md"
        />
      ))}
    </section>
  );
};

export default ShortBanner;
