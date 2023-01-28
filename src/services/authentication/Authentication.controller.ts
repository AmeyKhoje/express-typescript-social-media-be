import { getSpecificFieldsFromDocument } from './../../utils/OperationHelpers';
import { NextFunction, Request, Response, Router } from 'express';
import AuthenticationService from './Authentication.service';
import validationMiddleware from 'middlewares/Validation.middleware';
import CreateUserDto from 'services/user/CreateUser.dto';
import HttpException from 'exceptions/HttpException.exception';
import LoginDto from 'utils/form/dto/Login.dto';
import { loggedInUserFields } from 'utils/constants/DataConstants';

class AuthenticationController {
  public path = '/auth';
  public router = Router();
  public authenticationService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(
      `${this.path}/user/_new`,
      validationMiddleware(CreateUserDto),
      this.register
    );
    this.router.post(
      `${this.path}/user/_login`,
      validationMiddleware(LoginDto),
      this.login
    );
  }

  public register = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = request.body;

    try {
      const { user, cookie } = await this.authenticationService.register(
        userData
      );

      const loggedInUser = getSpecificFieldsFromDocument(
        user,
        loggedInUserFields
      );
      response.setHeader('Set-Cookie', [cookie]);
      response.status(200).send({ success: true, data: loggedInUser });
    } catch (error) {
      next(new HttpException(400, error));
    }
  };

  public login = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const loginBody: LoginDto = request.body.formData;
    const isRememberMeEnabled: boolean = !!request.body.isRememberMeEnabled;

    try {
      const { user, cookie } = await this.authenticationService.login(
        loginBody,
        isRememberMeEnabled
      );

      const loggedInUser = getSpecificFieldsFromDocument(
        user,
        loggedInUserFields
      );
      response.setHeader('Set-Cookie', [cookie]);
      response.status(200).send({ success: true, user: loggedInUser });
    } catch (error) {
      next(
        new HttpException(
          400,
          'Failed to login. Please try again after sometime'
        )
      );
    }
  };
}

export default AuthenticationController;
