import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants, JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService, UsersService, LocalStrategy, JwtStrategy
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}