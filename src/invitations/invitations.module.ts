import { Module } from '@nestjs/common';
import { InvitationsController } from './invitations.controller';
import { EmailService } from './email.service';
import { UsersModule } from '../users/users.module';
import { MembersModule } from '../members/members.module';
import { AuthModule } from '../auth/auth.module';
import { InvitationsRepositoryProvider } from './repository';
import { InvitationsServiceProvider } from './service';

@Module({
  imports: [AuthModule, UsersModule, MembersModule],
  controllers: [InvitationsController],
  providers: [InvitationsRepositoryProvider, InvitationsServiceProvider, EmailService],
})
export class InvitationsModule {}
