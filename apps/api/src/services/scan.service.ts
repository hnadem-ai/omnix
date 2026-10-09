import { Scan, CreateScanBody } from "../types/scan.types.js";
import { RequestEngine } from "./request-engine/request-engine.js";

const scans: Scan[] = []

export const createScan = async (data: CreateScanBody) => {
    const newScan: Scan = {
        id: scans.length + 1,
        name: data.name || `Scan ${scans.length + 1}`,
        targetUrl: data.targetUrl,
        status: "pending",
        createdAt: new Date().toISOString(),
        endpoints: [],
        findings: [],
    };

    const engine = new RequestEngine();

    const result = await engine.execute({
        url: "https://httpbin.org/delay/5",
        method: "GET",
        timeout: 1000,
    });

    scans.push(newScan);

    return result;
}