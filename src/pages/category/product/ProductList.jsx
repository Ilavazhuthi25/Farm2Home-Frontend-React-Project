import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductList = () => {

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  const [product_data, setProductdata] = useState([]);
  const navigate = useNavigate();

  const DeleteProduct = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/inventory/product/${id}/`, {
        headers,
      })
      .then((response) => {
        console.log(response.data);

        setProductdata((prev) =>
          prev.filter((product) => product.id !== id)
        );
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/inventory/product/", {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        setProductdata(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-green-700">
              🌾 Farm2Home Products
            </h1>

            <p className="text-gray-600 mt-2">
              Fresh From Farm, To Your Home
            </p>
          </div>

          <button
            onClick={() => navigate("/productcreate")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
          >
            ➕ Add Product
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-200">

          <table className="w-full">

            <thead className="bg-green-600 text-white">

              <tr>
                <th className="py-4 px-4">S.No</th>
                <th className="py-4 px-4">Image</th>
                <th className="py-4 px-4">Product Name</th>
                <th className="py-4 px-4">Description</th>
                <th className="py-4 px-4">Code</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Kg</th>
                <th className="py-4 px-4">GST (%)</th>
                <th className="py-4 px-4">Stock</th>
                <th className="py-4 px-4">Delete</th>
                <th className="py-4 px-4">Update</th>
              </tr>

            </thead>

            <tbody>

              {product_data.length > 0 ? (

                product_data.map((product, index) => (

                  <tr
                    key={product.id}
                    className="border-b hover:bg-green-50 transition"
                  >

                    <td className="py-4 px-4 text-center">
                      {index + 1}
                    </td>

                    {/* Product Image */}
                    <td className="py-4 px-4 text-center">

                      {product.product_image ? (

                        <img
                          src={`http://127.0.0.1:8000${product.product_image}`}
                          alt={product.product_name}
                          className="w-20 h-20 object-cover rounded-lg border mx-auto"
                        />

                      ) : (

                        <span className="text-gray-500">
                          No Image
                        </span>

                      )}

                    </td>

                    <td className="py-4 px-4 font-semibold text-green-700">
                      {product.product_name}
                    </td>

                    <td className="py-4 px-4">
                      {product.description}
                    </td>

                    <td className="py-4 px-4 text-center">
                      {product.code}
                    </td>

                    <td className="py-4 px-4 text-center">
                      ₹ {product.price}
                    </td>

                    <td className="py-4 px-4 text-center">
                      {product.kg} kg
                    </td>

                    <td className="py-4 px-4 text-center">
                      {product.gst}%
                    </td>

                    <td className="py-4 px-4 text-center">
                      {product.stock}
                    </td>

                    <td className="py-4 px-4 text-center">

                      <button
                        onClick={() => DeleteProduct(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        Delete
                      </button>

                    </td>

                    <td className="py-4 px-4 text-center">

                      <button
                        onClick={() =>
                          navigate(`/productupdate/${product.id}`, {
                            state: product,
                          })
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        Update
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="11"
                    className="py-10 text-center text-gray-500 text-lg"
                  >
                    🌱 No Products Available
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        <div className="mt-6 text-right text-gray-600 text-lg">
          Total Products :
          <span className="font-bold text-green-700 ml-2">
            {product_data.length}
          </span>
        </div>

      </div>

    </div>
  );
};

export default ProductList;