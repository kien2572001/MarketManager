import { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // Kiểm tra xem có dữ liệu trong Local Storage không
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedUser && storedAccessToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedAccessToken);
    }
  }, []);

  const login = (user, accessToken) => {
    setUser(user);
    setAccessToken(accessToken);

    // Lưu vào Local Storage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
  };

  useEffect(() => {
    showAll();
  }, [user, accessToken]);

  const logout = () => {
    setUser(null);
    setAccessToken(null);

    // Xóa khỏi Local Storage
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  const isLoggedIn = () => {
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedUser && storedAccessToken) {
      const decoded = jwtDecode(storedAccessToken);
      if (decoded.exp * 1000 < Date.now()) {
        logout();
        return false;
      }
      return true;
    }
    return false;
  };

  const getUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };

  const getAccessToken = () => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      return storedAccessToken;
    }
    return null;
  };

  const showAll = () => {
    console.log("AuthContext: user", JSON.stringify(user));
    console.log("AuthContext: accessToken", accessToken);
    console.log("AuthContext: isLoggedIn", isLoggedIn());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        isLoggedIn,
        showAll,
        getUser,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
