import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import Logger from '../../config/logger';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UsersEntity } from './users.entity';
import { User } from './users.model';
import { encodePassword } from '../../utils/bcrypt.utils';

export interface deletedMessage {
  message: string;
}

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepo: Repository<UsersEntity>
  ) { }

  async findAllUsers(): Promise<User[]> {
    return await this.usersRepo.find();
  }

  async findUser(id: string): Promise<User | null> {
    if (!id) {
      return null;
    }

    return await this.usersRepo.findOne({
      where: {
        id: id
      }
    });
  }

  async findPublicUser(id: string): Promise<User | null> {
    if (!id) {
      return null;
    }

    return await this.usersRepo.createQueryBuilder('u')
      .select(['u.id', 'u.name'])
      .where('u.id = :id', { id: id})
      .getOne();
  }

  async findUserEmail(email: string): Promise<User|null> {
    return await this.usersRepo.findOne({
      where: {
        email: email
      }
    });
  }

  async deleteUser(id: string): Promise<deletedMessage> {
    try {
      const user = await this.usersRepo.findOne({where:{ id: id }});
      const userDeleted = await this.usersRepo.delete({ id: id });

      if (userDeleted.affected === 0 ) {
        throw new HttpException('not found', HttpStatus.NOT_FOUND);
      }

      if (userDeleted) {
        return new Promise((resolve) => resolve({ message: 'user was deleted' }));
      }
      throw false;

    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  async updateUser(id: string, user: User): Promise<User | null> {
    try {
      if (!!user.password && user.password !== '') {
        const password = encodePassword(user.password);
        const updateUserWithPassword = await this.usersRepo
          .createQueryBuilder()
          .update(UsersEntity)
          .set(
            {
              name: user.name,
              email: user.email,
              password: password
            }
          )
          .where("id = :id", { id: id })
          .execute();

      } else {
        const updateUser = await this.usersRepo
          .createQueryBuilder()
          .update(UsersEntity)
          .set(
            {
              name: user.name,
              email: user.email
            }
          )
          .where("id = :id", { id: id })
          .execute();
      }
    } catch (err) {
      throw new HttpException('Problem updating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return await this.usersRepo.findOne({ where: { email: user.email } });
  }

  async addUser(user: CreateUserDto): Promise<User | null> {
    try {
    const userExist = await this.usersRepo.findOne({ where: { email: user.email } });
      if (userExist) {
        throw new HttpException('Conflict', HttpStatus.CONFLICT);
      }

      const password = encodePassword(user.password);
      const newUser = this.usersRepo.create({ ...user, password });

      return await this.usersRepo.save(newUser);
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

}
