import { Inject, Injectable, Logger } from '@nestjs/common';
import { User, UserProperties } from './users.model';
import { EntityNotFoundException } from '../common/exceptions/exceptions';
import { EntityAlreadyExists } from './exceptions/entity.exception';
import { UsersRepository, UsersRepositoryToken } from './repository';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    @Inject(UsersRepositoryToken)
    private usersRepository: UsersRepository,
  ) {}

  async createUser(email: string, nickname: string, password: string, teamId: string) {
    const user = await this.usersRepository.findOneBy(email);
    if (!user) {
      throw EntityAlreadyExists(`User with email ${email} already exists`);
    }

    const newUser = User.from<User, UserProperties>(User, { email, nickname, password, teamId });
    const createdUser = await this.usersRepository.create(newUser);

    return createdUser.serialize();
  }

  async findUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy(email);
    if (!user) {
      throw EntityNotFoundException(`User with email ${email} not found`);
    }
    return user.serialize();
  }
}
