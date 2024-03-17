import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '../../entities/Employee';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService,
  ) {
  }

  async validateUser(email: string, pass: string) {
    let user: Employee = await this.usersService.findOneByEmail(email);


    // TODO :)

    if (!user) {
      user = new Employee()
      user.email = email
      user.password = pass
    }


    /*if (!user) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }

    if (user.password !== pass) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }*/

    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email as string, sub: user.id as number };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
