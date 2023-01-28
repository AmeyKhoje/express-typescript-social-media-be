import HttpException from './HttpException.exception';

class WrongTokenException extends HttpException {
  constructor(status: number, message: string) {
    super(status, message);
  }
}

export default WrongTokenException;
