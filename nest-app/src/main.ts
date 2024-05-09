import { AppModule } from './app.module';
import { envs } from './config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {

  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  await app.listen(envs.port);

  logger.log(`App running on port ${envs.port}`);

}
bootstrap();
