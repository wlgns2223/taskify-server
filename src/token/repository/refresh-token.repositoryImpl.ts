import { Injectable, Logger } from '@nestjs/common';
import { DBConnectionService } from '../../db/db.service';
import { RefreshToken, RefreshTokenEntity } from '../refresh-token.entity';
import { RefreshTokenRepository } from './refresh-token.repository.provider';
import { RefreshTokenMapper } from '../refresh-token.mapper';

@Injectable()
export class RefreshTokenRepositoryImpl implements RefreshTokenRepository {
  private logger = new Logger(RefreshTokenRepositoryImpl.name);
  constructor(private dbService: DBConnectionService) {}

  async create(refreshToken: RefreshToken) {
    const query = `
    INSERT INTO refresh_tokens (user_id, token, expires_at) 
    VALUES (?, ?, from_unixtime( ? ))`;

    const result = await this.dbService.insert(query, [
      refreshToken.userId,
      refreshToken.token,
      refreshToken.expiresAt,
    ]);

    const select = `SELECT * FROM refresh_tokens WHERE id = ?`;
    const insertedToken = await this.dbService.select<RefreshToken>(select, [result.insertId]);

    return RefreshTokenMapper.toEntity(insertedToken[0]);
  }

  async findOneBy(userId: number) {
    const query = `SELECT * FROM refresh_tokens WHERE user_id = ?`;
    const result = await this.dbService.select<RefreshToken>(query, [userId]);

    return result.length !== 0 ? RefreshTokenMapper.toEntity(result[0]) : null;
  }

  async deleteOneBy(tokenId: number) {
    const query = `DELETE FROM refresh_tokens WHERE id = ?`;
    await this.dbService.delete(query, [tokenId]);
  }

  async deleteAllBy(userId: number) {
    const query = `DELETE FROM refresh_tokens WHERE user_id = ?`;
    await this.dbService.delete(query, [userId]);
  }
}
