import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepositoryProvider } from './repository/users.repository.provider';
import { UsersServiceProvider } from './service/users.provider';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [UsersRepositoryProvider, UsersServiceProvider],
  controllers: [UsersController],
  exports: [UsersServiceProvider],
})
export class UsersModule {}
