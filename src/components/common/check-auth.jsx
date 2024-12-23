/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  console.log(location.pathname, isAuthenticated);
  console.log("user role:", user?.role);
  // Handle admin-only routes
  if (location.pathname.includes("/admin")) {
    console.log(location.pathname, isAuthenticated, "/admin");
    console.log("user role:", user?.role);
    if (!isAuthenticated) {
      return <Navigate to="/auth/login"  />;
    }
    if (user?.role !== "admin") {
      return <Navigate to="/unauth-page" />;
    }
  }

  // Handle protected shopping routes (checkout, account)
  if (location.pathname.includes("/shop")) {
    console.log(location.pathname, isAuthenticated, "/shop");
    console.log("user role:", user?.role);
    if (!isAuthenticated) {
      return <Navigate to="/" state={{ from: location }} />;
    }
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
  }

  // Handle auth routes (login, register)
  if (location.pathname.includes("/auth/login")) {
    console.log(location.pathname, isAuthenticated, "/auth/login");
    console.log("user role:", user?.role);
    if (isAuthenticated) {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      }
      // If there's a stored location, redirect there, otherwise go to home
      const from = location.state?.from?.pathname || "/";
      return <Navigate to={from} />;
    }
  }

  // Handle root path redirects
  if (location.pathname === "/") {
    console.log(location.pathname, isAuthenticated, "/");
    console.log("user role:", user?.role);
    if (isAuthenticated) {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      }
      return <Navigate to="/" />;
    }
    return <Navigate to="/listing" />;
  }

  return <>{children}</>;
}

export default CheckAuth;