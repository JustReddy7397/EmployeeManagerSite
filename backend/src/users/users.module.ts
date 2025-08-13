import { Injectable, Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../entities/Employee';
import { Services } from '../util/enums';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]),
  ],
  providers: [
    {
      provide: Services.USER,
      useClass: UsersService,
    },
  ],
  exports: [
    {
      provide: Services.USER,
      useClass: UsersService,
    },
    TypeOrmModule],
  controllers: [UsersController],
})
export class UsersModule {

}
