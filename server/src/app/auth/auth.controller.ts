import { Controller, Get, Header, Param, Delete, Put, Body, Post, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../users/users.model';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<User> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() user: CreateUserDto): Promise<User> {
    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any): Promise<User> {
    return req.user;
  }
}
