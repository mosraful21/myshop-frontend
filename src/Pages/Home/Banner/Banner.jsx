import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getBannerAPI, photoUrl } from "../../../Components/Fetcher/Fetcher";

const Banner = () => {
  const photo = photoUrl;

  const {
    data: banner,
    isLoading: loading,
    error: error,
  } = useQuery("banner", () => getBannerAPI());

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banner]);
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return <div className="text-center font-semibold">Loading...</div>;
  }
  if (error) {
    return <div className="text-center font-semibold">Error fetching data</div>;
  }

  return (
    <section className="relative rounded-md mt-1">
      <div className="flex">
        {banner.map((image, index) => (
          <div
            key={index}
            className={`w-full ${index === currentIndex ? "block" : "hidden"}`}
          >
            <img
              src={photo + image.photo}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto rounded-md"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banner.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
