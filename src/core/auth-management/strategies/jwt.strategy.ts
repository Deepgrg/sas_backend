import { RequestContext } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPayload } from '../interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-strategy') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: IPayload) {
    // set current request context
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    RequestContext.currentRequestContext().map.set('userId', payload.sub);

    // set req.user
    return {
      userId: payload.sub,
      userType: payload.userType,
    };
  }
}
