import { ENV_CONFIG } from "@/shared/config/env/env.config";

type ApiConfig = {
  baseURL: string;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  withCredentials: boolean;
};

export const API_CONFIG: ApiConfig = {
  baseURL: ENV_CONFIG.PUBLIC_API_URL,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  withCredentials: false,
};
