import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmerOrderView = () => {
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
        "http://127.0.0.1:8000/billing/farmer-orders/",
        { headers }
      );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/billing/farmer-orders/${id}/`,
        { status },
        { headers }
      );

      alert("Order Status Updated");
      getOrders();
    } catch (error) {
      console.log(error.response);
      alert("Unable to Update Status");
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/billing/farmerorder-delete/${id}/`,
        { headers }
      );

      alert("Order Deleted Successfully");

      getOrders();
    } catch (error) {
      console.log(error.response);
      alert("Unable to Delete Order");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          🚜 Farmer Orders Dashboard
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-2xl text-gray-500 py-20">
            No Orders Available
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl shadow-md mb-10 p-6"
            >
             \

              <div className="flex justify-between items-start border-b pb-5">

                <div>

                  <h2 className="text-2xl font-bold text-green-700">
                    Order #{order.id}
                  </h2>

                  <p>
                    <b>Customer :</b> {order.customer}
                  </p>

                  <p>
                    <b>Order Date :</b>{" "}
                    {order.order_date.slice(0, 10)}
                  </p>

                </div>

                <div className="flex flex-col gap-3">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                    className="border rounded-lg px-4 py-2"
                  >
                    <option>Pending</option>
                    <option>Accepted</option>
                    <option>Packed</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>

                  {(order.status === "Delivered" ||
                    order.status === "Cancelled") && (
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2"
                    >
                      🗑 Delete
                    </button>
                  )}

                </div>

              </div>

              

              {order.address && (
                <div className="bg-green-100 rounded-xl p-5 mt-5">

                  <h3 className="text-xl font-bold text-green-700 mb-3">
                    📍 Delivery Address
                  </h3>

                  <p><b>Name :</b> {order.address.full_name}</p>
                  <p><b>Phone :</b> {order.address.phone_number}</p>
                  <p><b>Door No :</b> {order.address.door_no}</p>
                  <p><b>Street :</b> {order.address.street}</p>
                  <p><b>Area :</b> {order.address.area}</p>
                  <p><b>City :</b> {order.address.city}</p>
                  <p><b>District :</b> {order.address.district}</p>
                  <p><b>State :</b> {order.address.state}</p>
                  <p><b>Pincode :</b> {order.address.pincode}</p>

                  {order.address.landmark && (
                    <p>
                      <b>Landmark :</b> {order.address.landmark}
                    </p>
                  )}

                </div>
              )}

             

              <table className="w-full mt-6">

                <thead>

                  <tr className="bg-green-600 text-white">

                    <th className="p-3">Image</th>
                    <th className="p-3">Product</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Subtotal</th>

                  </tr>

                </thead>

                <tbody>

                  {order.items.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b hover:bg-green-50"
                    >

                      <td className="p-4 text-center">

                        <img
                          src={
                            item.product?.product_image
                              ? `http://127.0.0.1:8000${item.product.product_image}`
                              : "https://via.placeholder.com/80"
                          }
                          alt={item.product?.product_name}
                          className="w-20 h-20 object-cover rounded-lg border mx-auto"
                        />

                      </td>

                      <td className="text-center font-semibold">
                        {item.product?.product_name}
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

                    </tr>

                  ))}

                </tbody>

              </table>

              

              <div className="flex justify-end mt-6">

                <div className="bg-green-100 px-6 py-4 rounded-lg">

                  <h2 className="text-xl font-bold text-green-700">
                    Total : ₹ {order.total_amount}
                  </h2>

                  <p className="mt-2">
                    Status :
                    <span className="ml-2 font-bold text-blue-700">
                      {order.status}
                    </span>
                  </p>

                </div>

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default FarmerOrderView;