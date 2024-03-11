import { Link } from "react-router-dom";
import logo from "../../assets/Logo/logo.png";
import { useContext } from "react";
import { CartContext } from "../../Pages/ProductDetails/CartContext";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  
  return (
    <section className="bg-[#E26EE5] w-full">
      {/* <marquee direction="" className="text-white bg-purple-500">Welcome To Our Shop. Happy Shopping.</marquee> */}
      {/* Header Top */}
      <div className="container flex items-center justify-between">
        <img src={logo} alt="" className="w-28" />

        <div className="flex items-center text-white font-semibold gap-2">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </div>

        <div className="flex items-center text-white font-semibold gap-2">
          <Link to="/login">
            <span className="md:hidden">A</span>
            <span className="md:flex hidden">Login</span>
          </Link>{" "}
          I
          <Link to="/signup">
            <span className="md:hidden">B</span>
            <span className="md:flex hidden">SignUp</span>
          </Link>{" "}
          I
          <Link to="/cart">
            Cart<span>({cartItems.length})</span>
          </Link>
        </div>
      </div>

      {/* Navbar Section */}
      <nav></nav>
    </section>
  );
};

export default Header;
