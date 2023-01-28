import HttpException from 'exceptions/HttpException.exception';
import CreateReactionDto from './Reaction.dto';
import reactionModel from './Reaction.model';

class ReactionService {
  private ReactionModel = reactionModel;

  public async create(data: CreateReactionDto) {
    let reaction;

    try {
      reaction = await this.ReactionModel.create(data);

      if (!reaction) throw new HttpException(400, 'Failed to react');
    } catch (error) {
      throw new HttpException(400, 'Failed to react');
    }

    return reaction;
  }
}

export default ReactionService;
