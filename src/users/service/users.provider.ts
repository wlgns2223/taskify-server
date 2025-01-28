import { Provider } from '@nestjs/common';
import { User, UserEntity } from '../users.entity';
import { UsersServiceImpl } from './users.serviceImpl';

export interface UsersService {
  create: (user: User) => Promise<UserEntity>;
  findOneBy: (email: string) => Promise<UserEntity | null>;
}

export const UsersServiceToken = Symbol('UsersService');

export const UsersServiceProvider: Provider<UsersService> = {
  provide: UsersServiceToken,
  useClass: UsersServiceImpl,
};
