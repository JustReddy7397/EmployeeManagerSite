import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { secretKey } from '../../util/constants';
import { Employee } from '../../entities/Employee';
import {Request} from 'express'
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: secretKey.key,
    })
  }

  public async validate(payload: any) {
    return {email: payload.email}
  }

  private static extractJWT(req: Request) : string | null {
    if (req.cookies
    && 'user_token' in req.cookies && req.cookies.user_token.length > 0) {
      return req.cookies.user_token;
    }
    return null;
  }

}