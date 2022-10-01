import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const [auth, setAuth] = useAuth();

  return auth ? children : <Navigate to="/login" />;
}
