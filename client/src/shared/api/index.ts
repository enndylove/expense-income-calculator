import axios from "axios";
import { getBaseApiUrl } from "./getBaseApiUrl";
import { notFound } from "@tanstack/react-router";

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

const routerApi = axios.create(baseConfig);
routerApi.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 404) {
      throw notFound(error.response.data);
    }

    if (error.response.status === 403) {
      throw notFound(error.response.data);
    }

    return Promise.reject(error);
  },
);

export { api, routerApi };
