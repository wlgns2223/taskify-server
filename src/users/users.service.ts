import { Inject, Injectable, Logger } from '@nestjs/common';
import { EntityNotFoundException } from '../common/exceptions/exceptions';
import { EntityAlreadyExists } from './exceptions/entity.exception';
import { UsersRepository, UsersRepositoryToken } from './repository';
import { UsersService } from './service/users.provider';
import { User } from './users.entity';
import { UserMapper } from './dto/user.mapper';

@Injectable()
export class UsersServiceImpl implements UsersService {
  private logger = new Logger(UsersServiceImpl.name);
  constructor(
    @Inject(UsersRepositoryToken)
    private usersRepository: UsersRepository,
  ) {}

  async create(user: User) {
    const found = await this.usersRepository.findOneBy(user.email);
    if (!found) {
      throw EntityAlreadyExists(`User with email ${user.email} already exists`);
    }

    const newUser = UserMapper.toEntity(user);

    return await this.usersRepository.create(newUser);
  }

  async findOneBy(email: string) {
    const userEntity = await this.usersRepository.findOneBy(email);
    if (!userEntity) {
      throw EntityNotFoundException(`User with email ${email} not found`);
    }
    return userEntity === null ? null : userEntity;
  }
}
