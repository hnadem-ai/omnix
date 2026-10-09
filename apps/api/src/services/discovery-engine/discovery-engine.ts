import type {
    DiscoveredEndpoint,
    EndpointMethod,
} from "../../types/endpoint.type.js";

const HTTP_METHODS: EndpointMethod[] = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "HEAD",
    "OPTIONS",
];

export class DiscoveryEngine {
    parse(spec: unknown): DiscoveredEndpoint[] {
        if (
            typeof spec !== "object" ||
            spec === null ||
            !("paths" in spec)
        ) {
            throw new Error("Invalid OpenAPI specification: missing paths");
        }

        const paths = (spec as { paths: unknown }).paths;

        if (
            typeof paths !== "object" ||
            paths === null ||
            Array.isArray(paths)
        ) {
            throw new Error("Invalid OpenAPI specification: paths must be an object");
        }

        const endpoints: DiscoveredEndpoint[] = [];

        for (const [path, pathItem] of Object.entries(paths)) {
            if (
                typeof pathItem !== "object" ||
                pathItem === null ||
                Array.isArray(pathItem)
            ) {
                continue;
            }

            const operations = pathItem as Record<string, unknown>;

            for (const [method, operation] of Object.entries(operations)) {
                if (
                    !HTTP_METHODS.includes(method.toUpperCase() as EndpointMethod) ||
                    typeof operation !== "object" ||
                    operation === null ||
                    Array.isArray(operation)
                ) {
                    continue;
                }

                const details = operation as Record<string, unknown>;

                endpoints.push({
                    path,
                    method: method.toUpperCase() as EndpointMethod,
                    summary:
                        typeof details.summary === "string"
                            ? details.summary
                            : undefined,
                    operationId:
                        typeof details.operationId === "string"
                            ? details.operationId
                            : undefined,
                    parameters: Array.isArray(details.parameters)
                        ? details.parameters
                        : [],
                    requestBody: details.requestBody,
                    responses:
                        typeof details.responses === "object" &&
                            details.responses !== null &&
                            !Array.isArray(details.responses)
                            ? details.responses as Record<string, unknown>
                            : undefined,
                    tags: Array.isArray(details.tags)
                        ? details.tags.filter(
                            (tag): tag is string => typeof tag === "string",
                        )
                        : [],
                });
            }
        }

        return endpoints;
    }
}