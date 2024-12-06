import { Module } from '@nestjs/common';
import { InvitationsController } from './invitations.controller';
import { InvitationsRepository } from './invitations.repository';
import { InvitationsService } from './invitations.service';
import { EmailService } from './email.service';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { MembersModule } from '../members/members.module';

@Module({
  imports: [TokenModule, UsersModule, MembersModule],
  controllers: [InvitationsController],
  providers: [InvitationsRepository, InvitationsService, EmailService],
})
export class InvitationsModule {}
