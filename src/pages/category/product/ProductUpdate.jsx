import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ProductUpdate = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const product = location.state;

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  const [category, setCategory] = useState([]);

  const [category_id, setCategoryId] = useState(product.category);
  const [product_name, setProductname] = useState(product.product_name);
  const [product_code, setProductcode] = useState(product.code);
  const [product_price, setProductprice] = useState(product.price);
  const [product_gst, setProductgst] = useState(product.gst);
  const [product_stock, setProductstock] = useState(product.stock);
  const [product_kg, setProductkg] = useState(product.kg);
  const [product_image, setProductimage] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/inventory/category/", {
        headers,
      })
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const UpdateProduct = () => {

    const formData = new FormData();

    formData.append("category_id", category_id);
    formData.append("product_name", product_name);
    formData.append("code", product_code);
    formData.append("price", product_price);
    formData.append("gst", product_gst);
    formData.append("stock", product_stock);
    formData.append("kg", product_kg);

    if (product_image) {
      formData.append("product_image", product_image);
    }

    axios
      .patch(
        `http://127.0.0.1:8000/inventory/product/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/productlist");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const category_options = category.map((c) => (
    <option key={c.id} value={c.id}>
      {c.category_name}
    </option>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-white to-yellow-50 flex justify-center items-center p-6">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-green-200 p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">
            🌿 Farm2Home
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Update Product
          </p>
        </div>

        <form className="space-y-5">

          <div>
            <label className="block text-green-700 font-semibold mb-2">
              Category
            </label>

            <select
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-green-300 rounded-lg px-4 py-3"
            >
              <option value="">Select Category</option>
              {category_options}
            </select>
          </div>

          <div>
            <label className="block text-green-700 font-semibold mb-2">
              Product Name
            </label>

            <input
              type="text"
              value={product_name}
              onChange={(e) => setProductname(e.target.value)}
              className="w-full border border-green-300 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-green-700 font-semibold mb-2">
              Product Code
            </label>

            <input
              type="text"
              value={product_code}
              onChange={(e) => setProductcode(e.target.value)}
              className="w-full border border-green-300 rounded-lg px-4 py-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="block text-green-700 font-semibold mb-2">
                Price (₹)
              </label>

              <input
                type="number"
                value={product_price}
                onChange={(e) => setProductprice(e.target.value)}
                className="w-full border border-green-300 rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-green-700 font-semibold mb-2">
                KG
              </label>

              <input
                type="number"
                value={product_kg}
                onChange={(e) => setProductkg(e.target.value)}
                className="w-full border border-green-300 rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-green-700 font-semibold mb-2">
                GST (%)
              </label>

              <input
                type="number"
                value={product_gst}
                onChange={(e) => setProductgst(e.target.value)}
                className="w-full border border-green-300 rounded-lg px-4 py-3"
              />
            </div>

          </div>

          <div>
            <label className="block text-green-700 font-semibold mb-2">
              Stock
            </label>

            <input
              type="text"
              value={product_stock}
              onChange={(e) => setProductstock(e.target.value)}
              className="w-full border border-green-300 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-green-700 font-semibold mb-2">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductimage(e.target.files[0])}
              className="w-full border border-green-300 rounded-lg px-4 py-3"
            />
          </div>

          <div className="flex justify-between mt-8">

            <button
              type="button"
              onClick={() => navigate("/productlist")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={UpdateProduct}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg"
            >
              🌱 Update Product
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ProductUpdate;