import express, { Application, NextFunction, Request, Response } from 'express';
import config from './config/config';
import Logger from './config/logger';
import routes from './index.route';

import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import helmet from 'helmet';
import cors from 'cors';
import helmetCSP from 'helmet-csp';
import { NotFoundError } from './helpers/api-error';
import errorHandler from './helpers/error';

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.loadExpress();
    this.middlewares();
    this.routes();
    this.catchErrors();
  }

  async startServer() {
    await this.app.listen(config.port, () => {
      Logger.info(`⚡️[server] Running on port: ${config.port} ⚡️`);
    });
  }

  private loadExpress() {
    Logger.info('Express loaded');
  }

  private middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(compress());
    this.app.use(methodOverride());
    this.app.enable('trust proxy');
    this.app.use(helmet());
    this.app.use(
      helmetCSP({
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          blockAllMixedContent: [],
          fontSrc: ["'self'", 'https:', 'data:'],
          frameAncestors: ["'self'"],
          imgSrc: [
            "'self'",
            'https://pngimage.net/',
            'data:'
          ],
          objectSrc: ["'none'"],
          scriptSrc: [
            "'self'",
            'localhost:',
            'https://apis.google.com/',
            "'unsafe-inline'",
            'https://www.googletagmanager.com/',
            'https://cdnjs.cloudflare.com/',
            'blob:',
            'https://cdnjs.cloudflare.com/'
          ],
          scriptSrcAttr: ["'none'"],
          styleSrc: ["'self'", 'https:', 'blob:', "'unsafe-inline'"],
          workerSrc: ["'self'", 'blob:', "'unsafe-inline'"],
          upgradeInsecureRequests: []
        },
        reportOnly: false
      })
    );

    this.app.use(cors({ origin: '*' }));
    this.app.options('*', cors());
  }

  private routes() {
    this.app.use('/v1', routes);
  }

  private catchErrors() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      return next(new NotFoundError('API not found'));
    });

    this.app.use(errorHandler);
  }

}