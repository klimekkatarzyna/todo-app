import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
export declare const validateParams: <T>(schema: yup.SchemaOf<T, never>) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const validateBody: <T>(schema: yup.SchemaOf<T, never>) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=validation.d.ts.map