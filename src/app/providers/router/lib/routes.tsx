import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "@/app/App";
import { Main } from "@/pages/main";
import { Routes } from "@/shared/lib/enums";
import { Auth, AuthApplication, AuthOTP, AuthProfile } from "@/pages/auth";
import { Application } from "@/pages/application";
import { NotFound } from "@/pages/not-found";
import { ProtectedRoute } from "../ui/ProtectedRoute";
import { Loading } from "@/pages/loading";
import { Profile } from "@/pages/profile";

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
          <Suspense fallback={<Loading />}>
            <Auth />
          </Suspense>
        ),
        children: [
          {
            path: "profile",
            element: (
              <Suspense fallback={<Loading />}>
                <AuthProfile />
              </Suspense>
            ),
          },
          {
            path: "application",
            element: (
              <Suspense fallback={<Loading />}>
                <AuthApplication />
              </Suspense>
            ),
          },
          {
            path: "otp",
            element: (
              <Suspense fallback={<Loading />}>
                <AuthOTP />
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
        path: Routes.PROFILE,
        element: <ProtectedRoute />,
        children: [{ path: "", element: <Profile /> }],
      },
    ],
  },
]);
