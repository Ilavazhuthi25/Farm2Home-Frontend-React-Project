import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profiles = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(
        "https://farm2home-wntz.onrender.com/authentication/profile/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to fetch profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-yellow-50 flex justify-center items-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden">

        <div className="bg-green-700 text-white p-8 text-center">

          <div className="w-32 h-32 mx-auto rounded-full bg-white flex items-center justify-center text-6xl shadow-lg border-4 border-green-300">
            👨‍🌾
          </div>

          <h1 className="text-4xl font-bold mt-5">
            {user.username}
          </h1>

          <p className="text-green-100 text-lg">
            Fresh from Farm, to Your Home
          </p>

        </div>

      

        <div className="p-10">

          <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
            My Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-green-50 rounded-xl p-5 shadow">
              <p className="text-gray-500 font-semibold">User ID</p>
              <p className="text-xl font-bold">{user.id}</p>
            </div>

            <div className="bg-green-50 rounded-xl p-5 shadow">
              <p className="text-gray-500 font-semibold">Username</p>
              <p className="text-xl font-bold">{user.username}</p>
            </div>

            <div className="bg-green-50 rounded-xl p-5 shadow">
              <p className="text-gray-500 font-semibold">Email</p>
              <p className="text-xl font-bold">
                {user.email || "Not Provided"}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5 shadow">
              <p className="text-gray-500 font-semibold">Phone Number</p>
              <p className="text-xl font-bold">
                {user.phone_number || "Not Provided"}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5 shadow">
              <p className="text-gray-500 font-semibold">Role</p>

              <span
                className={`inline-block px-4 py-2 rounded-full text-white font-bold mt-2
                ${
                  user.role === "farmer"
                    ? "bg-green-600"
                    : user.role === "customer"
                    ? "bg-blue-600"
                    : "bg-red-600"
                }`}
              >
                {user.role}
              </span>
            </div>

            <div className="bg-green-50 rounded-xl p-5 shadow">
              <p className="text-gray-500 font-semibold">Account Status</p>

              <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full mt-2 font-semibold">
                Active
              </span>
            </div>

          </div>

          
          <div className="flex justify-center gap-5 mt-10">

            <button
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-lg transition"
            >
              ✏️ Edit Profile
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg transition"
            >
              🏠 Dashboard
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                navigate("/login");
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl shadow-lg transition"
            >
              🚪 Logout
            </button>

          </div>

        </div>

        {/* Footer */}

        <div className="bg-green-100 py-5 text-center text-gray-600">
          🌱 <span className="font-bold">Farm2Home</span> | Connecting Farmers & Customers
        </div>

      </div>

    </div>
  );
};

export default Profiles;