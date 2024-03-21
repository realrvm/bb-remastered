import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "@/app/providers/router";
import { StoreProvider } from "@/app/providers/rtk";

import "@/app/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <RouterProvider router={router} />
  </StoreProvider>,
);
