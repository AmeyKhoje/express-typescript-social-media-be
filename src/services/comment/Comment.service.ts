import CreateCommentDto from './Comment.dto';
import commentModel from './Comment.model';

class CommentService {
  private CommentModel = commentModel;

  public async create(data: CreateCommentDto) {
    let newComment;
    if (data) {
      try {
        newComment = await this.CommentModel.create(data);
      } catch (error) {
        return {
          success: false,
          message: 'Failed to create comment',
        };
      }

      if (newComment) {
        return {
          success: true,
          data: newComment,
        };
      }
      return {
        success: false,
      };
    } else {
      return {
        success: false,
        message: 'No data provided',
      };
    }
  }
}

export default CommentService;
