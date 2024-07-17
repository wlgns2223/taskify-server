import { Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { JwtService } from '@nestjs/jwt';

type TokenPayload = {
  email: string;
};

@Injectable()
export class TokenService {
  constructor(
    private tokenRepository: TokenRepository,
    private jwtService: JwtService,
  ) {}

  async signToken(payload: TokenPayload, expiresIn: string = '10s') {
    return await this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }
}
