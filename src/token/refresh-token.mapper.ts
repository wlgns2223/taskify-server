import { RefreshToken, RefreshTokenEntity } from './refresh-token.entity';

export class RefreshTokenMapper {
  static toEntity(plain: RefreshToken): RefreshTokenEntity {
    return RefreshTokenEntity.from<RefreshTokenEntity, RefreshToken>(RefreshTokenEntity, plain);
  }
}
