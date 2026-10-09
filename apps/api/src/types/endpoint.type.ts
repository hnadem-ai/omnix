
export type EndpointMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export interface DiscoveredEndpoint {
  path: string;
  method: EndpointMethod;
  summary?: string;
  operationId?: string;
  parameters?: unknown[];
  requestBody?: unknown;
  responses?: Record<string, unknown>;
  tags?: string[];
}
