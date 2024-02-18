import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", link: "/dashboard" },
  {
    title: "Users",
    subMenu: [
      { subTitle: "Admin", subLink: "/dashboard/admin" },
      { subTitle: "Customer", subLink: "/dashboard/customer" },
    ],
  },
  {
    title: "Banner",
    subMenu: [
      { subTitle: "Banner", subLink: "/dashboard/banner" },
      { subTitle: "Brand", subLink: "/dashboard/brand" },
    ],
  },
  {
    title: "Upload Products",
    subMenu: [
      { subTitle: "Category", subLink: "/dashboard/category" },
      { subTitle: "Sub Category", subLink: "/dashboard/subcategory" },
      { subTitle: "Product", subLink: "/dashboard/product" },
    ],
  },
];

const Sidebar = ({ openSidebarToggle }) => {
  const [openSubMenu, setOpenSubMenu] = useState(
    new Array(menuItems.length).fill(false)
  );

  const handleSubMenuToggle = (index) => {
    const newOpenSubMenu = [...openSubMenu];
    newOpenSubMenu[index] = !newOpenSubMenu[index];
    setOpenSubMenu(newOpenSubMenu);
  };

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

        {menuItems.map((menuItem, index) => (
          <div key={index} className="text-xl">
            {menuItem.subMenu ? (
              <div
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#c6c6c62a] transition duration-300 ease"
                onClick={() => handleSubMenuToggle(index)}
              >
                <span className="flex items-center gap-2">
                  {menuItem.title}
                </span>
                <span
                  className={`transition-transform transform ${
                    openSubMenu[index] ? "rotate-90" : "rotate-0"
                  } ease-in-out duration-500`}
                >
                  <BsChevronRight />
                </span>
              </div>
            ) : (
              <Link
                to={menuItem.link}
                className="flex items-center px-4 py-2 gap-2 hover:bg-[#c6c6c62a] transition duration-300 ease"
              >
                {menuItem.title}
              </Link>
            )}

            {openSubMenu[index] && menuItem.subMenu && (
              <div className="bg-[#c6c6c60e] flex flex-col">
                {menuItem.subMenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    className="pl-12 leading-10 hover:bg-[#c6c6c62a] transition duration-200 ease-in-out"
                    to={subItem.subLink}
                  >
                    {subItem.subTitle}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
