import { getToken } from "@/utils";
import React from "react";
import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" />;
}

export default AuthRoute;
