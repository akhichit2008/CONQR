import type { HealthResponse } from "../types/health";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// The session cookie carries authentication, so every request must include
// credentials — the backend never reads a token from request headers.
async function request<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, `Request to ${path} failed with status ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}

export function getJson<TResponse>(path: string): Promise<TResponse> {
  return request<TResponse>(path, { method: "GET" });
}

export function postJson<TResponse>(path: string, body: unknown): Promise<TResponse> {
  return request<TResponse>(path, { method: "POST", body: JSON.stringify(body) });
}

// Foundation-only check that the frontend can reach the backend. Not a product endpoint.
export function getHealthStatus(): Promise<HealthResponse> {
  return getJson<HealthResponse>("/api/health");
}
