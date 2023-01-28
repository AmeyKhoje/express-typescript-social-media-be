import HttpException from 'exceptions/HttpException.exception';
import BasicPostDto from './BasicPost.dto';
import PostInterface from './Post.interface';
import postModel from './Post.model';

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
}

export default PostService;
