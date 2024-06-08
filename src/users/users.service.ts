import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(private usersRepository: UsersRepository) {}

  async createUser(email: string, nickname: string, password: string) {
    const newUser = new User(email, nickname, password);
    return await this.usersRepository.createUser(newUser);
  }
}
