import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddressCreate = () => {

  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  const [full_name, setFullName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [door_no, setDoorNo] = useState("");
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");

  const SaveAddress = () => {

    axios.post(
      "https://farm2home-wntz.onrender.com/billing/address/",
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
        is_default: true
      },
      { headers }
    )
    .then(() => {
      navigate("/addresslist");
    })
    .catch(err => console.log(err));

  };

  return (

    <div className="min-h-screen bg-green-50 flex justify-center items-center p-8">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl text-center font-bold text-green-700 mb-8">
          📍 Add Address
        </h1>

        <div className="grid grid-cols-2 gap-5">

          <input
            placeholder="Full Name"
            className="border p-3 rounded-lg"
            value={full_name}
            onChange={(e)=>setFullName(e.target.value)}
          />

          <input
            placeholder="Phone Number"
            className="border p-3 rounded-lg"
            value={phone_number}
            onChange={(e)=>setPhone(e.target.value)}
          />

          <input
            placeholder="Door No"
            className="border p-3 rounded-lg"
            value={door_no}
            onChange={(e)=>setDoorNo(e.target.value)}
          />

          <input
            placeholder="Street"
            className="border p-3 rounded-lg"
            value={street}
            onChange={(e)=>setStreet(e.target.value)}
          />

          <input
            placeholder="Area"
            className="border p-3 rounded-lg"
            value={area}
            onChange={(e)=>setArea(e.target.value)}
          />

          <input
            placeholder="City"
            className="border p-3 rounded-lg"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
          />

          <input
            placeholder="District"
            className="border p-3 rounded-lg"
            value={district}
            onChange={(e)=>setDistrict(e.target.value)}
          />

          <input
            placeholder="State"
            className="border p-3 rounded-lg"
            value={state}
            onChange={(e)=>setState(e.target.value)}
          />

          <input
            placeholder="Pincode"
            className="border p-3 rounded-lg"
            value={pincode}
            onChange={(e)=>setPincode(e.target.value)}
          />

          <input
            placeholder="Landmark"
            className="border p-3 rounded-lg"
            value={landmark}
            onChange={(e)=>setLandmark(e.target.value)}
          />

        </div>

        <div className="mt-8 text-center">

          <button
            onClick={SaveAddress}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-lg"
          >
            Save Address
          </button>

        </div>

      </div>

    </div>

  );
};

export default AddressCreate;