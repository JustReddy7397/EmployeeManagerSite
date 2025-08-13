import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/service/users.service';
import { Employee } from '../entities/Employee';
import { Services } from './enums';

export class SessionSerializer extends PassportSerializer {

  constructor(
    @Inject(Services.USER) private readonly userService: UsersService,
  ) {
    super()
  }

  serializeUser(employee: Employee, done: CallableFunction) {
    done(null, employee);
  }

  async deserializeUser(employee: Employee, done: CallableFunction) {
    try {
      const user = await this.userService.findOneByEmail(employee.email);
      console.log(user)
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }


}