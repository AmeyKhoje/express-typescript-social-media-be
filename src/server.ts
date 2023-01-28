import AuthenticationController from 'services/authentication/Authentication.controller';
import App from './app';
import UserController from 'services/user/User.controller';
import PostController from 'services/post/Post.controller';
import ReactionController from 'services/reaction/Reaction.controller';

const app = new App([
  new AuthenticationController(),
  new UserController(),
  new PostController(),
  new ReactionController(),
]);

app.listenApp();
