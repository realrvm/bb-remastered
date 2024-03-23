import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useStateSelector } from "../../rtk";
import { getAccessToken } from "@/features/auth";

export const ProtectedRoute: FC = () => {
  const token = useStateSelector(getAccessToken);

  if (!token) {
    return <Navigate to="/auth/profile" />;
  }

  return <Outlet />;
};
