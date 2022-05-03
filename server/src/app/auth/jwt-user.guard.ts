import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
    const allowAny = this.reflector.get<string[]>('allow-any', context.getHandler());
    if (user || allowAny) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
