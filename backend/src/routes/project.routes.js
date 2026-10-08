"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("../controllers/project.controller");
const validate_1 = require("../middleware/validate");
const project_schema_1 = require("../schemas/project.schema");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// All project routes require authentication
router.use(auth_1.authenticate);
router.get('/', project_controller_1.getProjects);
router.get('/:id', project_controller_1.getProjectById);
router.post('/', (0, validate_1.validateRequest)(project_schema_1.createProjectSchema), project_controller_1.createProject);
router.put('/:id', (0, validate_1.validateRequest)(project_schema_1.updateProjectSchema), project_controller_1.updateProject);
router.delete('/:id', project_controller_1.deleteProject);
exports.default = router;
//# sourceMappingURL=project.routes.js.map