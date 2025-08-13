import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DataSource, Repository } from 'typeorm';
import { Session } from './entities/Session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser(process.env.COOKIE_SECRET));

  app.enableCors({
    origin: 'http://localhost:3000', // Angular frontend
    credentials: true,               // nodig voor cookies
  });

  const sessionRepository: Repository<Session> = app
    .get(DataSource)
    .getRepository(Session);

  await app.listen(3001);
}

bootstrap();

