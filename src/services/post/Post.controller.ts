import validationMiddleware from 'middlewares/Validation.middleware';
import { NextFunction, Request, Response, Router } from 'express';
import authMiddleware from 'middlewares/Auth.middleware';
import BasicPostDto from './BasicPost.dto';
import PostService from './Post.service';
import HttpException from 'exceptions/HttpException.exception';
import NotFoundException from 'exceptions/NotFound.exception';
import sameUserMiddleware from 'middlewares/SameUser.middleware';
import ApiResponse from 'responses/ApiResponse';

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
      sameUserMiddleware('author'),
      validationMiddleware(BasicPostDto),
      this.create
    );
    this.router.get(
      `${this.path}/:userId/_get`,
      authMiddleware,
      this.getPostsByUserId
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
        response
          .status(400)
          .send(new ApiResponse(false, 'Failed to create post', [], {}));
        throw new HttpException(400, 'Failed to create post');
      }
      response.status(200).send(new ApiResponse(true, 'Post created', [], {}));
    } catch (error) {
      response
        .status(400)
        .send(new ApiResponse(false, 'Failed to create post', [], {}));
      throw new HttpException(400, 'Failed to create post');
    }
  };

  public getPostsByUserId = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const posts = await this.postService.getPostsByUserId(
        request.params.userId
      );

      if (!posts) {
        throw new NotFoundException('Posts');
      }

      response.status(200).send({ success: true, data: posts });
    } catch (error) {
      next(new HttpException(400, 'Failed to get posts'));
    }
  };
}

export default PostController;
