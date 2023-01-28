import AuthenticationController from 'services/authentication/Authentication.controller';
import App from './app';

const app = new App([new AuthenticationController()]);

app.listenApp();
