import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboard from "components/Admin/AdminDashboard";
import SignIn from "components/Signin";
import SignUp from "components/Signup";
import Homepage from "components/Market/Homepage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/merchant" element={<AdminDashboard />} />
          <Route path="/marketplace" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
