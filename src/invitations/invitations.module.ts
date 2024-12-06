import { Module } from '@nestjs/common';
import { InvitationsController } from './invitations.controller';
import { InvitationsRepository } from './invitations.repository';
import { InvitationsService } from './invitations.service';
import { EmailService } from './email.service';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { MembersRepository } from '../dashboard/members.repository';

@Module({
  imports: [TokenModule, UsersModule],
  controllers: [InvitationsController],
  providers: [InvitationsRepository, InvitationsService, EmailService, MembersRepository],
})
export class InvitationsModule {}
