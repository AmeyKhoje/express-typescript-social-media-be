import HttpException from 'exceptions/HttpException.exception';
import CreateReactionDto from './Reaction.dto';
import reactionModel from './Reaction.model';
import NotFoundException from 'exceptions/NotFound.exception';

class ReactionService {
  private ReactionModel = reactionModel;

  public async create(data: CreateReactionDto) {
    let reaction;
    let existingReaction;
    let deletedReaction;

    try {
      existingReaction = await this.ReactionModel.find({
        to: data.to,
        from: data.from,
      });
    } catch (error) {
      throw new HttpException(400, 'Something went wrong');
    }

    if (existingReaction) {
      const deleted = await this.delete(data.from, data.to);
      deletedReaction = deleted;
    } else {
      try {
        reaction = await this.ReactionModel.create(data);

        if (!reaction) throw new HttpException(400, 'Failed to react');
      } catch (error) {
        throw new HttpException(400, 'Failed to react');
      }
    }

    if (deletedReaction) {
      return { deletedReaction: true };
    }

    return { reaction };
  }

  public async delete(userId: string, postId: string) {
    let existingReaction;
    let reactionDeleted = false;
    try {
      existingReaction = await this.ReactionModel.find({
        to: postId,
        from: userId,
      });
    } catch (error) {
      throw new HttpException(400, 'Failed to get reaction');
    }

    if (!existingReaction) {
      throw new NotFoundException('Reaction');
    }

    try {
      await this.ReactionModel.deleteOne({ from: userId, to: postId });
      reactionDeleted = true;
    } catch (error) {
      throw new HttpException(400, 'Failed to delete reaction');
    }

    return reactionDeleted;
  }
}

export default ReactionService;
