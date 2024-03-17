import { Body, Controller, Request, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import {AuthService} from "../service/auth.service";
import { JwtAuthGuard } from '../guard/jwt.guard';
import { LocalAuthGuard } from '../guard/local.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    logIn(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
