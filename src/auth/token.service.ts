import { Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './refresh-token.model';
import { Token } from './vo/token';

type TokenPayload = {
  email: string;
};

export type VerifiedTokenPayLoad = {
  email: string;
  iat: number;
  exp: number;
};

@Injectable()
export class TokenService {
  constructor(
    private tokenRepository: TokenRepository,
    private jwtService: JwtService,
  ) {}

  async getSignedToken(email: string, token: Token) {
    const jwtToken = await this.signToken(
      {
        email,
      },
      token.expiresTime.timeInSec,
    );
    token.token = jwtToken;
    return token;
  }

  private async signToken(payload: TokenPayload, expiresIn: string) {
    return await this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }

  async saveRefreshToken(userId: number, refreshToken: string) {
    const verified = await this.verifyToken(refreshToken);
    const payload = new RefreshToken(
      userId,
      refreshToken,
      verified.exp.toString(),
    );
    return await this.tokenRepository.saveRefreshToken(payload);
  }

  async verifyToken(token: string): Promise<VerifiedTokenPayLoad> {
    return await this.jwtService.verifyAsync(token);
  }

  async findRefreshToken(userId: number): Promise<RefreshToken | null> {
    const token = await this.tokenRepository.findRefreshToken(userId);
    if (token.length === 0) {
      return null;
    }
    return token[0];
  }

  async deleteStoredRefreshToken(tokenId: number) {
    return await this.tokenRepository.deleteRefreshToken(tokenId);
  }

  async deleteAllStoredRefreshTokens(userId: number) {
    return await this.tokenRepository.deleteAllRefreshTokens(userId);
  }
}
