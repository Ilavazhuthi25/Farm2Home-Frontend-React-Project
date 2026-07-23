import React from 'react'
import WelcomePage from './Welcomepage'
import SignupPage from './SignUpPage'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Loginpage from './Loginpage'
import Profiles from './Profiles'
// import Dashboard from './DashBoard'
import CategoryList from './pages/category/CategoryList'
import CategoryCreate from './pages/category/CategoryCreate'
import CategoryUpdate from './pages/category/CategoryUpdate'
import ProductList from './pages/category/product/ProductList'
import ProductCreate from './pages/category/product/ProductCreate'
import ProductUpdate from './pages/category/product/ProductUpdate'
import FarmerProfileCreate from './profilecategory/FarmerProfile'
import CustomerProductView from './customer/CustomerProductView'
import Cart from './customer/Cart'
import Checkout from './customer/Checkout'
import MyOrderView from './customer/MyOrderView'
import FarmerOrderView from './customer/FarmerOrderView'
import ProtectedRoute from './ProductedRoute'
import AdminDashboard from './Admindashboard'
import AddressCreate from './address/AddressCreate'
import AddressList from './address/AddressList'
import AddressUpdate from './address/AddressUpdate'
const App = () => {

  const location = useLocation()
  
  const hideNavbar =
  location.pathname === "/" ||
  location.pathname === "/login" ||
  location.pathname === "/signup";
  

  
  return (
    <div>
    

    {!hideNavbar && <Navbar/>}


    <Routes>

       

        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>

        <Route path="/categorylist" element={ <ProtectedRoute  allowed_roles= {["admin","farmer"]}><CategoryList/> </ProtectedRoute>}/>
        <Route path="/categorycreate" element={ <ProtectedRoute  allowed_roles= {["admin","farmer"]}><CategoryCreate/> </ProtectedRoute>}/>
        <Route path="/categoryupdate/:id" element={ <ProtectedRoute  allowed_roles= {["admin","farmer"]}><CategoryUpdate/> </ProtectedRoute>}/>
        <Route path="/farmerorderview" element={ <ProtectedRoute  allowed_roles= {["admin","farmer"]}><FarmerOrderView/> </ProtectedRoute>}/>
        <Route path="/profile" element={ <ProtectedRoute  allowed_roles= {["admin","farmer","customer"]}><Profiles/> </ProtectedRoute>}/>
        <Route path="/admindashboard" element={ <ProtectedRoute  allowed_roles= {["admin"]}><AdminDashboard/> </ProtectedRoute>}/>

        <Route path="/productlist" element={<ProtectedRoute  allowed_roles= {["admin","farmer"]}><ProductList/> </ProtectedRoute>}/>
        <Route path="/productcreate" element={<ProtectedRoute  allowed_roles= {["admin","farmer"]}><ProductCreate/> </ProtectedRoute>}/> 
        <Route path="/productupdate/:id" element={<ProtectedRoute  allowed_roles= {["admin","farmer"]}><ProductUpdate/> </ProtectedRoute>}/> 
        
       <Route path="/customerproductview" element={<ProtectedRoute  allowed_roles= {["admin","customer"]}><CustomerProductView/> </ProtectedRoute>}/>
       <Route path="/cart" element={<ProtectedRoute  allowed_roles= {["admin","customer"]}><Cart/> </ProtectedRoute>}/>
       <Route path="/checkout" element={<ProtectedRoute  allowed_roles= {["admin","customer"]}><Checkout/> </ProtectedRoute>}/>
       <Route path="/myorders" element={<ProtectedRoute  allowed_roles= {["admin","customer"]}><MyOrderView/> </ProtectedRoute>}/>
     
        
       <Route path="/addresslist" element={<ProtectedRoute  allowed_roles= {["admin","customer","farmer"]}><AddressList/> </ProtectedRoute>}/>
       <Route path="/addresscreate" element={<ProtectedRoute  allowed_roles= {["admin","customer","farmer"]}><AddressCreate/> </ProtectedRoute>}/>
       <Route path="/addressupdate" element={<ProtectedRoute  allowed_roles= {["admin","customer","farmer"]}><AddressUpdate/> </ProtectedRoute>}/>
     
        
        
      </Routes>


   


 

      
    </div>
  )
}

export default App
