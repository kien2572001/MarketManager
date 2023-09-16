// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "context/authContext";

// const Auth = ({ allowedRoles }) => {
//   const { user, accessToken, login, logout, isLoggedIn, showAll } = useAuth();
//   const location = useLocation();
//   if (allowedRoles.includes(user?.role)) {
//     return <Outlet />;
//   } else if (isLoggedIn()) {
//     return <Navigate to="/unauthorized" />;
//   } else {
//     return <Navigate to="/signin" />;
//   }
// };

// export default Auth;
