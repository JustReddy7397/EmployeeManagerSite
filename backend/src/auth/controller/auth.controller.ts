import { Body, Controller, Request, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import {AuthService} from "../service/auth.service";
import {SignInDto} from "../../util/validation/SignInDto";
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    logIn(@Body() signInDto: SignInDto) {
        return this.authService.validateUser(signInDto.email, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
