import { Request } from 'express';
import UserInterface from 'services/user/User.interface';

interface RequestWithUser extends Request {
  user: UserInterface;
}

export default RequestWithUser;
