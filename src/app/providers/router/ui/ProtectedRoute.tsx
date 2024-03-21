import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute: FC = () => {
  // TODO
  const token = true;

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};
