import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [category_data, setCategorydata] = useState([]);
  const navigate = useNavigate();

  const headers = {
  Authorization: `Bearer ${localStorage.getItem("access")}`,
}

  const getCategories = () => {
    console.log(headers)
    axios
      .get("http://127.0.0.1:8000/inventory/category/",{headers})
      .then((response) => {
        setCategorydata(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const DeleteCategory = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/inventory/category/${id}/`,{headers})
      .then(() => {
        getCategories(); // Refresh list after delete
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">

       
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-700">
              🌾 Farm2Home Categories
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your farm product categories
            </p>
          </div>

          <button
            onClick={() => navigate("/categorycreate")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            + Add Category
          </button>
        </div>

      
        <div className="overflow-x-auto rounded-xl border border-green-200">
          
          <table className="w-full text-sm text-center">
            <thead className="bg-green-600 text-white uppercase">
              <tr>
                <th className="py-4 px-4 border">S.No</th>
                <th className="py-4 px-4 border">Category</th>
                <th className="py-4 px-4 border">Description</th>
                <th className="py-4 px-4 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {category_data.length > 0 ? (
                category_data.map((category, index) => (
                  <tr
                    key={category.id}
                    className="hover:bg-green-100 even:bg-green-50 transition duration-200"
                  >
                    <td className="border px-4 py-3">{index + 1}</td>

                    <td className="border px-4 py-3 font-semibold ">
                      {category.category_name}
                    </td>

                    <td className="border px-4 py-3 font-semibold ">
                      {category.description}
                    </td>

                    <td className="border px-4 py-3 space-x-2">
                      <button
                        onClick={() => DeleteCategory(category.id)}
                        className="bg-red-500 hover:bg-red-600  px-4 py-2 rounded-lg shadow transition duration-300 font-bold "
                      >
                        Delete
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/categoryupdate/${category.id}`, {
                            state: category,
                          })
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow transition duration-300"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-8 text-gray-500 text-lg font-medium"
                  >
                    🌱 No Categories Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        
        <div className="mt-6 text-right text-sm text-gray-500">
          Total Categories:{" "}
          <span className="font-bold text-green-700">
            {category_data.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;