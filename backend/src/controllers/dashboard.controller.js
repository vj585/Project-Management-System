"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const types_1 = require("../types");
const prisma = new client_1.PrismaClient();
const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const [totalProjects, projectsInProgress, totalTasks, completedTasks, pendingTasks] = await Promise.all([
            prisma.project.count({ where: { userId } }),
            prisma.project.count({ where: { userId, status: 'IN_PROGRESS' } }),
            prisma.task.count({ where: { userId } }),
            prisma.task.count({ where: { userId, status: 'COMPLETED' } }),
            prisma.task.count({ where: { userId, status: 'PENDING' } })
        ]);
        return res.status(200).json({
            success: true,
            data: {
                totalProjects,
                projectsInProgress,
                totalTasks,
                completedTasks,
                pendingTasks
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error fetching dashboard stats' });
    }
};
exports.getDashboardStats = getDashboardStats;
//# sourceMappingURL=dashboard.controller.js.map