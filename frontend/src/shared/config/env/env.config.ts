type EnvConfig = {
  PUBLIC_API_URL: string;
};

export const ENV_CONFIG: EnvConfig = {
  PUBLIC_API_URL: import.meta.env.PUBLIC_API_URL,
};
