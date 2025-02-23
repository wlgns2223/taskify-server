import { Controller, Get, Inject, Logger, Query } from '@nestjs/common';
import { UsersService } from './service/users.provider';
import { UsersRepositoryToken } from './repository';
import { AuthService } from '../auth/auth.service';
import { UserMapper } from './dto/user.mapper';
import { TokenFromReq } from '../auth/decorators/tokenFromReq.decorator';
import { TokenType } from '../auth/types/type';

@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(
    @Inject(UsersRepositoryToken)
    private usersService: UsersService,

    private readonly authService: AuthService,
  ) {}

  @Get()
  async findOneBy(@Query('email') email: string) {
    const user = await this.usersService.findOneBy(email);
    return UserMapper.toDTO(user);
  }

  @Get('me')
  async findMe(@TokenFromReq(TokenType.ACCESS) accessToken: string) {
    const payload = this.authService.decode(accessToken);
    const user = await this.usersService.findOneBy(payload.email);
    return UserMapper.toDTO(user);
  }
}
