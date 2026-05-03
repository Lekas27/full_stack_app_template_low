import {
  createContext,
  useContext,
  type FC,
  type PropsWithChildren,
} from "react";

import { useRouteGuard, type Return } from "@/router/hooks/use-route-guard";

/**
 * React context for accessing route permissions
 */
export type RouteSecurityContextValueRecord = Return;

const RouteSecurityContext = createContext<RouteSecurityContextValueRecord>(
  {} as RouteSecurityContextValueRecord,
);

const { Provider } = RouteSecurityContext;

/**
 * Custom provider that exposes custom security route logic
 */
export const RouteSecurityProvider: FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = false; // Replace with actual authentication logic

  const { checkPermissionConfig } = useRouteGuard({
    isLoggedIn,
  });

  return <Provider value={{ checkPermissionConfig }}>{children}</Provider>;
};

export const useRouteSecurity = (): RouteSecurityContextValueRecord =>
  useContext(RouteSecurityContext);
