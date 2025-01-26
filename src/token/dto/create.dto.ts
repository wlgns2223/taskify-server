import { RefreshToken } from '../refresh-token.entity';

export class CreateRefreshTokenDTO implements RefreshToken {
  userId: number;
  token: string;
  expiresAt: number;
}
