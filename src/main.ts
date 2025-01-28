import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ServiceExceptionFilter } from './common/filters/serviceException.filter';
import cookieParser from 'cookie-parser';
import { ValidationError } from 'class-validator';
import { json, urlencoded } from 'express';

export const globalLogger = new Logger('bootstrap');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });
  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          return {
            property: error.property,
            constraints: error.constraints,
            value: error.value,
          };
        });
        return new Error(JSON.stringify(messages));
      },
    }),
  );
  app.useGlobalFilters(new ServiceExceptionFilter());
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 4000;
  globalLogger.log(`Application listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
