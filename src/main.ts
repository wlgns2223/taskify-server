import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ServiceExceptionFilter } from './common/filters/serviceException.filter';
import * as cookieParser from 'cookie-parser';

export const globalLogger = new Logger('bootstrap');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });
  app.use(cookieParser());
  app.useGlobalFilters(new ServiceExceptionFilter());
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 4000;
  globalLogger.log(`Application listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
