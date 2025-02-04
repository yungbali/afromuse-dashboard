export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public status: string = 'error'
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
} 