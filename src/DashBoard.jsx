import React, { useEffect, useState } from "react";
import axios from "axios";


const Dashboard = () => {

    const [data, setData] = useState({});

    useEffect(() => {
        getDashboard();
    }, []);

    const getDashboard = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(
                "http://127.0.0.1:8000/authentication/dashboard/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setData(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="dashboard">

            <div className="dashboard-card">

                <h1>{data.dashboard}</h1>

                <h2>Welcome {data.username}</h2>

                <p><strong>Role :</strong> {data.role}</p>

                {data.role === "farmer" && (

                    <div className="menu">

                        <button>Add Product</button>

                        <button>My Products</button>

                        <button>Orders</button>

                        <button>Profile</button>

                    </div>

                )}

                {data.role === "customer" && (

                    <div className="menu">

                        <button>Products</button>

                        <button>Cart</button>

                        <button>Orders</button>

                        <button>Profile</button>

                    </div>

                )}

                {data.role === "admin" && (

                    <div className="menu">

                        <button>Manage Farmers</button>

                        <button>Manage Customers</button>

                        <button>Manage Products</button>

                        <button>Profile</button>

                    </div>

                )}

            </div>

        </div>

    );

}

export default Dashboard;



