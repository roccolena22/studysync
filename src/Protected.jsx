import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const loggedUser = useSelector((state) => state.auth.user);

  if (!loggedUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
