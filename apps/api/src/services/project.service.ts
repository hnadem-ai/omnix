import { prisma } from "../prisma.js";

interface CreateProjectInput {
    name: string;
    targetUrl: string;
    description?: string;
}

export const createProject =  async (data: CreateProjectInput) => {
    const {name, targetUrl, description } = data;

    const project = await prisma.project.create({
        data: {
            name,
            targetUrl,
            description,
        }
    });

    return project;
}

export const getProjects = async () => {
    const projects = await prisma.project.findMany();
    return projects;
}