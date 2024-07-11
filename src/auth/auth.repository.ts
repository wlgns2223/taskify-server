import { Injectable, Logger } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { RefreshToken } from './refresh-token.model';

@Injectable()
export class AuthRepository {
  private logger = new Logger(AuthRepository.name);
  constructor(private dbService: DBConnectionService) {}

  async saveRefreshToken(refreshToken: RefreshToken) {
    const query = `INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)`;
    await this.dbService.insert(query, [
      refreshToken.userId,
      refreshToken.token,
      refreshToken.expiresAt,
    ]);
  }
}
