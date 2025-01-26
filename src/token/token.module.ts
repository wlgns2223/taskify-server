import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenRepositoryProvider } from './repository/refresh-token.repository.provider';
import { RefreshTokenServiceProvider } from './service/refresh-token.service.provider';

@Module({
  imports: [],
  providers: [RefreshTokenServiceProvider, RefreshTokenRepositoryProvider],
  exports: [RefreshTokenServiceProvider],
})
export class RefreshTokenModule {}
