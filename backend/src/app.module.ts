import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {UsersService} from "./users/service/users.service";
import { Employee } from './entities/Employee';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';


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
            entities: [Employee],
            synchronize: true,
        }),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService, UsersService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
