import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ApiResult<T> = {
  data: T | null;
  error: string | null;
  statusCode?: number;
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<B = unknown> {
  method?: HttpMethod;
  body?: B;
  headers?: Record<string, string>;
  /** Skip automatic Authorization header injection */
  skipAuth?: boolean;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "https://api.mentesegura.app/v1";
const TOKEN_KEY = "auth_token";
const TIMEOUT_MS = 15_000;

// ─── Helper: fetch with timeout ───────────────────────────────────────────────

function fetchWithTimeout(url: string, init: RequestInit, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...init, signal: controller.signal }).finally(() =>
    clearTimeout(timer)
  );
}

// ─── Core request function ────────────────────────────────────────────────────

export async function request<T = unknown, B = unknown>(
  endpoint: string,
  options: RequestOptions<B> = {}
): Promise<ApiResult<T>> {
  const { method = "GET", body, headers = {}, skipAuth = false } = options;

  // Build headers
  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
  };

  if (!skipAuth) {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      finalHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  const init: RequestInit = {
    method,
    headers: finalHeaders,
  };

  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  try {
    const response = await fetchWithTimeout(`${BASE_URL}${endpoint}`, init, TIMEOUT_MS);
    const statusCode = response.status;

    // No-content responses
    if (statusCode === 204) {
      return { data: null, error: null, statusCode };
    }

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        (json as { message?: string; detail?: string } | null)?.message ??
        (json as { message?: string; detail?: string } | null)?.detail ??
        `Error ${statusCode}`;
      return { data: null, error: message, statusCode };
    }

    return { data: json as T, error: null, statusCode };
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return { data: null, error: "La solicitud tardó demasiado. Verifica tu conexión." };
    }
    const message = err instanceof Error ? err.message : "Error de red desconocido.";
    return { data: null, error: message };
  }
}

// ─── Convenience wrappers ─────────────────────────────────────────────────────

export const api = {
  get: <T>(endpoint: string, opts?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(endpoint, { ...opts, method: "GET" }),

  post: <T, B = unknown>(endpoint: string, body: B, opts?: Omit<RequestOptions<B>, "method" | "body">) =>
    request<T, B>(endpoint, { ...opts, method: "POST", body }),

  put: <T, B = unknown>(endpoint: string, body: B, opts?: Omit<RequestOptions<B>, "method" | "body">) =>
    request<T, B>(endpoint, { ...opts, method: "PUT", body }),

  patch: <T, B = unknown>(endpoint: string, body: B, opts?: Omit<RequestOptions<B>, "method" | "body">) =>
    request<T, B>(endpoint, { ...opts, method: "PATCH", body }),

  delete: <T>(endpoint: string, opts?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(endpoint, { ...opts, method: "DELETE" }),
};
