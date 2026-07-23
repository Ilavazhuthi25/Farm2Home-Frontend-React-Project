import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddressList = () => {

  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  const [addressData, setAddressData] = useState([]);

  useEffect(() => {
    getAddress();
  }, []);
 

  const getAddress = () => {

    axios
      .get("https://farm2home-wntz.onrender.com/billing/address/", { headers })
      .then((response) => {
        setAddressData(response.data);
      })
      .catch((error) => console.log(error));

  };

  const DeleteAddress = (id) => {

    axios
      .delete(`https://farm2home-wntz.onrender.com/billing/address/${id}/`, { headers })
      .then(() => {
        getAddress();
      })
      .catch((error) => console.log(error));

  };

  return (

    <div className="min-h-screen bg-green-50 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold text-green-700">
            📍 My Addresses
          </h1>

          <button
            onClick={() => navigate("/addresscreate")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Address
          </button>

        </div>

        {addressData.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-10 text-center text-xl text-gray-500">
            No Address Added
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {addressData.map((address) => (

              <div
                key={address.id}
                className="bg-white rounded-2xl shadow-xl p-6 border border-green-200"
              >

                <div className="flex justify-between">

                  <h2 className="text-2xl font-bold text-green-700">
                    {address.full_name}
                  </h2>

                  {address.is_default && (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      Default
                    </span>
                  )}

                </div>

                <div className="mt-4 space-y-2 text-gray-700">

                  <p>
                    📞 <b>Phone:</b> {address.phone_number}
                  </p>

                  <p>
                    🏠 <b>Door No:</b> {address.door_no}
                  </p>

                  <p>
                    🛣 <b>Street:</b> {address.street}
                  </p>

                  <p>
                    📍 <b>Area:</b> {address.area}
                  </p>

                  <p>
                    🏙 <b>City:</b> {address.city}
                  </p>

                  <p>
                    🌎 <b>District:</b> {address.district}
                  </p>

                  <p>
                    🗺 <b>State:</b> {address.state}
                  </p>

                  <p>
                    📮 <b>Pincode:</b> {address.pincode}
                  </p>

                  <p>
                    📌 <b>Landmark:</b> {address.landmark}
                  </p>

                </div>

                <div className="flex gap-4 mt-6">

                  <button
                    onClick={() =>
                      navigate(`/addressupdate/${address.id}`, {
                        state: address,
                      })
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => DeleteAddress(address.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate("/checkout")}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Use this address
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
};

export default AddressList;