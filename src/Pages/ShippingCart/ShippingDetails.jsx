import { FaShoppingCart } from "react-icons/fa";
import { photoUrl } from "../../Components/Fetcher/Fetcher";
import { IoTrashSharp, IoAdd, IoRemove } from "react-icons/io5";

const ShippingDetails = ({cartItems, setCartItems}) => {
  const photo = photoUrl;

  const updateQuantityDecrease = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      updatedCartItems[index].price =
        updatedCartItems[index].quantity * updatedCartItems[index].rate;
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const updateQuantityIncrease = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    updatedCartItems[index].price =
      updatedCartItems[index].quantity * updatedCartItems[index].rate;
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const updateQuantityDeleted = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <section className="border-2 border-gray-400 rounded-md md:p-4 p-2">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-[#3ea590] mb-5">
        <FaShoppingCart />
        Shipping Information
      </h2>
      {cartItems.length !== 0 ? (
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-x-3 gap-y-4">
          <div className="col-span-2">
            <div className="w-full overflow-x-auto">
              <table className="w-full bg-white border border-gray-300">
                <thead>
                  <tr className="text-center bg-gray-50">
                    <th className="p-2 border">
                      <span className="text-white">__________</span>
                      Product
                      <span className="text-white">__________</span>
                    </th>
                    <th className="p-2 border">Quantity</th>
                    <th className="p-2 border">Rate</th>
                    <th className="p-2 border">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {cartItems.map((item, index) => (
                    <tr key={index} className="text-gray-700">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center gap-0.5">
                          <div className="w-10 h-10">
                            <img
                              className="object-contain w-full h-full"
                              src={photo + item.photo}
                              alt="image"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-black">
                              {item.name}
                            </p>
                            {item.color === "" ? (
                              <p className="text-xs font-medium text-gray-700">
                                Color not available
                              </p>
                            ) : (
                              <p
                                className="flex items-center text-xs font-medium text-gray-700 w-3 h-3 rounded-sm"
                                style={{
                                  backgroundColor: `${
                                    item?.color.split("-")[0]
                                  }`,
                                }}
                              >
                                <span className="ml-3.5">
                                  {item?.color.split("-")[1]}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-ms font-semibold border">
                        <div className="max-w-min mx-auto flex items-center border border-gray-500">
                          <button
                            className="px-1 py-1 border-r border-gray-500"
                            onClick={() => updateQuantityDecrease(index)}
                          >
                            {item.quantity > 1 ? (
                              <IoRemove />
                            ) : (
                              <IoTrashSharp
                                className="text-orange-500"
                                onClick={() => updateQuantityDeleted(index)}
                              />
                            )}
                          </button>
                          <p className="px-2">{item.quantity}</p>
                          <button
                            className="px-1 py-1 border-l border-gray-500"
                            onClick={() => updateQuantityIncrease(index)}
                          >
                            <IoAdd />
                          </button>
                        </div>
                      </td>

                      <td className="px-4 py-3 font-semibold text-center border">
                        {item.rate}
                      </td>
                      <td className="px-4 py-3 font-semibold text-center border">
                        {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-2">
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#3ea590]">
              Shipping details
            </h2>

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="border-b-2 border-dotted border-gray-700 py-4"
              >
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="flex items-center justify-between font-medium text-gray-600">
                  <span>Rate :</span> <span>{item.rate}</span>
                </p>
                <p className="flex items-center justify-between font-medium text-gray-600">
                  <span>Quantity :</span> <span>{item.quantity}</span>
                </p>
                <p className="flex items-center justify-between font-medium text-gray-600">
                  <span>Price :</span> <span>{item.price}</span>
                </p>
                <hr />
                <p className="flex items-center justify-between text-lg font-bold text-[#38aa99]">
                  <span>Total :</span> <span>{item.price}</span>
                </p>
              </div>
            ))}

            <h1 className="text-xl font-bold text-center text-[#346b63] my-2">
              Total Price : {totalPrice}
              <span className="text-lg font-serif">৳</span>
            </h1>
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-3xl font-semibold text-gray-500 py-10">
          Empty
        </div>
      )}
    </section>
  );
};

export default ShippingDetails;
