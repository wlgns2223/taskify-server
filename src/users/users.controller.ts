import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

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
    return await this.usersService.findUserByEmail(email);
  }
}
