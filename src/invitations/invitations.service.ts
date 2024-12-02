import { Injectable } from '@nestjs/common';
import { InvitationsRepository } from './invitations.repository';
import { CreateInvitationDto } from './dto/createInvitation.dto';
import { Invitation } from './invitations.model';
import { EmailService } from './email.service';
import { TokenService } from '../auth/token.service';

@Injectable()
export class InvitationsService {
  constructor(
    private invitationRepository: InvitationsRepository,
    private emailService: EmailService,
    private tokenService: TokenService,
  ) {}

  async createInvitation(createInvitationDto: CreateInvitationDto) {
    const newInvitation = new Invitation({
      ...createInvitationDto,
    });

    const res = await this.emailService.sendInvitationEmail(
      createInvitationDto.inviteeEmail,
      createInvitationDto.title,
    );
    if (!res) {
      throw new Error('Failed to send email');
    }
    return await this.invitationRepository.createInvitation(newInvitation);
  }

  async getInvitationsByEmail(accessToken: string) {
    const decodedToken = this.tokenService.decodeToken(accessToken);
    return await this.invitationRepository.getInvitationsByEmail(decodedToken.email);
  }
}
