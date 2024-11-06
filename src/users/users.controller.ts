import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserMapper } from './dto/mapper.user';
import { TokenFromReq } from '../auth/decorators/tokenFromReq.decorator';
import { TokenType } from '../auth/types/type';
import { TokenService } from '../auth/token.service';
import { appendTeamIdTo } from '../common/utils/routeGenerator';

@Controller(appendTeamIdTo('users'))
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  @Get('test')
  async test() {
    return {
      message: 'Hello world',
    };
  }

  @Get()
  async findUserByEmail(@Query('email') email: string) {
    const user = await this.usersService.findUserByEmail(email);
    return UserMapper.toDto(user);
  }

  @Get('me')
  async findMe(@Query('accessToken') accessToken: string) {
    const payload = this.tokenService.decodeToken(accessToken);
    const user = await this.usersService.findUserByEmail(payload.email);
    return UserMapper.toDto(user);
  }
}
