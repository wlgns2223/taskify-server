import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenRepository, RefreshTokenRepositoryToken } from '../repository/refresh-token.repository.provider';
import { RefreshTokenService } from './refresh-token.service.provider';
import { RefreshTokenMapper } from '../refresh-token.mapper';
import { CreateRefreshTokenDTO } from '../dto/create.dto';

@Injectable()
export class RefreshTokenServiceImpl implements RefreshTokenService {
  constructor(
    @Inject(RefreshTokenRepositoryToken)
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async create(createRefreshTokenDTO: CreateRefreshTokenDTO) {
    const payload = RefreshTokenMapper.toEntity(createRefreshTokenDTO);
    return await this.refreshTokenRepository.create(payload);
  }

  async findOneBy(userId: number) {
    return await this.refreshTokenRepository.findOneBy(userId);
  }

  async deleteOneBy(tokenId: number) {
    return await this.refreshTokenRepository.deleteOneBy(tokenId);
  }

  async deleteAllBy(userId: number) {
    return await this.refreshTokenRepository.deleteAllBy(userId);
  }

  async updateOneBy(tokenId: number, token: string) {
    return await this.refreshTokenRepository.updateOneBy(tokenId, token);
  }
}
