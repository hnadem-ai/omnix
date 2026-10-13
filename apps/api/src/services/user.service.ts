import { prisma } from "../prisma.js";
import { hashPassword } from "./password.service.js";
import { CreateUserInput, UpdateUserInput, UserModel } from "../types/user.type.js";

export const createUser = async (data: CreateUserInput) => {
    let { firstName, lastName, email, password } = data;

    email = email.toLowerCase();

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }
    });

    console.log("User created:", { firstName, lastName, email });

    return user;
}

export const getUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        }
    });
    return users;
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    return user;
}

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        }
    });
    return user;
}

export const updateUser = async (id: string, data: UpdateUserInput) => {
    const user = await prisma.user.update({
        where: {
            id,
        },
        data,
    });
    return user;
}

export const deleteUser = async (id: string) => {
    const user = await prisma.user.delete({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        },
        where: {
            id,
        }
    });
    return user;
}