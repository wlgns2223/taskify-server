import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserMapper } from './dto/mapper.user';

@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private usersService: UsersService) {}

  @Get('test')
  async test() {
    return {
      message: 'Hello world',
    };
  }

  @Get(':email')
  async findUserByEmail(@Param('email') email: string) {
    const user = await this.usersService.findUserByEmail(email);
    return UserMapper.toDto(user);
  }
}
