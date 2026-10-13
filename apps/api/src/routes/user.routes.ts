import {Router} from "express";
import { getUsersController, getUserByEmailController, getUserByIdController, updateUserController, deleteUserController} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsersController);

// Give them distinct paths so Express doesn't confuse an ID with an email
router.get("/email/:email", getUserByEmailController);
router.get("/id/:id", getUserByIdController);

router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;