import { ApiResponse, IRequestParams } from "../../types/api";
import { ApiError } from "./errors";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data: ApiResponse<T> = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.mensaje, data);
  }

  return data;
}

export const api = {
  get<T>(endpoint: string, params?: IRequestParams) {
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

    return request<T>(`${endpoint}${query}`, {
      method: "GET",
    });
  },

  post<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: "DELETE",
      body: body ? JSON.stringify(body) : undefined,
    });
  },
};
