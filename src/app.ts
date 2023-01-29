import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { connect, set } from 'mongoose';
import Controller from './interfaces/Controller.interface';
import * as cors from 'cors';

config();

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
  }

  public listenApp() {
    this.app.listen(process.env.PORT, () => {
      console.log('App started');
    });
  }

  public initializeMiddleware() {
    this.app.use(express.json({ limit: '200kb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());
  }

  public initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }

  private connectToDatabase() {
    try {
      connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
        keepAlive: true,
      });
      set('strictQuery', false);
    } catch (error) {
      throw new Error('Error while connection');
    }
  }
}

export default App;
