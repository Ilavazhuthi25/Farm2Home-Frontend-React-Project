import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCreate = () => {
  const navigate = useNavigate();
  
  const headers = {
  Authorization: `Bearer ${localStorage.getItem("access")}`,
}
  

  const [category, setCategory] = useState([]);
  const [category_id, setCategoryId] = useState("");
  const [product_name, setProductname] = useState("");
  const[description,setDescription] = useState("");
  const [product_code, setProductcode] = useState("");
  const [product_price, setProductprice] = useState("");
  const [product_gst, setProductgst] = useState("");
  const [product_stock, setProductstock] = useState("");
  const [product_kg, setProductkg] = useState("");
  const [product_image, setProductimage] = useState(null);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/inventory/category/",{headers} )
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const add_details = () => {

  const formData = new FormData();

  formData.append("category_id", category_id);
  formData.append("product_name", product_name);
  formData.append("description", description);
  formData.append("code", product_code);
  formData.append("price", product_price);
  formData.append("gst", product_gst);
  formData.append("stock", product_stock);
  formData.append("kg", product_kg);

  if (product_image) {
    formData.append("product_image", product_image);
  }

  axios
    .post(
      "http://127.0.0.1:8000/inventory/product/",
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
    .catch((error) => console.log(error));
};

  const category_options = category.map((c) => (
    <option key={c.id} value={c.id}>
      {c.category_name}
    </option>
  ));

  useEffect(() => {
    if (
      category_id !== "" &&
      product_name !== "" &&
      description != "" &&
      product_code !== "" &&
      product_price !== "" &&
      product_gst !== "" &&
      product_stock !== ""&&
      product_kg !==""
    ) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [
    category_id,
    product_name,
    description,
    product_code,
    product_price,
    product_gst,
    product_stock,
    product_kg
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-white to-yellow-50 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-green-200 p-8">

        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">
            🌿 Farm2Home
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Add Fresh Product
          </p>
        </div>

        <form className="space-y-5">

          <div>
            <label className="block text-green-700 font-semibold mb-2">
              <span className="text-red-500">*</span> Category
            </label>

            <select
              value={category_id}
              onChange={(event) => setCategoryId(event.target.value)}
              className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Category</option>
              {category_options}
            </select>
          </div>

          <div>
            <label className="block text-green-700 font-semibold mb-2">
              <span className="text-red-500">*</span> Product Name
            </label>

            <input
              type="text"
              value={product_name}
              onChange={(event) => setProductname(event.target.value)}
              placeholder="Enter Product Name"
              className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-green-700 font-semibold mb-2">
              <span className="text-red-500">*</span> Description
            </label>

            <textarea
              row = "4"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter description of  product "
              className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          
          <div>
            <label className="block text-green-700 font-semibold mb-2">
              <span className="text-red-500">*</span> Product Code
            </label>

            <input
              type="text"
              value={product_code}
              onChange={(event) => setProductcode(event.target.value)}
              placeholder="Enter Product Code"
              className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          
          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="block text-green-700 font-semibold mb-2">
                <span className="text-red-500">*</span> Price (₹)
              </label>

              <input
                type="number"
                value={product_price}
                onChange={(event) => setProductprice(event.target.value)}
                placeholder="0.00"
                className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-green-700 font-semibold mb-2">
                <span className="text-red-500">*</span> kg (kg)
              </label>

              <input
                type="number"
                value={product_kg}
                onChange={(event) => setProductkg(event.target.value)}
                placeholder="0.00"
                className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-green-700 font-semibold mb-2">
                <span className="text-red-500">*</span> GST (%)
              </label>

              <input
                type="number"
                value={product_gst}
                onChange={(event) => setProductgst(event.target.value)}
                placeholder="5"
                className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

          </div>

          
          <div>
            <label className="block text-green-700 font-semibold mb-2">
              <span className="text-red-500">*</span> Available Stock
            </label>

            <input
              type="text"
              value={product_stock}
              onChange={(event) => setProductstock(event.target.value)}
              placeholder="Enter Stock Quantity"
              className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-300"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={add_details}
              disabled={empty}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              🌱 Add Product
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default ProductCreate;