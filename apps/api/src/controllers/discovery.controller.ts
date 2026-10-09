import { Request, Response } from "express";
import { discoveryService } from "../services/discovery.service.js";

export const discoveryController = (req: Request, res: Response) => {
    try {
        const result = discoveryService(req.body);

        return res.status(200).json({
            success: true,
            message: "Discovery Successful",
            count: result.length,
            endpoints: result,
        })
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}