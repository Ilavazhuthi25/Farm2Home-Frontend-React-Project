import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "./assets/logo.png";

const Navbar = () => {
  const role = localStorage.getItem("role") || "";

  const menu_list = [
    {
      path: "/categorylist",
      pathname: "Categories",
      allowed_roles: ["admin", "farmer"],
    },
    {
      path: "/productlist",
      pathname: "Products",
      allowed_roles: ["admin", "farmer"],
    },
    {
      path: "/customerproductview",
      pathname: "CustomerProductsView",
      allowed_roles: ["admin", "customer"],
    },
    {
      path: "/farmerorderview",
      pathname: "Orders",
      allowed_roles: ["admin", "farmer"],
    },
    {
      path: "/admindashboard",
      pathname: "AdmindashBoard",
      allowed_roles: ["admin"],
    },
    {
      path: "/myorders",
      pathname: "Myorders",
      allowed_roles: ["admin","customer"],
    },
  ];

  const allowedMenu = menu_list.filter((menu) =>
    menu.allowed_roles.includes(role)
  );

  return (
    <div className="bg-gradient-to-r from-green-700 to-green-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

       
        <div className="flex items-center gap-3 flex-1">
          <img
            src={logo}
            alt="Logo"
            className="w-14 h-14 rounded-full bg-white p-1 shadow-md"
          />

          <h1 className="text-3xl font-bold text-white">
            Farm2Home
          </h1>
        </div>

        <div className="flex justify-center flex-1">
          <nav>
            <ul className="flex items-center gap-8 text-white font-semibold text-lg">
              {allowedMenu.map((menu, index) => (
                <li key={index}>
                  <NavLink
                    to={menu.path}
                    className={({ isActive }) =>
                      `transition-all duration-300 hover:text-yellow-300 hover:scale-105 ${
                        isActive
                          ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                          : ""
                      }`
                    }
                  >
                    {menu.pathname}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        
        <div className="flex justify-end items-center gap-6 flex-1">

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 text-white font-semibold transition-all duration-300 hover:text-yellow-300 ${
                isActive ? "text-yellow-300" : ""
              }`
            }
          >
            <FaUserCircle className="text-3xl" />
            <span>Profile</span>
          </NavLink>

          

        </div>

      </div>
    </div>
  );
};

export default Navbar;