import { Response } from 'express';
import ApiResponse from './ApiResponse';
import ApiError from './ApiError';

class ApiResponseHandler {
  public static handleResponse<T>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200,
  ): void {
    const jsonData = new ApiResponse(statusCode, message, data);
    res.status(statusCode).json(jsonData);
  }

  public static handleError(res: Response, error: unknown): void {
    let statusCode: number;
    let message: string;

    if (error instanceof ApiError) {
      statusCode = error.statusCode;
      message = error.message;
    } else if (error instanceof Error) {
      statusCode = 500;
      message = error.message;
    } else {
      statusCode = 500;
      message = 'An unexpected error occurred';
    }

    const jsonData = new ApiError(statusCode, message);
    res.status(statusCode).json(jsonData);
  }
}

export default ApiResponseHandler;
