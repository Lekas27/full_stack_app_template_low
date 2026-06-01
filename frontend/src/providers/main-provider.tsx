import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";

import { router } from "@/router";

export const MainProvider = () => (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
