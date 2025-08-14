import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersService } from './users/service/users.service';
import { Employee } from './entities/Employee';
import * as process from 'process';
import {EmployeeRank} from './util/enums';
import { ConfigModule } from '@nestjs/config';
import { AuthenticatedGuard, AuthGuard } from './auth/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Session } from './entities/Session';


@Module({
  imports: [AuthModule, UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: "mongodb://localhost:27017/employeemanagersite",
      entities: [Employee, Session],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService,
    {
      provide: "AUTHENTICATED_GUARD",
      useClass: AuthenticatedGuard
    },
    {
      provide: "AUTH_GUARD",
      useClass: AuthGuard,
    },
    JwtService
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
  }
}
