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

  async validateUser(email: string, pass: string): Promise<{ access_token: string }> {
    let user: Employee = await this.usersService.findOneByEmail(email);

    // TODO :)

    /*if (!user) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }

    if (user.password !== pass) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }*/

    if (!user) {
      user = new Employee();
      user.id = 1;
      user.email = "aa@aa.com"
      user.password = "123456"
      user.firstName = "aa"
      user.lastName = "aa"
      user.address = "aa"
      user.hireData = new Date()
      user.phone = "123456"
    }

    const payload = { sub: user.id, email: user.email};
    const accessToken = await this.jwtService.signAsync(payload)
    return {
      access_token: accessToken
    };
  }

}
