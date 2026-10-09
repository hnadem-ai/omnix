export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export interface RequestConfig {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  query?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

export interface RequestResult {
  status: number | null;
  statusText: string | null;
  headers: Record<string, string>;
  body: unknown;
  responseTime: number;
  error?: RequestError;
}

export interface RequestError {
  type: "NETWORK" | "TIMEOUT" | "INVALID_URL" | "UNKNOWN";
  message: string;
}