import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import {UsersModule} from "../users/users.module";
import { JwtModule, JwtService } from '@nestjs/jwt';
import { secretKey } from '../util/constants';
import { UsersService } from '../users/service/users.service';
import { ConfigModule } from '@nestjs/config';
import process from 'process';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: secretKey.key,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {

}
