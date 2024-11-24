import { Module } from '@nestjs/common';
import { InvitationsController } from './invitations.controller';
import { InvitationsRepository } from './invitations.repository';
import { InvitationsService } from './invitations.service';

@Module({
  controllers: [InvitationsController],
  providers: [InvitationsRepository, InvitationsService],
})
export class InvitationsModule {}
