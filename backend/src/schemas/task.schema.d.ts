import { z } from 'zod';
export declare const createTaskSchema: z.ZodObject<{
    body: z.ZodObject<{
        projectId: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        priority: z.ZodOptional<z.ZodEnum<["LOW", "MEDIUM", "HIGH"]>>;
        status: z.ZodOptional<z.ZodEnum<["PENDING", "IN_PROGRESS", "COMPLETED"]>>;
        dueDate: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        projectId: string;
        status?: "IN_PROGRESS" | "COMPLETED" | "PENDING" | undefined;
        description?: string | undefined;
        priority?: "LOW" | "MEDIUM" | "HIGH" | undefined;
        dueDate?: string | undefined;
    }, {
        name: string;
        projectId: string;
        status?: "IN_PROGRESS" | "COMPLETED" | "PENDING" | undefined;
        description?: string | undefined;
        priority?: "LOW" | "MEDIUM" | "HIGH" | undefined;
        dueDate?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        projectId: string;
        status?: "IN_PROGRESS" | "COMPLETED" | "PENDING" | undefined;
        description?: string | undefined;
        priority?: "LOW" | "MEDIUM" | "HIGH" | undefined;
        dueDate?: string | undefined;
    };
}, {
    body: {
        name: string;
        projectId: string;
        status?: "IN_PROGRESS" | "COMPLETED" | "PENDING" | undefined;
        description?: string | undefined;
        priority?: "LOW" | "MEDIUM" | "HIGH" | undefined;
        dueDate?: string | undefined;
    };
}>;
export declare const updateTaskSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        priority: z.ZodOptional<z.ZodEnum<["LOW", "MEDIUM", "HIGH"]>>;
        status: z.ZodOptional<z.ZodEnum<["PENDING", "IN_PROGRESS", "COMPLETED"]>>;
        dueDate: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        status?: "IN_PROGRESS" | "COMPLETED" | "PENDING" | undefined;
        description?: string | undefined;
        priority?: "LOW" | "MEDIUM" | "HIGH" | undefined;
        dueDate?: string | undefined;
    }, {
        name?: string | undefined;
        status?: "IN_PROGRESS" | "COMPLETED" | "PENDING" | undefined;
        description?: string | undefined;
        priority?: "LOW" | "MEDIUM" | "HIGH" | undefined;
        dueDate?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
        status?: "IN_PROGRESS" | "COMPLETED" | "PENDING" | undefined;
        description?: string | undefined;
        priority?: "LOW" | "MEDIUM" | "HIGH" | undefined;
        dueDate?: string | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        status?: "IN_PROGRESS" | "COMPLETED" | "PENDING" | undefined;
        description?: string | undefined;
        priority?: "LOW" | "MEDIUM" | "HIGH" | undefined;
        dueDate?: string | undefined;
    };
}>;
//# sourceMappingURL=task.schema.d.ts.map