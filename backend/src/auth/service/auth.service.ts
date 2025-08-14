import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '../../entities/Employee';
import { Services } from '../../util/enums';

@Injectable()
export class AuthService {

  constructor(
    @Inject(Services.USER) private readonly usersService: UsersService,
              private jwtService: JwtService,
  ) {
  }

  public async validateUser(email: string, pass: string) {
    let user: Employee = await this.usersService.findOneByEmail(email);

    if (user && (await user.validatePassword(pass))) {
      const { password, ...result } = user;
      return result;
    }
  }



}
