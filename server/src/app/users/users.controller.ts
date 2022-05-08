import { Controller, Get, Header, Param, Delete, Put, Body, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUser } from './user.decorator';
import { User } from './users.model';
import { deletedMessage, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@AuthUser() user: User): Promise<User | null> {
    return this.usersService.findUser(user.id);
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findPublicUser(id);
  }

  @Get('public/:id')
  getPublicUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findPublicUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<deletedMessage> {
    return this.usersService.deleteUser(id);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  updateUser(@Param('id') id: string, @Body() user: User): Promise<User | null> {
    return this.usersService.updateUser(id, user);
  }

  @Post()
  @Header('content-type', 'application/json')
  addUser(@Body() user: User): Promise<User | null> {
    return this.usersService.addUser(user);
  }
}
