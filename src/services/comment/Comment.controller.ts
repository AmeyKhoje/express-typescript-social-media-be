import { NextFunction, Request, Response, Router } from 'express';
import CommentService from './Comment.service';
import RequestWithUser from 'interfaces/RequestWithUser.interface';
import ApiResponse from 'responses/ApiResponse';
import HttpException from 'exceptions/HttpException.exception';
import authMiddleware from 'middlewares/Auth.middleware';
import validationMiddleware from 'middlewares/Validation.middleware';
import CreateCommentDto from './Comment.dto';

class CommentController {
  public path = '/comment';
  public router = Router();
  private commentService = new CommentService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/_new`,
      authMiddleware,
      validationMiddleware(CreateCommentDto),
      this.create
    );
  }

  public create = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const commentData = {
      ...request.body,
      from: request.user._id,
    };

    try {
      const { success, data, message } = await this.commentService.create(
        commentData
      );
      if (!success) {
        response.send(new ApiResponse(true, message)).status(400);
        next(new ApiResponse(false, message));
      } else {
        response.send(new ApiResponse(true, 'Commented')).status(200);
      }
    } catch (error) {
      response
        .send(new ApiResponse(false, 'Failed to create comment', [], {}))
        .status(400);
      next(new HttpException(400, error));
    }
  };
}

export default CommentController;
