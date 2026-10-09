// scan.controller.ts

import { Request, Response } from "express";
import { CreateScanBody } from "../types/scan.types.js";
import { createScan } from "../services/scan.service.js";

export const createScanController = async (
    req: Request<{}, {}, CreateScanBody>,
    res: Response
) => {
    const { targetUrl } = req.body;

    if (!targetUrl) {
        return res.status(400).json({
            success: false,
            message: "targetUrl is required",
        });
    }

    const scan = await createScan(req.body);

    return res.status(201).json({
        success: true,
        message: "Scan created",
        data: scan,
    });
};