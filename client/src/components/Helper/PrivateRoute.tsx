import React, { ReactNode } from "react";
import { useAppSelector } from "@src/hooks/redux";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // const isAuth = useAppSelector((state) => state.userSlice.isAuth);
  return localStorage.getItem("token") ? children : <Navigate to="/video" />;
};

export default PrivateRoute;
