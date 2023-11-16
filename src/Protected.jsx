import { Navigate } from "react-router-dom";

export default function Protected({ isLogged, children }) {
  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
