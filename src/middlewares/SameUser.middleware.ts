import HttpException from 'exceptions/HttpException.exception';
import { NextFunction, Request, Response } from 'express';
import RequestWithUser from 'interfaces/RequestWithUser.interface';
import ApiResponse from 'responses/ApiResponse';

const sameUserMiddleware = (fieldName: string) => {
  return (request: RequestWithUser, response: Response, next: NextFunction) => {
    const userIdFromRequest = request.user._id.toString();
    const userIdFromBody = request.body[fieldName].toString();

    if (userIdFromRequest !== userIdFromBody) {
      response
        .status(400)
        .send(new ApiResponse(false, 'User does not match', [], {}));
      next(new HttpException(400, 'User does not match'));
    }

    next();
  };
};

export default sameUserMiddleware;
