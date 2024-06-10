import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.model';
import { EntityNotFoundException } from '../common/exceptions/exceptions';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(private usersRepository: UsersRepository) {}

  async createUser(email: string, nickname: string, password: string) {
    const newUser = new User(email, nickname, password);
    return await this.usersRepository.createUser(newUser);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findUserByEmail(email);
    if (user.length === 0) {
      throw EntityNotFoundException(`User with email ${email} not found`);
    }
    return user[0];
  }
}
