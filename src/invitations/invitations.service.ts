import { Injectable } from '@nestjs/common';
import { InvitationsRepository } from './invitations.repository';
import { CreateInvitationDto } from './dto/createInvitation.dto';
import { Invitation } from './invitations.model';

@Injectable()
export class InvitationsService {
  constructor(private invitationRepository: InvitationsRepository) {}

  async createInvitation(createInvitationDto: CreateInvitationDto) {
    const newInvitation = new Invitation({
      ...createInvitationDto,
    });
    return await this.invitationRepository.createInvitation(newInvitation);
  }
}
