import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const response = await axios.get(
        "https://farm2home-wntz.onrender.com/billing/cart/",
        {
          headers,
        }
      );

      setCart(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const increase = async (id, qty) => {
    try {
      await axios.patch(
        `https://farm2home-wntz.onrender.com/billing/cart/${id}/`,
        {
          quantity: qty + 1,
        },
        {
          headers,
        }
      );

      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  const decrease = async (id, qty) => {
    if (qty === 1) return;

    try {
      await axios.patch(
        `https://farm2home-wntz.onrender.com/billing/cart/${id}/`,
        {
          quantity: qty - 1,
        },
        {
          headers,
        }
      );

      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `https://farm2home-wntz.onrender.com/billing/cart/${id}/`,
        {
          headers,
        }
      );

      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  const grandTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-green-50 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          🛒 My Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center text-2xl text-gray-500 py-20">
            Your Cart is Empty
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="p-4">Image</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {cart.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b hover:bg-green-50 transition"
                    >

                      <td className="p-4">
                        <img
                         src={
                            item.product.product_image
                             ? `https://farm2home-wntz.onrender.com${item.product.product_image}`
                             : "/no-image.png"
                         }
                        alt={item.product.product_name}
                        className="w-24 h-24 object-cover rounded-lg mx-auto"
                         />
                      </td>

                      <td className="font-semibold text-center">
                        {item.product.product_name}
                      </td>

                      <td className="text-center font-semibold text-green-700">
                        ₹ {item.product.price}
                      </td>

                      <td>

                        <div className="flex justify-center items-center gap-3">

                          <button
                            onClick={() =>
                              decrease(item.id, item.quantity)
                            }
                            className="w-9 h-9 rounded-full bg-red-500 text-white text-xl hover:bg-red-600"
                          >
                            -
                          </button>

                          <span className="text-xl font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increase(item.id, item.quantity)
                            }
                            className="w-9 h-9 rounded-full bg-green-600 text-white text-xl hover:bg-green-700"
                          >
                            +
                          </button>

                        </div>

                      </td>

                      <td className="text-center font-bold text-green-700">
                        ₹ {item.product.price * item.quantity}
                      </td>

                      <td className="text-center">

                        <button
                          onClick={() => deleteItem(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                        >
                          Remove
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            <div className="flex justify-end mt-8">

              <div className="bg-green-100 rounded-xl p-6 shadow-lg w-80">

                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  Cart Summary
                </h2>

                <div className="flex justify-between text-lg mb-3">
                  <span>Total Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between text-2xl font-bold text-green-700">
                  <span>Grand Total</span>
                  <span>₹ {grandTotal}</span>
                </div>

                <button onClick = { () => navigate("/checkout")}className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg transition">
                  Proceed to Checkout
                </button>

              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;