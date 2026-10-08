"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getProjects = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const types_1 = require("../types");
const prisma = new client_1.PrismaClient();
const getProjects = async (req, res) => {
    try {
        const userId = req.user.id;
        const { search, status } = req.query;
        const whereClause = { userId };
        if (search) {
            whereClause.name = { contains: String(search), mode: 'insensitive' };
        }
        if (status) {
            whereClause.status = String(status);
        }
        const projects = await prisma.project.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' }
        });
        return res.status(200).json({ success: true, data: projects });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error fetching projects' });
    }
};
exports.getProjects = getProjects;
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const project = await prisma.project.findFirst({
            where: { id, userId }
        });
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        return res.status(200).json({ success: true, data: project });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error fetching project' });
    }
};
exports.getProjectById = getProjectById;
const createProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, description, status, startDate, endDate } = req.body;
        const project = await prisma.project.create({
            data: {
                userId,
                name,
                description,
                status: status || 'NOT_STARTED',
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null
            }
        });
        return res.status(201).json({ success: true, message: 'Project created', data: project });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error creating project' });
    }
};
exports.createProject = createProject;
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { name, description, status, startDate, endDate } = req.body;
        const project = await prisma.project.findFirst({ where: { id, userId } });
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        const updatedProject = await prisma.project.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(description !== undefined && { description }),
                ...(status && { status }),
                ...(startDate && { startDate: new Date(startDate) }),
                ...(endDate && { endDate: new Date(endDate) })
            }
        });
        return res.status(200).json({ success: true, message: 'Project updated', data: updatedProject });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error updating project' });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const project = await prisma.project.findFirst({ where: { id, userId } });
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        await prisma.project.delete({ where: { id } });
        return res.status(200).json({ success: true, message: 'Project deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error deleting project' });
    }
};
exports.deleteProject = deleteProject;
//# sourceMappingURL=project.controller.js.map