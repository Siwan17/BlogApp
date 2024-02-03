import { Navigate } from "react-router-dom";
import cookies from "js-cookie";
import Layout from "../Routers/Layout";

function PrivateRoute({ children }) {
  const login_token = cookies.get("login-token");
  return login_token ? (
    <>
      <Layout />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
