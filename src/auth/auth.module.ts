import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { CookieConfigService } from './cookie-config.service';
import { TokenConfigService } from './token-config.service';
import { RefreshTokenModule } from '../token/token.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    RefreshTokenModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: 'secret',
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CookieConfigService, TokenConfigService],
  exports: [AuthService],
})
export class AuthModule {}
