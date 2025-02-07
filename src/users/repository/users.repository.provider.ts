import { Provider } from '@nestjs/common';
import { User, UserEntity } from '../users.entity';
import { Email, Id, UsersRepositoryImpl } from './users.repositoryImpl';

export interface UsersRepository {
  create: (user: User) => Promise<UserEntity>;
  findManyBy: (email: string) => Promise<UserEntity[]>;
  findOneBy: (identifier: Email | Id) => Promise<UserEntity | null>;
}

export const UsersRepositoryToken = Symbol('UsersRepository');

export const UsersRepositoryProvider: Provider<UsersRepository> = {
  provide: UsersRepositoryToken,
  useClass: UsersRepositoryImpl,
};
