import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";

import { router } from "@/router";
import { RouteSecurityProvider } from "@/router/providers/router-provider";

export const MainProvider = () => (
  <StrictMode>
    <RouteSecurityProvider>
      <RouterProvider router={router} />
    </RouteSecurityProvider>
  </StrictMode>
);
