import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { secretKey } from '../util/constants';
import { UsersService } from '../users/service/users.service';
import { ConfigModule } from '@nestjs/config';
import process from 'process';
import { AuthGuard } from './guard/auth.guard';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SessionSerializer } from '../util/SessionSerializer';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: secretKey.key,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy,AuthService,
    {
      provide: 'AUTH_GUARD',
      useClass: AuthGuard,
    },
    LocalStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {

}
