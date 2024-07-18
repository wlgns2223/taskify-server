import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { SignUpDto } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CookieOptions, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  private cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
  };

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(
      signUpDto.email,
      signUpDto.nickname,
      signUpDto.password,
    );
  }

  @Post('signIn')
  async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
    const tokens = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    const { accessTokenName, refreshTokenName } = this.getTokenNames();

    this.setCookie(res, accessTokenName, tokens.refreshToken);
    this.setCookie(res, refreshTokenName, tokens.refreshToken);

    return res.json({ message: 'Successfully signed in' });
  }

  private setCookie(res: Response, tokenName: string, token: string) {
    res.cookie(tokenName, token, this.cookieOptions);
  }

  private getTokenNames() {
    const accessTokenName = this.configService.get('ACCESS_TOKEN_NAME');
    const refreshTokenName = this.configService.get('REFRESH_TOKEN_NAME');

    return {
      accessTokenName,
      refreshTokenName,
    };
  }
}
