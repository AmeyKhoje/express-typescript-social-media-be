import HttpException from 'exceptions/HttpException.exception';
import BasicPostDto from './BasicPost.dto';
import PostInterface from './Post.interface';
import postModel from './Post.model';
import { Document } from 'mongoose';
import NotFoundException from 'exceptions/NotFound.exception';

class PostService {
  public PostModel = postModel;

  public async create(post: BasicPostDto) {
    if (post) {
      let newPost: PostInterface;
      try {
        newPost = await this.PostModel.create(post);
      } catch (error) {
        throw new HttpException(400, 'Failed to create post');
      }

      return !!newPost;
    }
    return false;
  }

  public getPostsByUserId = async (userId: string) => {
    let postsFound;
    try {
      const posts = await this.PostModel.find({ author: userId });

      if (!posts) {
        throw new NotFoundException('Posts');
      }
      postsFound = posts;
    } catch (error) {
      throw new HttpException(
        400,
        'Failed to get posts. Please try again after sometime'
      );
    }

    return postsFound;
  };
}

export default PostService;
