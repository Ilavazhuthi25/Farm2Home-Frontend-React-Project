import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";

const CategoryCreate = () => {

   const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`
}
  const [category_name, setCategoryname] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const categorycreate = () => {
    axios
      .post("http://127.0.0.1:8000/inventory/category/", {
        category_name,
        description,
        
      },{headers}
    )
      .then(() => {
        navigate("/categorylist");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-green-200 p-8">

        
        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
          Farm2Home
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create a New Category
        </p>

        
        <div className="mb-5">
          <label className="block text-green-700 font-semibold mb-2">
            Category Name
          </label>

          <input
            type="text"
            value={category_name}
            onChange={(event) => setCategoryname(event.target.value)}
            placeholder="Enter Category Name"
            className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        
        <div className="mb-6">
          <label className="block text-green-700 font-semibold mb-2">
            Description
          </label>

          <textarea
            rows="4"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter Category Description"
            className="w-full border border-green-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

     
        <div className="flex justify-between">

          <button
            onClick={() => navigate("/categorylist")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow transition duration-300"
          >
            ← Back
          </button>

          <button
            onClick={categorycreate}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow transition duration-300"
          >
            <img src={logo} alt="Logo" className="w-6 h-6 object-contain"/>Save Category

            
          </button>

        </div>

      </div>
    </div>
  );
};

export default CategoryCreate;
