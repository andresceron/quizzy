import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';
import Logger from './config/logger';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  await loadNest();
}
bootstrap();

async function loadNest() {
  const app = await NestFactory.create(AppModule);
  if (!!app) {
    Logger.info('Nest loaded');
  }

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  app.enableCors();

  app.use(compress());
  app.use(helmet());
  app.use(cors({ origin: '*' }));


  await app.listen(config.port, () => {
    Logger.info(`⚡️[server] Running on port: ${config.port} ⚡️`);
  });

  process.on('unhandledRejection', (error) => {
    Logger.error('unhandledRejection', error);
  });
}