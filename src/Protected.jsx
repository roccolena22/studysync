import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const loggedUser = useSelector((state) => state.auth.user);

  return loggedUser ? children : <Navigate to="/studysync/login" replace />;
}
