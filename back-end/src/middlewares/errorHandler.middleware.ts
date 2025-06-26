import { Request, Response, NextFunction } from 'express'
import { stat } from 'fs'

export class CustomError extends Error {
  status?: number
  code?: string
  constructor(message: string, status: number, code: string)
  {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500
  const message = err.message || 'Internal Server Error'

  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack)
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.code && { code: err.code }),
  });
  next();
}