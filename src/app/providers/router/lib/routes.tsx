import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "@/app/App";
import { Main } from "@/pages/main";
import { Routes } from "@/shared/lib/enums";
import { AuthApplication, AuthOTP, AuthProfile } from "@/pages/auth";
import {
  ApplicationCalculator,
  ApplicationDocs,
  ApplicationReview,
  ApplicationVehicle,
} from "@/pages/application";
import { NotFound } from "@/pages/not-found";
import { Loading } from "@/pages/loading";
import { ProtectedRoute } from "../ui/ProtectedRoute";
import { ProfileMain } from "@/pages/profile";

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
        path: `${Routes.AUTH}/profile`,
        element: (
          <Suspense fallback={<Loading />}>
            <AuthProfile />
          </Suspense>
        ),
      },
      {
        path: `${Routes.AUTH}/application`,
        element: (
          <Suspense fallback={<Loading />}>
            <AuthApplication />
          </Suspense>
        ),
      },
      {
        path: `${Routes.AUTH}/otp`,
        element: (
          <Suspense fallback={<Loading />}>
            <AuthOTP />
          </Suspense>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: `${Routes.APPLICATION}/calculator`,
            element: (
              <Suspense fallback={<Loading />}>
                <ApplicationCalculator />
              </Suspense>
            ),
          },
          {
            path: `${Routes.APPLICATION}/vehicle`,
            element: (
              <Suspense fallback={<Loading />}>
                <ApplicationVehicle />
              </Suspense>
            ),
          },
          {
            path: `${Routes.APPLICATION}/docs`,
            element: (
              <Suspense fallback={<Loading />}>
                <ApplicationDocs />
              </Suspense>
            ),
          },
          {
            path: `${Routes.APPLICATION}/review`,
            element: (
              <Suspense fallback={<Loading />}>
                <ApplicationReview />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/main`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfileMain />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
