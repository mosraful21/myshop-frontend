import "./Auth.css";
import {
  MdLock,
  MdAttachEmail,
  MdOutlinePermPhoneMsg,
  MdOutlineSupervisedUserCircle,
} from "react-icons/md";
import { Link } from "react-router-dom";

const SignUp = () => {
  const handleSignUp = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    console.log(formData);

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Registration successful");
      } else {
        console.error(data.msg);
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <section className="flex items-center justify-center bg-[#cbd2da96] px-2 py-10">
      <form className="form_main" onSubmit={handleSignUp}>
        <p className="text-xl text-gray-800 font-bold my-2 z-10">Sign Up</p>

        {/********** Name **********/}
        <div className="w-full relative flex items-center justify-center z-10">
          <MdOutlineSupervisedUserCircle className="absolute left-1 text-gray-700" />
          <input
            type="text"
            name="name"
            className="inputField"
            placeholder="Enter your name"
            required
          />
        </div>

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

        {/********** Phone **********/}
        <div className="w-full relative flex items-center justify-center z-10">
          <MdOutlinePermPhoneMsg className="absolute left-1 text-gray-700" />
          <input
            type="text"
            name="phone"
            className="inputField"
            placeholder="Enter your phone"
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
          value="Sign Up"
          className="z-10 relative w-full border-none bg-purple-600 hover:bg-purple-700 h-8 text-white text-sm font-medium tracking-wide px-4 py-1.5 m-2 cursor-pointer"
        />

        <p className="forgotLink">
          Already have an Account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
