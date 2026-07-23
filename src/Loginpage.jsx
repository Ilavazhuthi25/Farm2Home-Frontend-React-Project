import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
// import logo from "./assets/logo.png";
// import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Loginpage = () => {

  const navigate = useNavigate();
  const ref = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {

      
      const response = await axios.post(
        "http://127.0.0.1:8000/authentication/token/",
        {
          username,
          password,
        }
      );

      
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      const token = response.data.access;

    
      const profile = await axios.get(
        "http://127.0.0.1:8000/authentication/profile/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      localStorage.setItem("role", profile.data.role);

     
      if (profile.data.role === "customer") {
        navigate("/customerproductview");
      } 
      else if (profile.data.role === "farmer") {
        navigate("/categorylist");
      } 
      else if (profile.data.role === "admin") {
        navigate("/admindashboard");
      }

      setUsername("");
      setPassword("");

      ref.current.focus();
      // toast.success("Login Successful");

      

    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  


  useEffect(() => {

    const fetchToken = async () => {

      console.log("object")

        const refresh = localStorage.getItem("refresh");

        if (!refresh) return;

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/authentication/refresh/",
                { refresh }
            );

            console.log(response.data, "access")

            localStorage.setItem("access", response.data.access);

        } catch (err) {
            localStorage.clear();
        }
    };

    fetchToken();

    const interval = setInterval(fetchToken, 60000);

    // return () => clearInterval(interval);

}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-yellow-50 flex justify-center items-center p-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-green-700 text-white text-center py-8">
          <div className="text-6xl">🌿</div>

          <h1 className="text-4xl font-bold mt-3">
            Farm2Home
          </h1>

          <p className="text-green-100 mt-2">
            Fresh from Farm, to Your Home
          </p>
        </div>

        <form onSubmit={login} className="p-8">

          <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
            Welcome Back 👋
          </h2>

          <div className="mb-5">
            <label className="block font-semibold mb-2">
              Username
            </label>

            <input
              ref={ref}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            Login
          </button>

          <p className="text-center mt-5">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-green-700 font-bold"
            >
              Sign Up
            </Link>
          </p>


        </form>

      </div>
     
    </div>
  );
};

export default Loginpage;