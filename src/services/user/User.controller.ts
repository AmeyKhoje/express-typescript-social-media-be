import NotFoundException from 'exceptions/NotFound.exception';
import { NextFunction, Request, Response, Router, request } from 'express';
import authMiddleware from 'middlewares/Auth.middleware';
import userModel from './User.model';
import HttpException from 'exceptions/HttpException.exception';
import { getTokenData } from 'utils/OperationHelpers';
import UserInterface from './User.interface';

class UserController {
  public path = '/user';
  public router = Router();
  public UserModel = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/logged-in-user/_get`,
      authMiddleware,
      this.getLoggedInUser
    );
    this.router.get(
      `${this.path}/:userId/_get`,
      authMiddleware,
      this.getUserById
    );
  }

  public getUserById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const userId = request.params.userId;

    if (!userId) {
      throw new NotFoundException('Id');
    }

    let user: UserInterface;

    try {
      user = await this.UserModel.findById(userId).select('-password');
    } catch (error) {
      throw new HttpException(400, 'Failed to get user');
    }

    if (!user) {
      throw new NotFoundException('User');
    }

    response.status(200).send({ success: true, data: user });
  };

  public async getLoggedInUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { data } = getTokenData(request);

    if (data) {
      try {
        const user = await this.UserModel.find({ id: data }).select(
          'firstName lastName email _id userName'
        );

        if (!user) {
          throw new NotFoundException('User');
        }

        response.status(200).send({ success: true, data: user });
      } catch (error) {
        throw new HttpException(400, 'Something went wrong');
      }
    } else {
      throw new NotFoundException('Token');
    }
  }
}

export default UserController;
