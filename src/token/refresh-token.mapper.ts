import { RefreshToken, RefreshTokenEntity } from './refresh-token.entity';

export class RefreshTokenMapper {
  static toEntity(plain: RefreshToken): RefreshTokenEntity {
    if (plain instanceof RefreshTokenEntity) {
      return plain;
    }

    return RefreshTokenEntity.from<RefreshTokenEntity, RefreshToken>(RefreshTokenEntity, plain);
  }
}
