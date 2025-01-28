import { JwtSignOptions } from '@nestjs/jwt';
import { RefreshToken, RefreshTokenEntity } from '../refresh-token.entity';
import { Provider } from '@nestjs/common';
import { RefreshTokenServiceImpl } from './refresh-token.serviceImpl';

export interface RefreshTokenService {
  create(param: RefreshToken): Promise<RefreshTokenEntity>;
  findOneBy(userId: number): Promise<RefreshTokenEntity | null>;
  deleteOneBy(tokenId: number): Promise<void>;
  deleteAllBy(userId: number): Promise<void>;
  updateOneBy(tokenId: number, token: string): Promise<void>;
}

export const RefreshTokenServiceToken = Symbol('RefreshTokenService');

export const RefreshTokenServiceProvider: Provider<RefreshTokenService> = {
  provide: RefreshTokenServiceToken,
  useClass: RefreshTokenServiceImpl,
};
