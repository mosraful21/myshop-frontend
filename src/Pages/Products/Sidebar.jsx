import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useQuery } from "react-query";
import {
  getCategoryAPI,
  getSubCategoryAPI,
} from "../../Components/Fetcher/Fetcher";

const Sidebar = ({ openSidebarToggle }) => {
  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery("category", getCategoryAPI);

  const {
    data: subCategory,
    isLoading: subCategoryLoading,
    error: subCategoryError,
  } = useQuery("subcategory", getSubCategoryAPI);

  const dynamicMenuItems = [];
  const categoryNames = [...new Set(category.map((category) => category.name))];
  categoryNames.forEach((categoryName) => {
    const subcategories = subCategory.filter(
      (subcategory) => subcategory.category === categoryName
    );
    const categoryMenuItem = {
      title: categoryName,
      subMenu: subcategories.map((subcategory) => ({
        subTitle: subcategory.name,
      })),
    };
    dynamicMenuItems.push(categoryMenuItem);
  });

  const handleSubMenuToggle = (index) => {
    const newOpenSubMenu = [...openSubMenu];
    newOpenSubMenu[index] = !newOpenSubMenu[index];
    setOpenSubMenu(newOpenSubMenu);
  };

  const [openSubMenu, setOpenSubMenu] = useState(
    new Array(dynamicMenuItems.length).fill(false)
  );

  if (subCategoryLoading || categoryLoading) {
    return <div className="text-center font-semibold">Loading...</div>;
  }
  if (subCategoryError || categoryError) {
    return <div className="text-center font-semibold">Error fetching data</div>;
  }

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

        {dynamicMenuItems.map((menuItem, index) => (
          <div key={index} className="text-xl">
            {menuItem.subMenu && menuItem.subMenu.length > 0 ? (
              <div className="flex items-center justify-between px-4 py-2 hover:bg-[#c6c6c62a]">
                <p className="cursor-pointer">{menuItem.title}</p>

                {menuItem.subMenu && menuItem.subMenu.length > 0 && (
                  <span
                    onClick={() => handleSubMenuToggle(index)}
                    className={`transition-transform transform ${
                      openSubMenu[index] ? "rotate-90" : "rotate-0"
                    } cursor-pointer ease-in-out duration-500`}
                  >
                    <BsChevronRight />
                  </span>
                )}
              </div>
            ) : (
              <p className="px-4 py-2 hover:bg-[#c6c6c62a] cursor-pointer">
                {menuItem.title}
              </p>
            )}

            {openSubMenu[index] && menuItem.subMenu && (
              <div className="bg-[#c6c6c60e] flex flex-col">
                {menuItem.subMenu.map((subItem, subIndex) => (
                  <p
                    key={subIndex}
                    className="pl-10 leading-10 hover:bg-[#c6c6c62a] cursor-pointer"
                  >
                    {subItem.subTitle}
                  </p>
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
