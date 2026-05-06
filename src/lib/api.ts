const API_URL = import.meta.env.VITE_API_URL || "";

function joinUrl(base: string, path: string): string {
  if (!base) return path;
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

function apiEndpoint(endpoint: string): string {
  if (API_URL.replace(/\/$/, "").endsWith("/api") && endpoint.startsWith("/api/")) {
    return joinUrl(API_URL, endpoint.replace(/^\/api\//, ""));
  }
  return joinUrl(API_URL, endpoint);
}

function uploadEndpoint(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized.startsWith("/api/uploads/")) return normalized;
  if (normalized.startsWith("/uploads/")) return `/api${normalized}`;
  return normalized;
}

function getUploadUrl(path: string): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized.startsWith("/uploads/") || normalized.startsWith("/api/uploads/")) {
    return apiEndpoint(uploadEndpoint(normalized));
  }

  return path;
}

function getToken(): string | null {
  return localStorage.getItem("admin_token");
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(apiEndpoint(endpoint), {
    cache: "no-store",
    ...options,
    headers,
  });

  if (res.status === 401) {
    localStorage.removeItem("admin_token");
    if (window.location.pathname.startsWith("/panel")) {
      window.location.href = "/panel/login";
    }
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }

  return res.json();
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, data?: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  put: <T>(endpoint: string, data?: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
  upload: <T>(endpoint: string, formData: FormData) =>
    request<T>(endpoint, {
      method: "POST",
      body: formData,
    }),
};

export { API_URL, getUploadUrl };
