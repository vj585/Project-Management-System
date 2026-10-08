import { Response } from 'express';
import { AuthRequest } from '../types';
export declare const register: (req: AuthRequest, res: Response) => Promise<any>;
export declare const login: (req: AuthRequest, res: Response) => Promise<any>;
export declare const getMe: (req: AuthRequest, res: Response) => Promise<any>;
export declare const logout: (req: AuthRequest, res: Response) => Promise<any>;
//# sourceMappingURL=auth.controller.d.ts.map