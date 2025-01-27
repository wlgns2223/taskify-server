import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersRepositoryProvider } from './repository';
import { MemberServiceProvider } from './service';

@Module({
  imports: [],
  controllers: [MembersController],
  providers: [MembersRepositoryProvider, MemberServiceProvider],
  exports: [MemberServiceProvider],
})
export class MembersModule {}
