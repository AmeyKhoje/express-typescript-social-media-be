class ValidationErrorException extends Error {
  public status: number;
  public errors: object[];
  constructor(status: number, errors: object[]) {
    super(JSON.stringify(errors));
    this.errors = errors;
    this.status = status;
  }
}

export default ValidationErrorException;
