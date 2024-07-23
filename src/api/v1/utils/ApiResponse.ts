interface IApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}

class ApiResponse<T = null> implements IApiResponse<T> {
  success: boolean;

  constructor(
    public statusCode: number,
    public message: string = 'Success',
    public data: T,
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; // Assuming status codes less than 400 are successful
  }
}

export default ApiResponse;
