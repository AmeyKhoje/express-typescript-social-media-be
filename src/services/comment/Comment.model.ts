import { Document, Schema, Types, model } from 'mongoose';
import CommentInterface from './Comment.interface';

const commentSchema = new Schema<CommentInterface>({
  from: 'string',
  to: 'string',
  text: 'string',
  replies: [{ type: Types.ObjectId, ref: 'Comment' }],
});

const commentModel = model<CommentInterface & Document>(
  'Comment',
  commentSchema
);

export default commentModel;
