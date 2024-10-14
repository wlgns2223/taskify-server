import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenRepository } from '../auth/token.repository';
import { TokenService } from '../auth/token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: 'secret',
      }),
    }),
  ],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
