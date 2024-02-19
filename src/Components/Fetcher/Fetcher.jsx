// Photo Url : -----------------------------------------
export const photoUrl = "http://localhost:3000/";

// Banner Data : ----------------------------------------
export const getBannerAPI = async () => {
  const res = await fetch("http://localhost:3000/api/banner");
  const banner = await res.json();
  return banner;
};

// Category Data : --------------------------------------
export const getCategoryAPI = async () => {
  const res = await fetch("http://localhost:3000/api/categories");
  const category = await res.json();
  return category;
};

// Sub Category Data : --------------------------------------
export const getSubCategoryAPI = async () => {
  const res = await fetch("http://localhost:3000/api/subCategories");
  const subCategory = await res.json();
  return subCategory;
};

// Brand Data : -----------------------------------------
export const getBrandAPI = async () => {
  const res = await fetch("http://localhost:3000/api/brands");
  const brand = await res.json();
  return brand;
};

// Product Data : ---------------------------------------
export const getProductAPI = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const product = await res.json();
  return product;
};
