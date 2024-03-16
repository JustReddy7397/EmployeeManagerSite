import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../entities/Employee';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {
}
