import { Body, Controller, Post } from '@nestjs/common';
import { appendTeamIdTo } from '../common/utils/routeGenerator';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/createInvitation.dto';

@Controller(appendTeamIdTo('invitations'))
export class InvitationsController {
  constructor(private invitationService: InvitationsService) {}

  @Post()
  async createInvitation(@Body() newInvitation: CreateInvitationDto) {
    return await this.invitationService.createInvitation(newInvitation);
  }
}
