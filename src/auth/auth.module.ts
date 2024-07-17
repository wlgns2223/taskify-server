import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { TokenRepository } from './token.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: 'secret',
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, TokenRepository],
})
export class AuthModule {}
