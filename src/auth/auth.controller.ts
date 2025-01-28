import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Req, Res } from '@nestjs/common';
import { SignUpDto } from '../users/dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Response } from 'express';
import { TokenFromReq } from './decorators/tokenFromReq.decorator';
import { TokenType } from './types/type';
import { CookieConfigService } from './cookie-config.service';
import { UserMapper } from '../users/dto/user.mapper';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private cookieConfigService: CookieConfigService,
  ) {}

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(SignUpDto.from(signUpDto));

    return UserMapper.toDTO(user);
  }

  @Post('signIn')
  async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
    const { accessToken, refreshToken } = await this.authService.signIn(SignInDto.from(signInDto));

    const accessTokenCookie = this.cookieConfigService.getAccessTokenCookieConfig(
      accessToken.token,
      accessToken.expiresInByDate(),
    );

    const refreshTokenCookie = this.cookieConfigService.getRefreshTokenCookieConfig(
      refreshToken.token,
      refreshToken.expiresInByDate(),
    );

    res.cookie(accessTokenCookie.tokenName, accessTokenCookie.value, accessTokenCookie.cookieOptions);
    res.cookie(refreshTokenCookie.tokenName, refreshTokenCookie.value, refreshTokenCookie.cookieOptions);

    return res.json({ message: 'Successfully signed in' });
  }

  @Post('verify')
  async verifyToken(@TokenFromReq(TokenType.ACCESS) accessToken: string, @Res() res: Response) {
    const result = await this.authService.verify(accessToken, TokenType.ACCESS);
    return res.status(HttpStatus.OK).json({ message: 'Valid token' });
  }

  @Get('renew')
  async renewTokens(@TokenFromReq(TokenType.REFRESH) refreshToken: string, @Res() res: Response) {
    const { accessTokenConfig, refreshTokenConfig } = await this.authService.renewToken(refreshToken);

    const accessTokenCookie = this.cookieConfigService.getAccessTokenCookieConfig(
      accessTokenConfig.token,
      accessTokenConfig.expiresInByDate(),
    );

    const refreshTokenCookie = this.cookieConfigService.getRefreshTokenCookieConfig(
      refreshTokenConfig.token,
      refreshTokenConfig.expiresInByDate(),
    );

    return res.json({
      accessTokenCookie,
      refreshTokenCookie,
    });
  }

  @Get('client-renew')
  async renewTokensFromClient(@TokenFromReq(TokenType.REFRESH) refreshToken: string, @Res() res: Response) {
    const { accessTokenConfig, refreshTokenConfig } = await this.authService.renewToken(refreshToken);

    const accessTokenCookie = this.cookieConfigService.getAccessTokenCookieConfig(
      accessTokenConfig.token,
      accessTokenConfig.expiresInByDate(),
    );

    const refreshTokenCookie = this.cookieConfigService.getRefreshTokenCookieConfig(
      refreshTokenConfig.token,
      refreshTokenConfig.expiresInByDate(),
    );

    res.cookie(accessTokenCookie.tokenName, accessTokenCookie.value, accessTokenCookie.cookieOptions);
    res.cookie(refreshTokenCookie.tokenName, refreshTokenCookie.value, refreshTokenCookie.cookieOptions);

    return res.json({ message: 'Successfully refreshed' });
  }
}
