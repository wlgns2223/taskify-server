import { Body, Controller, Logger, Post } from '@nestjs/common';
import { SignUpDto } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';

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

  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto) {
    const tokens = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    return tokens;
  }
}
