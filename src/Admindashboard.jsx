import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-green-100">

            <h1 className="text-5xl font-bold text-green-700 mb-10">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-2 gap-6">

                <button
                    onClick={() => navigate("/categorylist")}
                    className="bg-green-600 text-white px-8 py-4 rounded-lg"
                >
                    Categories
                </button>

                <button
                    onClick={() => navigate("/productlist")}
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg"
                >
                    Products
                </button>

                <button
                    onClick={() => navigate("/customerproductview")}
                    className="bg-yellow-600 text-white px-8 py-4 rounded-lg"
                >
                    Customer View
                </button>

                <button
                    onClick={() => navigate("/farmerorderview")}
                    className="bg-red-600 text-white px-8 py-4 rounded-lg"
                >
                    Farmer Orders
                </button>

            </div>

        </div>
    );
};

export default AdminDashboard;