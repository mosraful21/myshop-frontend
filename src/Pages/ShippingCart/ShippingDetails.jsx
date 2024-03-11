import { FaShoppingCart } from "react-icons/fa";

const ShippingDetails = () => {
  return (
    <section className="border-2 border-gray-400 rounded-md p-4">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-500 mb-5">
        <FaShoppingCart />
        Shipping Information
      </h2>
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-x-3 gap-y-4">
        <div className="col-span-2">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Rate</th>
                  <th className="p-2 border">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="p-2 border">
                    <img src="/" alt="" className="w-12 h-12" />
                  </td>
                  <td className="p-2 border">2</td>
                  <td className="p-2 border">1000</td>
                  <td className="p-2 border">2000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-2">
          <h2 className="text-xl font-bold flex items-center gap-2 text-blue-500 mb-5">
            Shipping details
          </h2>

          <div className="space-y-2">
            <p className="flex items-center justify-between text-xl font-medium">
              <span>Rate :</span> <span>1000$</span>
            </p>
            <p className="flex items-center justify-between text-xl font-medium">
              <span>Quantity :</span> <span>2</span>
            </p>
            <p className="flex items-center justify-between text-xl font-medium">
              <span>Price :</span> <span>2000$</span>
            </p>
            <hr />
            <p className="flex items-center justify-between text-xl font-bold text-green-600">
              <span>Total Price :</span> <span>2000$</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingDetails;
