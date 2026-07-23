import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CategoryUpdate = () => {

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`
}
  const navigate = useNavigate();

  const { id } = useParams();
  const location = useLocation();

  const category = location.state;

  const [category_name, setCategoryname] = useState(category.category_name);
  const [description, setDescription] = useState(category.description);

  const UpdateCategory = () => {
    axios
      .patch(`http://127.0.0.1:8000/inventory/category/${id}/`, {
        category_name,
        description,
      },{headers})
      .then((response) => {
        console.log(response.data);
        navigate("/categorylist");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-yellow-50 flex justify-center items-center p-5">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

        
        <div className="bg-green-700 text-white text-center py-6">
          <h1 className="text-3xl font-bold">🌿 Farm2Home</h1>
          <p className="text-green-100 mt-1">
            Fresh from Farm, to Your Home
          </p>
        </div>

       
        <div className="p-8">
          <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
            ✏️ Update Category
          </h2>

          <div className="space-y-5">
           
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={category_name}
                onChange={(e) => setCategoryname(e.target.value)}
                className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter category name"
              />
            </div>

          
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-green-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter category description"
              ></textarea>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate("/categorylist")}
                className="w-1/2 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold transition duration-300"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={UpdateCategory}
                className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
              >
                ✅ Update Category
              </button>
            </div>
          </div>
        </div>

       
        <div className="bg-green-50 text-center py-3 text-sm text-gray-600">
          🌱 Farm2Home Inventory Management
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;

