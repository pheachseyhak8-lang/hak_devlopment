import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    // បើមិនទាន់ Login ទេ ឱ្យទៅទំព័រ Login វិញ
    alert("សូមចូលប្រើប្រាស់ (Login) ជាមុនសិន!");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;