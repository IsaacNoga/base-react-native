import { ApiResponse, IRequestParams } from "../../types/api";
import { authStorage } from "../auth/storage";
import { ApiError } from "./errors";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

async function request<T, D = Record<string, any>>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T, D>> {
  const token = await authStorage.getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data: ApiResponse<T, D> = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.mensaje, data);
  }

  return data;
}

export const api = {
  get<T, D = Record<string, any>>(endpoint: string, params?: IRequestParams) {
    const query = params
      ? `?${new URLSearchParams(
          Object.entries(params).reduce(
            (acc, [key, value]) => {
              if (value !== undefined && value !== null) {
                acc[key] = String(value);
              }

              return acc;
            },
            {} as Record<string, string>,
          ),
        )}`
      : "";

    return request<T, D>(`${endpoint}${query}`, {
      method: "GET",
    });
  },

  post<T, D = Record<string, any>>(endpoint: string, body?: unknown) {
    return request<T, D>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put<T, D = Record<string, any>>(endpoint: string, body?: unknown) {
    return request<T, D>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete<T, D = Record<string, any>>(endpoint: string, body?: unknown) {
    return request<T, D>(endpoint, {
      method: "DELETE",
      body: body ? JSON.stringify(body) : undefined,
    });
  },
};
