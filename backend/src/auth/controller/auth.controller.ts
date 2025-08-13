import {
  BadRequestException, Body,
  Controller,
  Get,
  Inject, Post,
  Req,
  Request as NestRequest,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { AuthEmployee } from '../../util/decorators/AuthEmployee';
import { UsersService } from '../../users/service/users.service';
import { Services } from '../../util/enums';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../../util/validation/SignInDto';
import { AuthGuard } from '../guard/auth.guard';
import { RegisterDto } from '../../util/validation/RegisterDto';
import { LocalAuthGuard } from '../guard/local.guard';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService,
              private jwtService: JwtService,
              @Inject(Services.USER) private readonly userService: UsersService) {
  }

  @Post('login')
  async logIn(
    @Body() signInDTO: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = signInDTO;

    const user = await this.userService.findOneByEmail(email);

    if (!user || !(await user.validatePassword(password))) {
      throw new BadRequestException({
        message: 'Employee not found with this email OR password',
        cause: 'EMPLOYEE_NOT_FOUND',
      });
    }

    const accessToken = await this.jwtService.signAsync({
      email: user.email,
      sub: user.id,
    });

    // Stuur JWT als HTTP-only cookie
    res.cookie('user_token', accessToken, {
      httpOnly: true,
      secure: false, // Zet op true in productie (HTTPS)
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60,
    });

    return { message: 'Logged in successfully' };
  }


  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@NestRequest() request: any) {
    const string = JSON.stringify(request.user);
    const parse = JSON.parse(string);
    const email = parse.email;
    const user = await this.userService.findOneByEmail(email);
    const { password, access_token, ...newUser } = user;
    return newUser
  }


  @UseGuards(AuthGuard)
  @Get('status')
  async status(@AuthEmployee() employee: any, @Req() request: Request) {
    const string = JSON.stringify(request.user);
    const parse = JSON.parse(string);
    const email = parse.email;
    const { password, access_token, phone, address, hireData, ...rest } = await this.userService.findOneByEmail(email);
    return rest;
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: Response) {
    res.cookie('user_token', '', {
      expires: new Date(Date.now()),
    });
    console.log('a');
    res.redirect('http://localhost:3000/login');
  }

}

