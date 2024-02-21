import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = ({ openSidebarToggle, brand, category }) => {
  return (
    <aside
      id="sidebar"
      className={`${openSidebarToggle ? "sidebar-responsive" : ""}`}
    >
      <div className="mt-2">
        <div className="px-4">
          <h1 className="text-xl font-bold border-b-2 border-gray-400">
            Filters
          </h1>
        </div>

        {/* Category and Sub Category */}
        <div className="mt-2">
          <div className="px-4">
            <h1 className="text-xl font-bold border-b-2 border-gray-400">
              Categories
            </h1>
          </div>
          {category.map((category) => (
            <div key={category._id}>
              <p className="px-4 py-1.5 hover:bg-[#c6c6c62a] text-lg capitalize flex items-center justify-between">
                <Link to={`/products?category=${category._id}`}>
                  {category.name}
                </Link>
                <span
                  className={`transition-transform transform cursor-pointer ease-in-out duration-500`}
                >
                  <BsChevronRight />
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Brand */}
        <div className="mt-2">
          <div className="px-4">
            <h1 className="text-xl font-bold border-b-2 border-gray-400">
              Brands
            </h1>
          </div>
          {brand.map((brand) => (
            <div key={brand._id}>
              <p className="px-4 py-1.5 hover:bg-[#c6c6c62a] text-lg capitalize">
                <Link to={`/products?brand=${brand._id}`}>{brand.name}</Link>
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
