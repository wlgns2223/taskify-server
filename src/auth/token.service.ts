import { Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './refresh-token.model';

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

  async signAccessToken(email: string) {
    return await this.signToken({ email }, '10s');
  }

  async signRefreshToken(email: string) {
    return await this.signToken(
      {
        email,
      },
      '10m',
    );
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
}
