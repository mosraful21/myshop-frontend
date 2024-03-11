import { useState } from "react";
import "./Auth.css";
import { MdAttachEmail, MdLock } from "react-icons/md";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("Invalid email or password");
  };

  return (
    <section className="flex items-center justify-center bg-[#cbd2da96] px-2 py-10">
      <form className="form_main" onSubmit={handleLogin}>
        <p className="text-xl text-gray-800 font-bold my-2 z-10">Login</p>

        {/********** Email **********/}
        <div className="w-full relative flex items-center justify-center z-10">
          <MdAttachEmail className="absolute left-1 text-gray-700" />
          <input
            type="email"
            name="email"
            className="inputField"
            placeholder="Enter your email"
            required
          />
        </div>

        {/********** Password **********/}
        <div className="w-full relative flex items-center justify-center z-10">
          <MdLock className="absolute left-1 text-gray-700" />
          <input
            type="password"
            name="password"
            className="inputField"
            placeholder="Password"
            required
          />
        </div>

        <input
          type="submit"
          value="Login"
          className="z-10 relative w-full border-none bg-purple-600 hover:bg-purple-700 h-8 text-white text-sm font-medium tracking-wide px-4 py-1.5 m-2 cursor-pointer"
        />

        {error && (
          <p className="text-red-600 text-xs font-semibold z-10">{error}</p>
        )}

        <p className="forgotLink">
          Create an Account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
