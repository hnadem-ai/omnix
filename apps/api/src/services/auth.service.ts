import { CreateUserInput, LoginInput, UserResponse } from "../types/user.type.js";
import { createUser, getUserByEmail } from "./user.service.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "./token.service.js";
import { verifyPassword } from "./password.service.js";

export const registerUser = async (data: CreateUserInput): Promise<{user: UserResponse, accessToken: string, refreshToken: string,}> => {
    const user = await createUser(data);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        accessToken,
        refreshToken,
    };
}

export const login = async (data: LoginInput): Promise<{ user: UserResponse, accessToken: string, refreshToken: string, }> => {
    const { email, password } = data;

    const user = await getUserByEmail(email.toLowerCase());

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        accessToken,
        refreshToken,
    };
};

export const refreshAccessToken = async (refreshToken: string): Promise<{ accessToken: string }> => {
    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
        throw new Error("Invalid refresh token");
    }

    const user = await getUserByEmail(decoded.email);

    if (!user) {
        throw new Error("User not found");
    }

    const accessToken = generateAccessToken(user);

    return { accessToken };
}