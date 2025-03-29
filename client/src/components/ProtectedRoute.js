import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true; // Tránh lỗi nếu exp không tồn tại
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.error("Lỗi giải mã token:", error);
    return true;
  }
};

const ProtectedRoute = ({ children, rolesRequired = [] }) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token"); // Xóa token hết hạn
    return <Navigate to="/login" replace />;
  }

  let userRole = null;
  try {
    const decoded = jwtDecode(token);
    userRole = decoded.role; // Lấy role từ token
  } catch (error) {
    return <Navigate to="/login" replace />;
  }

  if (rolesRequired.length > 0 && !rolesRequired.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />; //! Đảm bảo có trang /unauthorized
  }

  return children;
};

export default ProtectedRoute;
