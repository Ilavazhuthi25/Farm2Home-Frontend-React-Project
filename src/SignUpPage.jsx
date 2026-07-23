import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const usernameRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");

  const signup = async (e) => {
    e.preventDefault();

    if (role === "") {
      alert("Please select a role");
      return;
    }

    try {
      const response = await axios.post(
        "https://farm2home-wntz.onrender.com/authentication/signup/",
        {
          username,
          password,
          role,
          email,
          phone_number,
        }
      );

      console.log(response.data);

      alert("Signup Successful");

      setUsername("");
      setPassword("");
      setEmail("");
      setPhone_number("");
      setRole("");

      usernameRef.current.focus();
    } catch (error) {
      console.log(error);
      alert("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-yellow-50 flex justify-center items-center p-6">

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">

        
        <div className="bg-green-700 text-white text-center py-8">

          <div className="text-6xl">🌱</div>

          <h1 className="text-4xl font-bold mt-2">
            Farm2Home
          </h1>

          <p className="text-green-100 mt-2">
            Fresh from Farm, to Your Home
          </p>

        </div>

       
        <form onSubmit={signup} className="p-8">

          <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
            Create Your Account
          </h2>

         
          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-2">
              Username
            </label>

            <input
              ref={usernameRef}
              type="text"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          
          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          
          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          
          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              maxLength="10"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              placeholder="Enter phone number"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

         
          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Select Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Choose your role</option>
              <option value="farmer">👨‍🌾 Farmer</option>
              <option value="customer">🛒 Customer</option>
              <option value="admin">👨‍💼 Admin</option>
            </select>
          </div>

         
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300"
          >
            🌱 Create Account
          </button>

         
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </form>

        {/* Footer */}
        <div className="bg-green-50 py-4 text-center text-gray-600 text-sm">
          🌾 Farm2Home • Connecting Farmers & Customers
        </div>

      </div>

    </div>
  );
};

export default SignupPage;