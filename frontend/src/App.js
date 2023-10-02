import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import SignIn from "components/Signin";
import SignUp from "components/Signup";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

//Admin
import AdminDashboard from "components/Admin/AdminDashboard";
import Shops from "components/Admin/Shops";
import Tours from "components/Admin/Tours";
import TourOrders from "components/Admin/TourOrders";

//Marketplace
import Homepage from "components/Market/Homepage";
import DetailProduct from "components/Market/DetailProduct";

//Merchant
import MerchantProducts from "components/Merchant/Products";
import MerchantDashbroad from "components/Merchant/MerchantDashbroad";
import Orders from "components/Merchant/Orders";

function App() {
  const [cookies] = useCookies(["access_token"]);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/shops" element={<Shops />} />
        <Route path="/admin/tours" element={<Tours />} />
        <Route path="/admin/tour-orders" element={<TourOrders />} />

        {/* Merchant */}
        <Route path="/merchant" element={<MerchantDashbroad />} />
        <Route path="/merchant/products" element={<MerchantProducts />} />
        <Route path="/merchant/orders" element={<Orders />} />

        {/* Marketplace */}
        <Route path="/marketplace" element={<Homepage />} />

        <Route path="/marketplace/product/:slug" element={<DetailProduct />} />

        {/* Auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
