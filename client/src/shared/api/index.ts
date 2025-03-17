import axios from "axios";
import { getBaseApiUrl } from "./getBaseApiUrl";

import type { CreateAxiosDefaults } from "axios";

export class ApiError extends Error {
  status: number;
  statusText: string;
  data: unknown;

  constructor(
    message: string,
    status: number,
    statusText: string,
    data: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

const baseConfig: CreateAxiosDefaults = {
  baseURL: getBaseApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const api = axios.create(baseConfig);

api.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("Request Headers:", config.headers);
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      const message = Array.isArray(error.response.data.message)
        ? error.response.data.message[0]
        : error.response.data.message;

      return Promise.reject(
        new ApiError(
          message,
          error.response.status,
          error.response.statusText,
          error.response.data,
        ),
      );
    }
    return Promise.reject(error);
  },
);

export { api };
