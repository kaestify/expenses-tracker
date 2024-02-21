import { Outlet, Navigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const PrivateRoutes = () => {
  const { authState } = useOktaAuth();

  if (!authState) {
    return <div>Loading...</div>;
  }

  return authState.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
