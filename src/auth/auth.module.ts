import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';
import { CookieConfigService } from './cookie-config.service';
import { TokenConfigService } from './token-config.service';

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, CookieConfigService, TokenConfigService],
  exports: [AuthService],
})
export class AuthModule {}
