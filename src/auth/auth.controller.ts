import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { SignUpDto } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CookieOptions, Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenFromReq } from './decorators/tokenFromReq.decorator';
import { TokenType } from './types/type';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  private cookieOptions: CookieOptions = {
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
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

    this.setCookie(res, accessTokenName, tokens.accessToken);
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

  @Post('verify')
  async verifyToken(
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
    @Res() res: Response,
  ) {
    await this.authService.verify(accessToken, TokenType.ACCESS);
    return res.status(HttpStatus.OK).json({ message: 'Valid token' });
  }

  @Post('refresh')
  async renewToken(
    @TokenFromReq(TokenType.REFRESH) refreshToken: string,
    @Res() res: Response,
  ) {
    // const { email } = await this.authService.verify(
    //   refreshToken,
    //   TokenType.REFRESH,
    // );

    return res.json({ message: 'Successfully renewed' });
  }

  @Post('cookie-delete')
  async deleteCookie(@Res() res: Response) {
    const { accessTokenName, refreshTokenName } = this.getTokenNames();
    res.clearCookie(accessTokenName);
    res.clearCookie(refreshTokenName);
    return res.json({ message: 'Successfully deleted' });
  }
}
