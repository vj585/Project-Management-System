import { z } from 'zod';
export declare const createProjectSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]>>;
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    }, {
        name: string;
        status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    };
}, {
    body: {
        name: string;
        status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    };
}>;
export declare const updateProjectSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]>>;
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    }, {
        name?: string | undefined;
        status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
        status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    };
}>;
//# sourceMappingURL=project.schema.d.ts.map