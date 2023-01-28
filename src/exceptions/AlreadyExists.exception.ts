import HttpException from "./HttpException.exception";

class AlreadyExistsException extends HttpException {
  constructor(variable: string, property: string) {
    super(400, `${variable} with ${property} already exists. Please choose another one.`)
  }
}

export default AlreadyExistsException