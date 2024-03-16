import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import dotenv from 'dotenv'
import process from 'process';
async function bootstrap() {
  const app =
      await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

}

(async () => {
  await bootstrap();
})()
