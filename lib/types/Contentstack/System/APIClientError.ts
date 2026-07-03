export type APIClientError = {
  error_message: string;
  error_code: number;
  errors?: {
    authtoken: string[];
  };
};
