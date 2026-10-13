import { Request, Response } from "express";
import { getUsers, getUserByEmail, getUserById, updateUser, deleteUser} from "../services/user.service.js";
import { updateUserSchema } from "../validators/user.validators.js";

export const getUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.status(200).json({
            success: true,
            users,
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getUserByEmailController = async (req: Request<{email: string,}>, res: Response) => {
    try {
        const { email } = req.params;
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getUserByIdController = async (req: Request<{id: string}>, res: Response) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const updateUserController = async (req: Request<{id: string}>, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const validationResult = updateUserSchema.safeParse(data);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: validationResult.error.format()
            });
        }

        const user = await updateUser(id, data);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
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
};

export const deleteUserController = async (req: Request<{id: string}>, res: Response) => {
    try {
        const { id } = req.params;
        const user = await deleteUser(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};