import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return await this.usersService.createUser(
      createUserDto.email,
      createUserDto.nickname,
      createUserDto.password,
    );
  }
}
