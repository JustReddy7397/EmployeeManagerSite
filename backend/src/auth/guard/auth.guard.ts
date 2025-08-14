import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { secretKey } from '../../util/constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../util/util';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector, private authService: AuthService) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.session?.user) {
      throw new UnauthorizedException();
    }

    request.user = request.session.user;
    return true;
  }

  /*async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeaderOrCookie(request);

    console.log("auth.guard.ts: token: ", token)

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: secretKey.key,
      })
      return true;
    } catch (error) {
      throw new ForbiddenException(error.message || 'session expired! Please sign In');
    }
  }

  private extractTokenFromHeaderOrCookie(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer') return token;
    console.log(request.cookies)
    return request.cookies?.['user_token'];
  }*/


}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return req.isAuthenticated();
  }
}

