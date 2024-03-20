import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(existingCartItems);
  }, []);

  const handleAddToCart = (product) => {
    const color = product.productDetails[0]?.color || "";
    const sellingPrice = product.price - product.discount;

    const cartItem = {
      id: product._id,
      name: product.name,
      photo: product.photos[0],
      color: color,
      brand: product.brand.name,
      quantity: product.minimumOrderQty,
      rate: sellingPrice,
      price: sellingPrice * product.minimumOrderQty,
    };

    const updatedCartItems = [...cartItems, cartItem];
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    alert("Product added to cart!");
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};
