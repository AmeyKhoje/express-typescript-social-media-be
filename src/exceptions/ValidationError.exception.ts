class ValidationErrorException extends Error {
  public status: number;
  public errors: object[];
  constructor(status: number, errors: object[]) {
    const stringErrors = `[${errors.map(
      (error) => `${JSON.stringify(error)}, `
    )}]`;
    console.log(stringErrors);

    super(stringErrors);
    this.errors = errors;
    this.status = status;
  }
}

export default ValidationErrorException;
