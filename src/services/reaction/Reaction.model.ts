import { Document, Schema, model } from 'mongoose';
import ReactionInterface from './Reaction.interface';

const reactionSchema = new Schema({
  type: 'string',
  from: 'string',
  to: 'string',
});

const reactionModel = model<ReactionInterface & Document>(
  'Reaction',
  reactionSchema
);

export default reactionModel;
