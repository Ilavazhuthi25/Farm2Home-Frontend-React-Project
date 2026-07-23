import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerProductView = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  };

  useEffect(() => {
    getProducts();
  }, [search]);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/inventory/product-search/?search=${search}`,
        {
          headers,
        }
      );

      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (id) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/billing/cart/",
        {
          product: id,
          quantity: 1,
        },
        {
          headers,
        }
      );

      alert("Product Added To Cart");
      navigate("/cart")
    } catch (err) {
      console.log(err);
      alert("Already Added To Cart");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10 px-5">

      
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-green-700">
          🌾 Fresh Farm Products
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          Fresh from Farm to Your Home
        </p>
      </div>

      
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="🔍 Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl px-5 py-3 border-2 border-green-500 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.length > 0 ? (

          products.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl duration-300 overflow-hidden"
            >

              
              <img
                src={item.product_image}
                alt={item.product_name}
                className="h-60 w-full object-cover"
              />

              
              <div className="p-5">

                <h2 className="text-2xl font-bold text-green-700">
                  {item.product_name}
                </h2>

                <p className="text-gray-500 mt-2">
                  {item.description}
                </p>

                <div className="mt-4 space-y-2">

                  <p>
                    <span className="font-semibold">
                      Category :
                    </span>{" "}
                    {item.category_name}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Code :
                    </span>{" "}
                    {item.code}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Price :
                    </span>{" "}
                    ₹ {item.price}
                  </p>

                  <p>
                    <span className="font-semibold">
                      GST :
                    </span>{" "}
                    {item.gst}%
                  </p>

                  <p>
                    <span className="font-semibold">
                      Stock :
                    </span>{" "}
                    {item.stock}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Weight :
                    </span>{" "}
                    {item.kg} Kg
                  </p>

                </div>

                <button
                  onClick={() => addToCart(item.id)}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-lg transition"
                >
                  🛒 Add To Cart
                </button>

              </div>

            </div>

          ))

        ) : (

          <div className="col-span-4 text-center py-20">

            <h2 className="text-3xl font-bold text-red-500">
              No Products Found
            </h2>

          </div>

        )}

      </div>

    </div>
  );
};

export default CustomerProductView;