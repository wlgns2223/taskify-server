import { Provider } from '@nestjs/common';
import { User, UserEntity } from '../users.entity';
import { UsersServiceImpl } from './users.serviceImpl';
import { Email, Id } from '../repository';

export interface UsersService {
  create: (user: User) => Promise<UserEntity>;
  findOneBy: (identifier: Email | Id) => Promise<UserEntity | null>;
}

export const UsersServiceToken = Symbol('UsersService');

export const UsersServiceProvider: Provider<UsersService> = {
  provide: UsersServiceToken,
  useClass: UsersServiceImpl,
};
