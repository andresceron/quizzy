import { Controller, Get, Header, Param, Delete, Put, Body, Post } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { User } from './users.model';
import { deletedMessage, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<deletedMessage> {
    return this.usersService.deleteUser(id);
  }

  @Put(':id')
  @Header('content-type', 'text/html')
  updateUser(@Param('id') id: string, @Body() user: User): Promise<UpdateResult | null> {
    return this.usersService.updateUser(id, user);
  }

  @Post()
  @Header('content-type', 'text/html')
  addUser(@Body() user: User): Promise<User | null> {
    return this.usersService.addUser(user);
  }
}
