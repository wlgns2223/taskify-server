import { Provider } from '@nestjs/common';
import { RefreshToken, RefreshTokenEntity } from '../refresh-token.entity';
import { RefreshTokenRepositoryImpl } from './refresh-token.repositoryImpl';

export interface RefreshTokenRepository {
  create: (refreshToken: RefreshToken) => Promise<RefreshTokenEntity>;
  findOneBy: (userId: number) => Promise<RefreshTokenEntity | null>;
  deleteOneBy: (tokenId: number) => Promise<void>;
  deleteAllBy: (userId: number) => Promise<void>;
}

export const RefreshTokenRepositoryToken = Symbol('RefreshTokenRepository');

export const RefreshTokenRepositoryProvider: Provider<RefreshTokenRepository> = {
  provide: RefreshTokenRepositoryToken,
  useClass: RefreshTokenRepositoryImpl,
};
