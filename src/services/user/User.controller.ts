import NotFoundException from 'exceptions/NotFound.exception';
import { NextFunction, Request, Response, Router, request } from 'express';
import authMiddleware from 'middlewares/Auth.middleware';
import userModel from './User.model';
import HttpException from 'exceptions/HttpException.exception';
import { getTokenData } from 'utils/OperationHelpers';
import UserInterface from './User.interface';
import validationMiddleware from 'middlewares/Validation.middleware';
import CreateUserDto from './CreateUser.dto';
import ApiResponse from 'responses/ApiResponse';
import CustomFormValidator from 'utils/form/helpers/CustomFormValidator';

class UserController {
  public path = '/user';
  public router = Router();
  public UserModel = userModel;
  private formValidator = new CustomFormValidator();

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
    this.router.patch(
      `${this.path}/update/:userId/_patch`,
      authMiddleware,
      validationMiddleware(CreateUserDto),
      this.updateUser
    );
  }

  public updateUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const userId = request.params.userId;
    let existingUser: UserInterface;

    try {
      existingUser = await this.UserModel.findById(userId);
    } catch (error) {
      response.status(400).send(new ApiResponse(false, 'Failed to find user'));
      next(new HttpException(400, 'Failed to find user'));
    }

    if (!existingUser) {
      response.status(404).send(new ApiResponse(false, 'User not found'));
      next(new NotFoundException('User'));
    }

    const formData = request.body;

    this.formValidator.validateForm(
      formData,
      CreateUserDto,
      async (errors: []) => {
        if (errors.length) {
          response
            .send(400)
            .send(new ApiResponse(false, 'Errors found', errors));
          next(new HttpException(400, 'Form validation failed'));
        } else {
          try {
            await this.UserModel.updateOne({ _id: userId }, formData);
          } catch (error) {
            response
              .status(400)
              .send(new ApiResponse(false, 'Failed to update user'));
            next(new HttpException(400, 'Failed to update user'));
          }

          response
            .status(200)
            .send(
              new ApiResponse(
                true,
                `Hello ${existingUser.firstName} ${existingUser.lastName}, Your profile has been updated successfully`
              )
            );
        }
      }
    );
  };

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
