import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "@/app/App";
import { Main } from "@/pages/main";
import { Routes } from "@/shared/lib/enums";
import { Auth, AuthAccount, AuthLoan } from "@/pages/auth";
import { Application } from "@/pages/application";
import { Account } from "@/pages/account";
import { NotFound } from "@/pages/not-found";
import { ProtectedRoute } from "../ui/ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFound />,
    path: Routes.MAIN,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: Routes.AUTH,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Auth />
          </Suspense>
        ),
        children: [
          {
            path: "account",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AuthAccount />
              </Suspense>
            ),
          },
          {
            path: "loan",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AuthLoan />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: Routes.APPLICATION,
        element: <ProtectedRoute />,
        children: [{ path: "", element: <Application /> }],
      },
      {
        path: Routes.ACCOUNT,
        element: <ProtectedRoute />,
        children: [{ path: "", element: <Account /> }],
      },
    ],
  },
]);
