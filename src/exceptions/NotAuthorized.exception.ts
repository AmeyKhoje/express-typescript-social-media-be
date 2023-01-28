import HttpException from "./HttpException.exception";

class NotAuthorizedException extends HttpException {
  constructor() {
    super(403, `You are not authorized. Please login again.`)
  }
}

export default NotAuthorizedException