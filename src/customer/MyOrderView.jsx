import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrderView = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get(
        "https://farm2home-wntz.onrender.com/billing/orders/",
        {
          headers,
        }
      );

      setOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-8">

        <button
          onClick={() => navigate("/customerproductview")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold mb-6"
        >
          Go Shopping
        </button>

        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          📦 My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-2xl text-gray-500 py-20">
            No Orders Found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="p-4">Image</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Subtotal</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Order Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) =>
                  order.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-green-50"
                    >
                      <td className="p-4 text-center">
                        <img
                          src={
                            item.product?.product_image
                              ? `https://farm2home-wntz.onrender.com${item.product.product_image}`
                              : "https://via.placeholder.com/80"
                          }
                          alt={item.product?.product_name || "Product"}
                          className="w-20 h-20 object-cover rounded-lg border mx-auto"
                        />
                      </td>

                      <td className="text-center font-semibold">
                        {item.product?.product_name || (
                          <span className="text-red-600">
                            Product Deleted
                          </span>
                        )}
                      </td>

                      <td className="text-center">
                        ₹ {item.price}
                      </td>

                      <td className="text-center">
                        {item.quantity}
                      </td>

                      <td className="text-center font-bold text-green-700">
                        ₹ {item.subtotal}
                      </td>

                      <td className="text-center">
                        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                          {order.status}
                        </span>
                      </td>

                      <td className="text-center">
                        {order.order_date.slice(0, 10)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrderView;