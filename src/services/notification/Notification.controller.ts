import { NextFunction, Request, Response, Router } from 'express';
import NotificationService from './Notification.service';
import authMiddleware from 'middlewares/Auth.middleware';
import sameUserMiddleware from 'middlewares/SameUser.middleware';
import validationMiddleware from 'middlewares/Validation.middleware';
import CreateNotificationDto from './CreateNotification.dto';
import ApiResponse from 'responses/ApiResponse';
import HttpException from 'exceptions/HttpException.exception';

class NotificationController {
  public path = '/notification';
  public router = Router();
  private notificationService = new NotificationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/:userId/_new`,
      authMiddleware,
      validationMiddleware(CreateNotificationDto),
      this.create
    );
  }

  public create = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const userId = request.params.userId;

    if (!userId) {
      response.status(400).send(new ApiResponse(false, 'User id not provided'));
      next(new HttpException(400, 'User id not provided'));
    }

    const notificationData = {
      createdBy: userId,
      ...request.body,
    };

    let success;

    try {
      success = await this.notificationService.create(notificationData);
    } catch (error) {
      response
        .status(400)
        .send(new ApiResponse(false, 'Failed to add notification'));
      next(new HttpException(400, 'Failed to add notification'));
    }

    if (!success) {
      response
        .status(400)
        .send(new ApiResponse(false, 'Failed to add notification'));
      next(new HttpException(400, 'Failed to add notification'));
    }

    response.status(200).send(new ApiResponse(true, 'Notified'));
  };
}

export default NotificationController;
