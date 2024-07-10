import {
  Controller,
  Logger,
  NotImplementedException,
  Post,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  @Post('signup')
  async signUp() {
    throw new NotImplementedException('Sign up is not implemented');
  }

  @Post('signin')
  async signIn() {
    return {
      message: 'sign in',
    };
  }
}
