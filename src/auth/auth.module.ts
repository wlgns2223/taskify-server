import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

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
})
export class AuthModule {}
