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

import AdminDashboard from "components/Admin/AdminDashboard";
import SignIn from "components/Signin";
import SignUp from "components/Signup";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

//Marketplace
import Homepage from "components/Market/Homepage";
import DetailProduct from "components/Market/DetailProduct";

//Merchant
import MerchantProducts from "components/Merchant/Products";
import MerchantDashbroad from "components/Merchant/MerchantDashbroad";

function App() {
  const [cookies] = useCookies(["access_token"]);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.access_token) {
      const { role } = jwt_decode(cookies.access_token);
      console.log("cookies", role);
      setRole(role);
    } else {
      // Nếu không có access_token, chuyển hướng đến trang đăng nhập
      navigate("/signin");
    }
  }, [cookies.access_token, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/merchant" element={<MerchantDashbroad />} />
        <Route path="/merchant/products" element={<MerchantProducts />} />
        <Route path="/marketplace" element={<Homepage />} />

        <Route path="/marketplace/product/:slug" element={<DetailProduct />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
