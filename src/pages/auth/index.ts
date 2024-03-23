import { lazy } from "react";

const AuthApplication = lazy(
  () => import("./ui/auth-application/AuthApplication"),
);
const AuthProfile = lazy(() => import("./ui/auth-profile/AuthProfile"));
const AuthOTP = lazy(() => import("./ui/auth-otp/AuthOTP"));

export { AuthApplication, AuthProfile, AuthOTP };

export { useObtainApi } from "./model/api/obtainApi";
export { useRegisterApi } from "./model/api/registerApi";
