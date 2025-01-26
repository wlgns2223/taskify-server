import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TokenModule } from '../token/token.module';
import { UsersRepositoryProvider } from './repository/users.repository.provider';
import { UsersServiceProvider } from './service/users.provider';

@Module({
  imports: [TokenModule],
  providers: [UsersRepositoryProvider, UsersServiceProvider],
  controllers: [UsersController],
  exports: [UsersServiceProvider],
})
export class UsersModule {}
