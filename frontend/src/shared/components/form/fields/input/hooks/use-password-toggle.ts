import { useState } from "react";

export const usePasswordToggle = (initialVisible = false) => {
  const [passwordVisible, setPasswordVisible] = useState(initialVisible);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return {
    passwordVisible,
    togglePasswordVisibility,
  };
};
