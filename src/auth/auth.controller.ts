import {
  Body,
  Controller,
  Logger,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(
      signUpDto.email,
      signUpDto.nickname,
      signUpDto.password,
    );
  }

  @Post('signin')
  async signIn() {
    return {
      message: 'sign in',
    };
  }
}
