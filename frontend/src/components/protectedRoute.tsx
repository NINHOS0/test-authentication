import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";


interface ProtectedRouteProps {
    children: React.ReactElement
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authToken } = useAuth();
  
  if (!authToken) {
    return <Navigate to="/" />;
  }
  return children;
};