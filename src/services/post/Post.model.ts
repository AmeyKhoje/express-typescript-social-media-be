import { Document, Schema, model } from 'mongoose';
import PostInterface from './Post.interface';

const postSchema = new Schema<PostInterface>({
  title: 'string',
  description: 'string',
  image: 'string',
  author: 'string',
});

const postModel = model<PostInterface & Document>('Post', postSchema);

export default postModel;
