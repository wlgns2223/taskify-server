import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { InvalidInputException } from '../common/exceptions/exceptions';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  async signUp(email: string, nickname: string, password: string) {
    return await this.usersService.createUser(email, nickname, password);
  }

  async signIn(email: string, password: string) {
    const found = await this.usersService.findUserByEmail(email);
    const user = User.from(found);
    const result = user.comparePassword(password);

    if (!result) {
      throw InvalidInputException('Invalid password');
    }
    const accessToken = await this.tokenService.signToken({
      email: user.email,
    });
    const refreshToken = await this.tokenService.signToken(
      { email: user.email },
      '1m',
    );

    return { accessToken, refreshToken };
  }
}
