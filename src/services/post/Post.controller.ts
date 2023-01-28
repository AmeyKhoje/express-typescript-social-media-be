import validationMiddleware from 'middlewares/Validation.middleware';
import { NextFunction, Request, Response, Router } from 'express';
import authMiddleware from 'middlewares/Auth.middleware';
import BasicPostDto from './BasicPost.dto';
import PostService from './Post.service';
import HttpException from 'exceptions/HttpException.exception';

class PostController {
  public path = '/posts';
  public router = Router();
  private postService = new PostService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/_new`,
      authMiddleware,
      validationMiddleware(BasicPostDto),
      this.create
    );
  }

  public create = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const postCreated = await this.postService.create(request.body);
      if (!postCreated) {
        throw new HttpException(400, 'Failed to create post');
      }
      response.status(200).send({ success: true });
    } catch (error) {
      throw new HttpException(400, 'Failed to create post');
    }
  };
}

export default PostController;
