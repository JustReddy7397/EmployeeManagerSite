import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
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
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../../util/validation/SignInDto';
import { AuthGuard } from '../guard/auth.guard';
import { RegisterDto } from '../../util/validation/RegisterDto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService,
              private jwtService: JwtService,
              @Inject(Services.USER) private readonly userService: UsersService) {
  }

  @Post('signup')
  private async signUp(@Body() registerDto: RegisterDto,
  @Res({ passthrough: true }) response: Response) {
    const { email } = registerDto;

    // Check if user already exists
    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException({
        message: 'Employee already exists with this email',
        cause: 'EMPLOYEE_ALREADY_EXISTS',
      });
    }
    await this.userService.createEmployee(registerDto)
    return { message: 'Employee created successfully' };
  }

  @Post('login')
  private async logIn(
    @Body() signInDTO: SignInDto,
    @Req() req: Request,
    @Res({passthrough: true}) response: Response,
  ) {

    const { email, password } = signInDTO;

    const user = await this.userService.findOneByEmail(email);

    if (!user || !(await user.validatePassword(password))) {
      throw new BadRequestException({
        message: 'Employee not found with this email OR password',
        cause: 'EMPLOYEE_NOT_FOUND',
      });
    }

    req.session["user"] = {
      id: user._id,
      email: user.email,
    }

    return { message: 'Logged in successfully' };
  }


  @UseGuards(AuthGuard)
  @Get('profile')
  private async getProfile(@NestRequest() request: any) {
    const userId = request.session['user']?.id;
    const user = await this.userService.findOne(userId);
    const { password, access_token, ...newUser } = user;
    return newUser
  }


  @UseGuards(AuthGuard)
  @Get('status')
  private async status(@AuthEmployee() employee: any, @Req() request: Request) {
    return {
      authenticated: true,
      user: request.session['user']
    };
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  private async logOut(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(err => {
      if (err) {
        throw new BadRequestException({
          message: 'Failed to log out',
          cause: 'LOGOUT_FAILED',
        });
      }
    })
    res.clearCookie('connect.sid');
    res.send(true)
    return { message: 'Logged out successfully' };
  }

}

