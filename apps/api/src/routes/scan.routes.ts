import {Router, Request, Response} from "express";
import { Scan, CreateScanBody } from "../types/scan.types.js";
import { createScanController } from "../controllers/scan.controller.js";

const router = Router();

const scans: Scan[] = []

router.post("/", createScanController);   

router.get("/", (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: scans,
  });
});

router.get("/:id", (req: Request<{id: string}>, res: Response) => {
    const scanId = Number(req.params.id);
    const scan = scans.find((s) => s.id === scanId);

    if (!scan) {
        return res.status(404).json({
        success: false,
        message: "Scan not found",
        });
    }

    return res.json({
        success: true,
        data: scan,
    });
})

export default router;