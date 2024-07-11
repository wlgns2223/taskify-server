import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private authRepository: AuthRepository,
  ) {}

  async signUp(email: string, nickname: string, password: string) {
    return await this.usersService.createUser(email, nickname, password);
  }
}
