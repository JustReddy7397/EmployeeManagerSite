import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  app.use(cookieParser(process.env.COOKIE_SECRET));

  app.enableCors({
    origin: 'http://localhost:4200', // Your Angular app URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix("api");

  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/employeemanagersite',
        touchAfter: 24 * 3600
      })
    }),
  );


  await app.listen(3001);
}

bootstrap();

