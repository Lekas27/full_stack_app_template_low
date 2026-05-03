type Props = {
  isLoggedIn: boolean;
};

export type Return = {
  checkPermissionConfig: () => void;
};

export const useRouteGuard = ({ isLoggedIn }: Props): Return => {
  // Implementation of route guard logic based on isLoggedIn
  const checkPermissionConfig = () => {
    // Check permissions based on config and isLoggedIn
    return isLoggedIn; // Example logic
  };

  return {
    checkPermissionConfig,
  };
};
