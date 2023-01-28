import HttpException from './HttpException.exception';

class WrongCredentialsException extends HttpException {
  constructor() {
    super(400, 'Wrong credential. Please check entered details');
  }
}

export default WrongCredentialsException;
