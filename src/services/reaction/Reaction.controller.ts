import { NextFunction, Request, Response, Router } from 'express';
import ReactionService from './Reaction.service';
import HttpException from 'exceptions/HttpException.exception';
import authMiddleware from 'middlewares/Auth.middleware';

class ReactionController {
  public path = '/reaction';
  public router = Router();
  private reactionService = new ReactionService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:userId/_new`, authMiddleware, this.create);
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

      if (!reaction) next(new HttpException(400, 'Failed to create reaction'));

      response.status(200).send({ success: true });
    } catch (error) {
      next(new HttpException(400, 'Failed to create reaction'));
    }
  };
}

export default ReactionController;
