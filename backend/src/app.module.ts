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
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT) || 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'password',
      database: process.env.MYSQL_DATABASE || 'test',
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
    /*const admin = new Employee();
    admin.firstName = "admin";
    admin.middleName = "admin";
    admin.lastName = "admin";
    admin.email = "admin@this.com";
    admin.password = "admin";
    admin.phone = "1234567890";
    admin.address = "admin";
    admin.hireData = new Date();
    admin.rank = EmployeeRank.ADMIN
    dataSource.getRepository(Employee).exists({where: {email: admin.email}}).then((exists) => {
      if (exists) return
      dataSource.getRepository(Employee).save(admin).then(() => {
        console.log('Employee saved');
      })
    })*/

  }
}
