import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/authContext";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      // Thực hiện đăng xuất (xóa user và token)
      await logout();

      // Chuyển hướng đến trang Signin sau khi đăng xuất
      navigate("/signin");
    };

    handleLogout();
  }, [navigate, logout]);

  return null; // Không render gì cả
}

export default Logout;
