import { useState } from "react";
import { TiTick } from "react-icons/ti";
import "./ShippingCart.css";
import { FaUserAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import ShippingDetails from "./ShippingDetails";
import { useNavigate } from "react-router-dom";

const ShippingCart = () => {
  const steps = ["Shipping Info", "Customer Info", "Payment"];
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    division: "",
    district: "",
    address: "",
  });

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      setComplete(true);
      alert("Thanks for shopping");
      navigate("/");
    } else if (currentStep === 1) {
      const { country, division, district, address } = customerInfo;
      if (!country || !division || !district || !address) {
        alert("Please fill in all required fields.");
      } else {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleInputChange = (e, category) => {
    const { name, value } = e.target;
    switch (category) {
      case "customer":
        setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
        break;
      default:
        break;
    }
  };

  return (
    <section className="container">
      <div className="flex justify-center my-5">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-item ${currentStep === index && "active"} ${
              index < currentStep || complete ? "complete" : ""
            }`}
          >
            <div className="step">
              {index < currentStep || complete ? (
                <TiTick size={24} />
              ) : (
                index + 1
              )}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>

      <div>
        {/******************** Shipping Info ********************/}
        {currentStep === 0 && <ShippingDetails />}

        {/******************** Customer Info ********************/}
        {currentStep === 1 && (
          <div className="border-2 border-gray-400 rounded-md p-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-500">
              <FaUserAlt />
              Customer Information
            </h2>
            <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-2">
              <div className="space-y-1">
                <label className="font-semibold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange(e, "customer")}
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold">Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange(e, "customer")}
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold">Phone No.</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Your Phone"
                  className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange(e, "customer")}
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold">
                  Country<span className="text-orange-500">*</span>
                </label>
                <select
                  name="country"
                  className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
                  value={customerInfo.country}
                  onChange={(e) => handleInputChange(e, "customer")}
                >
                  <option value="">Select Country</option>
                  <option value="Bangladesh">Bangladesh</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold">
                  Division<span className="text-orange-500">*</span>
                </label>
                <select
                  name="division"
                  className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
                  value={customerInfo.division}
                  onChange={(e) => handleInputChange(e, "customer")}
                >
                  <option value="">Select Division</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Mymensingh">Mymensingh</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Sylhet">Sylhet</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold">
                  District<span className="text-orange-500">*</span>
                </label>
                <select
                  name="district"
                  className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
                  value={customerInfo.district}
                  onChange={(e) => handleInputChange(e, "customer")}
                >
                  <option value="">Select District</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Faridpur">Faridpur</option>
                  <option value="Gazipur">Gazipur</option>
                  <option value="Gopalganj">Gopalganj</option>
                  <option value="Kishoreganj">Kishoreganj</option>
                  <option value="Madaripur">Madaripur</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 mt-2">
              <label className="font-semibold">
                Shipping Address<span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter Your Address"
                className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
                value={customerInfo.address}
                onChange={(e) => handleInputChange(e, "customer")}
              />
            </div>
          </div>
        )}

        {/******************** Payment ********************/}
        {currentStep === 2 && (
          <div className="border-2 border-gray-400 rounded-md p-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-500 mb-5">
              <MdPayment />
              Payment Gateway
            </h2>

            <div className="flex justify-center text-xl font-serif">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash On Delivery"
                  className="form-radio h-5 w-5 text-red-500 focus:ring-red-400"
                />
                <span className="ml-2">Cash On Delivery</span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-5 py-5">
        {currentStep !== 0 && (
          <button
            className="text-gray-500 font-bold underline hover:text-orange-600"
            onClick={handleBack}
          >
            Back
          </button>
        )}

        <button
          className="bg-green-500 text-white px-4 py-1 rounded font-semibold hover:bg-green-700"
          onClick={handleNext}
        >
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </section>
  );
};

export default ShippingCart;
