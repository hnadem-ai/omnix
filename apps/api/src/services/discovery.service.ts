import { DiscoveredEndpoint } from "../types/endpoint.type.js";
import { DiscoveryEngine } from "./discovery-engine/discovery-engine.js";

export const discoveryService = (data: unknown): DiscoveredEndpoint[] => {
    const engine = new DiscoveryEngine();

    const endpoints = engine.parse(data);

    return endpoints;
}