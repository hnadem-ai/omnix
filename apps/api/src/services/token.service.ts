import jwt, {SignOptions} from "jsonwebtoken";
import { TokenPayload } from "../types/user.type.js";

export const generateAccessToken = (user: TokenPayload): string => {
    const payload = {
        id: user.id,
        email: user.email,
    };

    const secret = process.env.ACCESS_TOKEN_SECRET || "default_access_secret";
    const options: SignOptions = {
        expiresIn: "15m",
    };

    return jwt.sign(payload, secret, options);
}

export const generateRefreshToken = (user: TokenPayload): string => {
    const payload = {
        id: user.id,
        email: user.email,
    };

    const secret = process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret";
    const options: SignOptions = {
        expiresIn: "7d",
    };

    return jwt.sign(payload, secret, options);
}

export const verifyToken = (token: string): any => {
    try {
        const secret = process.env.ACCESS_TOKEN_SECRET || "default_access_secret";
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
}

export const verifyRefreshToken = (token: string): any => {
    try {
        const secret = process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret";
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
}