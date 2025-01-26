import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Req, Res } from '@nestjs/common';
import { SignUpDto } from '../users/dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CookieOptions, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenFromReq } from './decorators/tokenFromReq.decorator';
import { TokenType } from './types/type';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  private cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    expires: new Date(Date.now() + 1000 * 60 * 10),
  };

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(SignUpDto.from(signUpDto));
  }

  @Post('signIn')
  async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
    const { accessToken, refreshToken } = await this.authService.signIn(signInDto.email, signInDto.password);
    const { accessTokenName, refreshTokenName } = this.getTokenNames();

    const accessTokenCookie = this.getCookiePayload(
      accessTokenName,
      accessToken.token,
      accessToken.expiresTime.timeInMs,
    );
    const refreshTokenCookie = this.getCookiePayload(
      refreshTokenName,
      refreshToken.token,
      refreshToken.expiresTime.timeInMs,
    );

    res.cookie(accessTokenCookie.tokenName, accessTokenCookie.token, accessTokenCookie.cookieOptions);
    res.cookie(refreshTokenCookie.tokenName, refreshTokenCookie.token, refreshTokenCookie.cookieOptions);

    return res.json({ message: 'Successfully signed in' });
  }

  private getCookiePayload(tokenName: string, token: string, expiresIn: number) {
    return {
      tokenName,
      token,
      cookieOptions: {
        ...this.cookieOptions,
        expires: new Date(Date.now() + expiresIn),
      },
    };
  }

  private getTokenNames() {
    const accessTokenName = this.configService.get('ACCESS_TOKEN_NAME');
    const refreshTokenName = this.configService.get('REFRESH_TOKEN_NAME');

    return {
      accessTokenName,
      refreshTokenName,
    };
  }

  @Post('verify')
  async verifyToken(@TokenFromReq(TokenType.ACCESS) accessToken: string, @Res() res: Response) {
    await this.authService.verify(accessToken, TokenType.ACCESS);
    return res.status(HttpStatus.OK).json({ message: 'Valid token' });
  }

  @Get('renew')
  async renewTokens(@TokenFromReq(TokenType.REFRESH) refreshToken: string, @Res() res: Response) {
    const { accessToken, refreshToken: newRefreshToken } = await this.authService.renewToken(refreshToken);

    const { accessTokenName, refreshTokenName } = this.getTokenNames();

    const accessTokenCookie = this.getCookiePayload(
      accessTokenName,
      accessToken.token,
      accessToken.expiresTime.timeInMs,
    );

    const refreshTokenCookie = this.getCookiePayload(
      refreshTokenName,
      newRefreshToken.token,
      newRefreshToken.expiresTime.timeInMs,
    );

    return res.json({
      accessTokenCookie,
      refreshTokenCookie,
    });
  }

  @Get('client-renew')
  async renewTokensFromClient(@TokenFromReq(TokenType.REFRESH) refreshToken: string, @Res() res: Response) {
    const { accessToken, refreshToken: newRefreshToken } = await this.authService.renewToken(refreshToken);

    const { accessTokenName, refreshTokenName } = this.getTokenNames();

    const accessTokenCookie = this.getCookiePayload(
      accessTokenName,
      accessToken.token,
      accessToken.expiresTime.timeInMs,
    );

    const refreshTokenCookie = this.getCookiePayload(
      refreshTokenName,
      newRefreshToken.token,
      newRefreshToken.expiresTime.timeInMs,
    );

    res.cookie(accessTokenCookie.tokenName, accessTokenCookie.token, accessTokenCookie.cookieOptions);
    res.cookie(refreshTokenCookie.tokenName, refreshTokenCookie.token, refreshTokenCookie.cookieOptions);

    return res.json({ message: 'Successfully refreshed' });
  }
}
