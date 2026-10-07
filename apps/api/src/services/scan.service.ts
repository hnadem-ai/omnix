import { Scan, CreateScanBody } from "../types/scan.types.js";

const scans: Scan[] = []

export const createScan = (data: CreateScanBody) => {
    const newScan: Scan = {
        id: scans.length + 1,
        name: data.name || `Scan ${scans.length + 1}`,
        targetUrl: data.targetUrl,
        status: "pending",
        createdAt: new Date().toISOString(),
        endpoints: [],
        findings: [],
    };

    scans.push(newScan);

    return newScan;
}