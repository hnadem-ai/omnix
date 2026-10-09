import { Router } from "express";
import { discoveryController } from "../controllers/discovery.controller.js";

const router = Router();

router.post("/", discoveryController);

export default router;