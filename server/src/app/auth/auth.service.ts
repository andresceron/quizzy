import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { comparePasswords } from '../../utils/bcrypt.utils';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserEmail(email);
    if (user) {
      const matched = comparePasswords(password, user.password);
      return matched ? user : null;
    }
    return null;
  }

  async login(user: User): Promise<any> {
    const payload = { username: user.email, sub: user.id };
    return {
      username: user.email,
      id: user.id,
      token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto): Promise<any> {
    return this.usersService.addUser(user)
  }

}
