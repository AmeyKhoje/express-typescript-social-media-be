import { Schema, Types, model } from 'mongoose';
import UserInterface from './User.interface';

const userSchema = new Schema<UserInterface>({
  firstName: 'string',
  lastName: 'string',
  email: 'string',
  mobile: 'number',
  location: 'object',
  profileImage: 'string',
  coverImage: 'string',
  username: 'string',
  followers: [{ type: Types.ObjectId, ref: 'User' }],
  following: [{ type: Types.ObjectId, ref: 'User' }],
});

const userModel = model('User', userSchema);

export default userModel;
