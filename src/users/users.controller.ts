import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(
      createUserDto.email,
      createUserDto.nickname,
      createUserDto.password,
    );
  }

  @Get(':email')
  async findUserByEmail(@Param('email') email: string) {
    const user = await this.usersService.findUserByEmail(email);
    return UserDto.serialize(user);
  }
}