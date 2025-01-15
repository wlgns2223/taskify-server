import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ServiceExceptionFilter } from './common/filters/serviceException.filter';
import cookieParser from 'cookie-parser';

export const globalLogger = new Logger('bootstrap');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new ServiceExceptionFilter());
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 4000;
  globalLogger.log(`Application listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
