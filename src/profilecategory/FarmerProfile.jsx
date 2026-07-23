import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FarmerProfileCreate = () => {
  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  const [brand_name, setBrandName] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [about, setAbout] = useState("");
  const [profile_image, setProfileImage] = useState(null);

  const CreateProfile = () => {
    const formData = new FormData();

    formData.append("brand_name", brand_name);
    formData.append("village", village);
    formData.append("district", district);
    formData.append("state", state);
    formData.append("pincode", pincode);
    formData.append("about", about);

    if (profile_image) {
      formData.append("profile_image", profile_image);
    }

    axios
      .post(
        "https://farm2home-wntz.onrender.com/inventory/farmerprofile/",
        formData,
        { headers }
      )
      .then((response) => {
        console.log(response.data);
        
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to Create Profile");
      });
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl border border-green-200 p-8">

        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">
            🌾 Farmer Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your Farm Details
          </p>
        </div>

        <div className="space-y-5">

          
          <div>
            <label className="block font-semibold text-green-700 mb-2">
              Brand Name
            </label>

            <input
              type="text"
              value={brand_name}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Green Valley Farm"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          
          <div>
            <label className="block font-semibold text-green-700 mb-2">
              Village
            </label>

            <input
              type="text"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              placeholder="Enter Village"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          
          <div>
            <label className="block font-semibold text-green-700 mb-2">
              District
            </label>

            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Enter District"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          
          <div>
            <label className="block font-semibold text-green-700 mb-2">
              State
            </label>

            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter State"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

         
          <div>
            <label className="block font-semibold text-green-700 mb-2">
              Pincode
            </label>

            <input
              type="text"
              maxLength="6"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter Pincode"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-green-700 mb-2">
              About Farm
            </label>

            <textarea
              rows="4"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Write something about your farm..."
              className="w-full border border-green-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          
          <div>
            <label className="block font-semibold text-green-700 mb-2">
              Farm Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="w-full border border-green-300 rounded-lg p-3"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
{/* 
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow"
            >
              ← Back
            </button> */}

            <button
              type="button"
              onClick={CreateProfile}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow"
            >
              🌱 Save Profile
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default FarmerProfileCreate;