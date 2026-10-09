export type ScanStatus = "pending" | "running" | "completed" | "failed";

export interface Scan {
  id: number;
  name: string;
  targetUrl: string;
  status: ScanStatus;
  createdAt: string;
  endpoints: any[];
  findings: any[];
}

export interface CreateScanBody {
  targetUrl: string;
  name?: string;
}