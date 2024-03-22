import { lazy } from "react";

const Auth = lazy(() => import("./ui/Auth"));
const AuthLoan = lazy(() => import("./ui/auth-loan/AuthLoan"));
const AuthAccount = lazy(() => import("./ui/auth-account/AuthAccount"));

export { Auth, AuthLoan, AuthAccount };
