import { Injectable, Logger } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { RefreshToken } from './refresh-token.model';

@Injectable()
export class TokenRepository {
  private logger = new Logger(TokenRepository.name);
  constructor(private dbService: DBConnectionService) {}

  async saveRefreshToken(refreshToken: RefreshToken) {
    const query = `
    INSERT INTO refresh_tokens (user_id, token, expires_at) 
    VALUES (?, ?, from_unixtime( ? ))`;

    const result = await this.dbService.insert(query, [
      refreshToken.userId,
      refreshToken.token,
      refreshToken.expiresAt,
    ]);

    const select = `SELECT * FROM refresh_tokens WHERE id = ?`;
    const insertedToken = await this.dbService.select<RefreshToken>(select, [
      result.insertId,
    ]);

    return insertedToken[0];
  }

  async findRefreshToken(userId: number) {
    const query = `SELECT * FROM refresh_tokens WHERE user_id = ?`;
    const tokens = await this.dbService.select<RefreshToken>(query, [userId]);

    return tokens;
  }

  async deleteRefreshToken(tokenId: number) {
    const query = `DELETE FROM refresh_tokens WHERE id = ?`;
    await this.dbService.delete(query, [tokenId]);
  }

  async deleteAllRefreshTokens(userId: number) {
    const query = `DELETE FROM refresh_tokens WHERE user_id = ?`;
    await this.dbService.delete(query, [userId]);
  }
}
