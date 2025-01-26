import { Controller, Get, Inject, Logger, Query } from '@nestjs/common';
import { TokenService } from '../token/service/refresh-token.serviceImpl';
import { UsersService } from './service/users.provider';
import { UsersRepositoryToken } from './repository';

@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(
    @Inject(UsersRepositoryToken)
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  @Get()
  async findOneBy(@Query('email') email: string) {
    const user = await this.usersService.findOneBy(email);
    return user;
  }

  @Get('me')
  async findMe(@Query('accessToken') accessToken: string) {
    const payload = this.tokenService.decodeToken(accessToken);
    const user = await this.usersService.findOneBy(payload.email);
    return user;
  }
}
