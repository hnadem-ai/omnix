import { Request, Response } from "express";
import { createProjectSchema } from "../validators/project.validators.js";
import { createProject, getProjects } from "../services/project.service.js";

export const createProjectController = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const validationResult = createProjectSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: validationResult.error.format()
            });
        }

        const result = await createProject(body);

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: result,
        });

    } catch (err) {
        console.log(err);
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
}

export const getProjectsController = async (req: Request, res: Response) => {
    try {
        const projects = await getProjects();

        return res.status(200).json({
            success: true,
            message: "Projects retrieved successfully",
            data: projects,
        });
    } catch (err) {
        console.log(err);
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
}