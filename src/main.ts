import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

export const globalLogger = new Logger('bootstrap');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  const port = process.env.PORT || 4000;
  globalLogger.log(`Application listening on port ${port}`);
  await app.listen(port);
}
bootstrap();