import HttpException from "./HttpException.exception";

class NotFoundException extends HttpException {
  constructor(param: string) {
    super(404, `${param} not found`);
  }
}

export default NotFoundException