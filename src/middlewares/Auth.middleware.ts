import NotFoundException from 'exceptions/NotFound.exception';
import WrongTokenException from 'exceptions/WrongToken.exception';
import { NextFunction, Request, Response } from 'express';
import DataStoredInToken from 'interfaces/DataStoredInToken.interface';
import RequestWithUser from 'interfaces/RequestWithUser.interface';
import { verify } from 'jsonwebtoken';
import userModel from 'services/user/User.model';
require('dotenv').config();

const authMiddleware = async (
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) => {
  const cookies = request.cookies;

  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;

    try {
      const verificationResponse = verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken;
      const id: string = verificationResponse._id;
      const user = await userModel.findById(id);

      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongTokenException(400, 'Wront token provided'));
      }
    } catch (error) {
      next(new WrongTokenException(400, 'Wront token provided'));
    }
  } else {
    next(new NotFoundException('Token'));
  }
};

export default authMiddleware;
