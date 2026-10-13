import {Router} from "express";
import { registerUserController, loginController, refreshTokenController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginController);
router.post("/refresh-token", refreshTokenController);

export default router;