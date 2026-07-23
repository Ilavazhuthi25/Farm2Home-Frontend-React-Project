import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AddressUpdate = () => {

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const address = location.state;

  const [full_name, setFullName] = useState(address.full_name);
  const [phone_number, setPhone] = useState(address.phone_number);
  const [door_no, setDoorNo] = useState(address.door_no);
  const [street, setStreet] = useState(address.street);
  const [area, setArea] = useState(address.area);
  const [city, setCity] = useState(address.city);
  const [district, setDistrict] = useState(address.district);
  const [state, setState] = useState(address.state);
  const [pincode, setPincode] = useState(address.pincode);
  const [landmark, setLandmark] = useState(address.landmark);
  const [is_default, setIsDefault] = useState(address.is_default);

  const UpdateAddress = () => {

    axios.patch(
      `https://farm2home-wntz.onrender.com/billing/address/${id}/`,
      {
        full_name,
        phone_number,
        door_no,
        street,
        area,
        city,
        district,
        state,
        pincode,
        landmark,
        is_default,
      },
      { headers }
    )
    .then((response) => {
      console.log(response.data);
      navigate("/addresslist");
    })
    .catch((error) => console.log(error));

  };

  return (

    <div className="min-h-screen bg-green-50 flex justify-center items-center p-8">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">

        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          ✏️ Update Address
        </h1>

        <div className="grid grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Full Name"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Door No"
            value={door_no}
            onChange={(e) => setDoorNo(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="border p-3 rounded-lg"
          />

        </div>

        <div className="mt-5">

          <label className="flex items-center gap-3 text-lg">

            <input
              type="checkbox"
              checked={is_default}
              onChange={(e) => setIsDefault(e.target.checked)}
            />

            Default Address

          </label>

        </div>

        <div className="flex justify-between mt-8">

          <button
            onClick={() => navigate("/addresslist")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
          >
            ← Back
          </button>

          <button
            onClick={UpdateAddress}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
          >
            ✅ Update Address
          </button>

        </div>

      </div>

    </div>

  );
};

export default AddressUpdate;