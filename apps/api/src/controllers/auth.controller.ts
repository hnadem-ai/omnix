import type { Request, Response } from 'express';
import { createUserSchema } from '../validators/user.validators.js';
import { loginSchema } from '../validators/user.validators.js';
import { registerUser, login, refreshAccessToken } from '../services/auth.service.js';

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const validationResult = createUserSchema.safeParse(body);

        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: validationResult.error.format()
            });
        }

        const result = await registerUser(body);

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(201).json({
            success: true,
            user: result.user,
            accessToken: result.accessToken,
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
}

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const validationResult = loginSchema.safeParse({ email, password });
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: validationResult.error.format()
            });
        }

        const result = await login({ email, password });

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        
        return res.status(200).json({
            success: true,
            user: result.user,
            accessToken: result.accessToken,
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
}

export const refreshTokenController = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token not provided",
            });
        }

        const result = await refreshAccessToken(refreshToken);

        return res.status(200).json({
            success: true,
            accessToken: result.accessToken,
        });
    } catch (err) {
        console.log(err);
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
}

export const logoutController = async (req: Request, res: Response) => {
    try{
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
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
}