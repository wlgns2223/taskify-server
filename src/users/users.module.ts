import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TokenModule } from '../token/token.module';
import { UsersRepositoryProvider } from './repository/users.repository.provider';

@Module({
  imports: [TokenModule],
  providers: [UsersRepositoryProvider, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
