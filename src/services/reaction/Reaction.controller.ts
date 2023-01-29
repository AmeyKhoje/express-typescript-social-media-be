import { NextFunction, Request, Response, Router } from 'express';
import ReactionService from './Reaction.service';
import HttpException from 'exceptions/HttpException.exception';
import authMiddleware from 'middlewares/Auth.middleware';
import validationMiddleware from 'middlewares/Validation.middleware';
import CreateReactionDto from './Reaction.dto';
import ApiResponse from 'responses/ApiResponse';

class ReactionController {
  public path = '/reaction';
  public router = Router();
  private reactionService = new ReactionService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/:userId/_new`,
      authMiddleware,
      validationMiddleware(CreateReactionDto),
      this.create
    );
    this.router.delete(
      `${this.path}/:userId/:postId/_delete`,
      authMiddleware,
      this.delete
    );
  }

  public create = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const fromId = request.params.userId;
    const reactionObject = {
      ...request.body,
      from: fromId,
    };

    try {
      const reaction = await this.reactionService.create(reactionObject);

      if (!reaction) {
        response.send(
          new ApiResponse(false, 'Failed to create reaction', [], {})
        );
        next(new HttpException(400, 'Failed to create reaction'));
      }

      response.status(200).send({ success: true });
    } catch (error) {
      next(new HttpException(400, 'Failed to create reaction'));
    }
  };

  public delete = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { userId, postId } = request.params;

    try {
      const reactionDeleted = await this.reactionService.delete(userId, postId);

      if (!reactionDeleted) {
        next(new HttpException(400, 'Failed to delete'));
      }

      response.status(200).send({ success: true });
    } catch (error) {
      next(
        new HttpException(
          400,
          'Failed to delete reaction. Something went wrong. Check your network connectivity or try again later'
        )
      );
    }
  };
}

export default ReactionController;
