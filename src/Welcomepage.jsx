import React from "react"
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";


const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">

      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

     

        <div className="bg-green-100 flex items-center justify-center p-8">

          <img
            src={logo}
            alt="Logo"
            className="rounded-3xl shadow-xl object-cover "
          />

        </div>

        <div className="flex flex-col justify-center px-10 py-16">

          <h1 className="text-6xl font-extrabold text-green-700">
            🌿 Farm2Home
          </h1>

          <p className="text-2xl text-gray-700 mt-6">
            Fresh From Farm To Your Home
          </p>

          <p className="text-gray-500 mt-6 leading-8">
            Buy fresh vegetables, fruits, grains and organic products directly
            from farmers. Support local farmers while enjoying healthy and
            quality products delivered to your doorstep.
          </p>

          <div className="flex gap-5 mt-10">

            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Register
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default WelcomePage;