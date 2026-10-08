"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getTasks = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const types_1 = require("../types");
const prisma = new client_1.PrismaClient();
const getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const { search, status, priority, projectId } = req.query;
        const whereClause = { userId };
        if (search) {
            whereClause.name = { contains: String(search), mode: 'insensitive' };
        }
        if (status) {
            whereClause.status = String(status);
        }
        if (priority) {
            whereClause.priority = String(priority);
        }
        if (projectId) {
            whereClause.projectId = String(projectId);
        }
        const tasks = await prisma.task.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' }
        });
        return res.status(200).json({ success: true, data: tasks });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error fetching tasks' });
    }
};
exports.getTasks = getTasks;
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const task = await prisma.task.findFirst({
            where: { id, userId }
        });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        return res.status(200).json({ success: true, data: task });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error fetching task' });
    }
};
exports.getTaskById = getTaskById;
const createTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { projectId, name, description, priority, status, dueDate } = req.body;
        // Verify project belongs to user
        const project = await prisma.project.findFirst({
            where: { id: projectId, userId }
        });
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found or unauthorized' });
        }
        const task = await prisma.task.create({
            data: {
                userId,
                projectId,
                name,
                description,
                priority: priority || 'MEDIUM',
                status: status || 'PENDING',
                dueDate: dueDate ? new Date(dueDate) : null
            }
        });
        return res.status(201).json({ success: true, message: 'Task created', data: task });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error creating task' });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { name, description, priority, status, dueDate } = req.body;
        const task = await prisma.task.findFirst({ where: { id, userId } });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(description !== undefined && { description }),
                ...(priority && { priority }),
                ...(status && { status }),
                ...(dueDate && { dueDate: new Date(dueDate) })
            }
        });
        return res.status(200).json({ success: true, message: 'Task updated', data: updatedTask });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error updating task' });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const task = await prisma.task.findFirst({ where: { id, userId } });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        await prisma.task.delete({ where: { id } });
        return res.status(200).json({ success: true, message: 'Task deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error deleting task' });
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.controller.js.map