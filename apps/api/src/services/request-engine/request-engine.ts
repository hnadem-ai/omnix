import type {
    RequestConfig,
    RequestResult,
} from "../../types/request.type.js";

export class RequestEngine {
    async execute(config: RequestConfig): Promise<RequestResult> {
        const startTime = Date.now();
        const timeout = config.timeout ?? 10000;

        try {
            const url = new URL(config.url);

            if (config.query) {
                Object.entries(config.query).forEach(([key, value]) => {
                    url.searchParams.set(key, value);
                });
            }

            const response = await fetch(url, {
                method: config.method,
                headers: config.headers,
                body: config.body
                    ? JSON.stringify(config.body)
                    : undefined,
                signal: AbortSignal.timeout(timeout),
            });

            const responseTime = Date.now() - startTime;

            const headers: Record<string, string> = {};

            response.headers.forEach((value, key) => {
                headers[key] = value;
            });

            const text = await response.text();

            let body: unknown = text;

            try {
                body = JSON.parse(text);
            } catch {
                // Keep body as text
            }

            return {
                status: response.status,
                statusText: response.statusText,
                headers,
                body,
                responseTime,
            };
        } catch (error) {
            const responseTime = Date.now() - startTime;
            const isTimeout =
                error instanceof Error &&
                error.name === "TimeoutError";

            return {
                status: null,
                statusText: null,
                headers: {},
                body: null,
                responseTime,
                error: {
                    type: isTimeout
                        ? "TIMEOUT"
                        : error instanceof TypeError
                            ? "NETWORK"
                            : "UNKNOWN",
                    message:
                        error instanceof Error
                            ? error.message
                            : "Unknown request error",
                },
            };
        }
    }
}