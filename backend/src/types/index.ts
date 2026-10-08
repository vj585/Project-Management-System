import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}
