import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const loggedUser = useSelector((state: any) => state.auth.user);

  return loggedUser ? (
    <>{children}</>
  ) : (
    <Navigate to="/studysync/login" replace />
  );
}
