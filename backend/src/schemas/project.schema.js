"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = require("zod");
exports.createProjectSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Project name is required'),
        description: zod_1.z.string().optional(),
        status: zod_1.z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']).optional(),
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional()
    })
});
exports.updateProjectSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Project name is required').optional(),
        description: zod_1.z.string().optional(),
        status: zod_1.z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']).optional(),
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional()
    })
});
//# sourceMappingURL=project.schema.js.map