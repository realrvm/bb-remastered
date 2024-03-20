import { createBrowserRouter } from "react-router-dom";

import App from "@/app/App";
import { Main } from "@/pages/main";
import { Routes } from "@/shared/lib/enums";
import { Loan } from "@/pages/loan/ui/Loan";
import { Auth } from "@/pages/auth";
import { Application } from "@/pages/application";
import { Account } from "@/pages/account";
import { NotFound } from "@/pages/not-found";

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
      { path: Routes.LOAN, element: <Loan /> },
      { path: Routes.AUTH, element: <Auth /> },
      { path: Routes.APPLICATION, element: <Application /> },
      { path: Routes.ACCOUNT, element: <Account /> },
    ],
  },
]);
