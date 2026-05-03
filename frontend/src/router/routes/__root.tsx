import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

type MyRouterContext = {
  isAuthenticated: boolean;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
});
