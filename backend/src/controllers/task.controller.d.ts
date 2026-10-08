import { Response } from 'express';
import { AuthRequest } from '../types';
export declare const getTasks: (req: AuthRequest, res: Response) => Promise<any>;
export declare const getTaskById: (req: AuthRequest, res: Response) => Promise<any>;
export declare const createTask: (req: AuthRequest, res: Response) => Promise<any>;
export declare const updateTask: (req: AuthRequest, res: Response) => Promise<any>;
export declare const deleteTask: (req: AuthRequest, res: Response) => Promise<any>;
//# sourceMappingURL=task.controller.d.ts.map