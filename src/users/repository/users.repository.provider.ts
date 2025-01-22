import { Provider } from '@nestjs/common';
import { User } from '../users.model';
import { UsersRepositoryImpl } from './users.repositoryImpl';

export interface UsersRepository {
  create: (user: User) => Promise<User>;
  findManyBy: (email: string) => Promise<User[]>;
  findOneBy: (email: string) => Promise<User | null>;
}

export const UsersRepositoryToken = Symbol('UsersRepository');

export const UsersRepositoryProvider: Provider<UsersRepository> = {
  provide: UsersRepositoryToken,
  useClass: UsersRepositoryImpl,
};
