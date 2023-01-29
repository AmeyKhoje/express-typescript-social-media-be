class ApiResponse {
  public success: boolean;
  public message: string;
  public errors: [];
  public data: [] | object;

  constructor(
    success: boolean,
    message?: string,
    errors?: [],
    data?: [] | object
  ) {
    this.success = success;
    this.message = message || '';
    this.errors = errors || [];
    this.data = data || {};
  }
}

export default ApiResponse;
