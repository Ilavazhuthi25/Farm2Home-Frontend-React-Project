import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const getAddresses = async () => {

    try {

      const response = await axios.get(
        "https://farm2home-wntz.onrender.com/billing/address/",
        { headers }
      );

      setAddresses(response.data);

      if (response.data.length > 0) {
        setSelectedAddress(response.data[0].id);
      }

    } catch (err) {
      console.log(err);
    }

  };

  const placeOrder = async () => {

    if (!selectedAddress) {
      alert("Please Select Address");
      return;
    }

    try {

      const response = await axios.post(
        "https://farm2home-wntz.onrender.com/billing/checkout/",
        {
          address: selectedAddress,
        },
        {
          headers,
        }
      );

      console.log(response.data);

      alert("🎉 Order Placed Successfully");

      navigate("/myorders");

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Unable to Place Order");
      }

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-green-100 via-green-50 to-white flex justify-center items-center p-6">

      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-green-700">
            🌾 Farm2Home
          </h1>

          <p className="text-gray-500 mt-2">
            Checkout
          </p>

        </div>

        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Select Delivery Address
        </h2>

        {addresses.length === 0 ? (

          <div className="text-center">

            <p className="text-red-500 text-lg mb-5">
              No Address Found
            </p>

            <button
              onClick={() => navigate("/addresscreate")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              + Add Address
            </button>

          </div>

        ) : (

          <div className="space-y-5">

            {addresses.map((address) => (

              <div
                key={address.id}
                className="border rounded-xl p-5 shadow hover:border-green-500"
              >

                <label className="flex gap-4 cursor-pointer">

                  <input
                    type="radio"
                    name="address"
                    value={address.id}
                    checked={selectedAddress === address.id}
                    onChange={() => setSelectedAddress(address.id)}
                  />

                  <div>

                    <h3 className="font-bold text-xl text-green-700">
                      {address.full_name}
                    </h3>

                    <p>{address.phone_number}</p>

                    <p>
                      {address.door_no}, {address.street}
                    </p>

                    <p>
                      {address.area}, {address.city}
                    </p>

                    <p>
                      {address.district}, {address.state}
                    </p>

                    <p>
                      {address.pincode}
                    </p>

                    <p>
                      {address.landmark}
                    </p>

                  </div>

                </label>

              </div>

            ))}

            <button
              onClick={() => navigate("/addresscreate")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              + Add New Address
            </button>

          </div>

        )}

        <div className="bg-green-50 rounded-xl p-5 mt-8">

          <h2 className="text-xl font-bold text-green-700 mb-3">
            Payment Method
          </h2>

          <div className="flex items-center">

            <input
              type="radio"
              checked
              readOnly
              className="mr-3"
            />

            <span className="font-semibold">
              Cash On Delivery
            </span>

          </div>

        </div>

        <div className="flex justify-between mt-8">

          <button
            onClick={() => navigate("/cart")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl"
          >
            ← Back to Cart
          </button>

          <button
            onClick={placeOrder}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold"
          >
            ✅ Place Order
          </button>

        </div>

      </div>

    </div>

  );
};

export default Checkout;