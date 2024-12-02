import { Body, Controller, Get, Post } from '@nestjs/common';
import { appendTeamIdTo } from '../common/utils/routeGenerator';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/createInvitation.dto';
import { TokenFromReq } from '../auth/decorators/tokenFromReq.decorator';
import { TokenType } from '../auth/types/type';

@Controller(appendTeamIdTo('invitations'))
export class InvitationsController {
  constructor(private invitationService: InvitationsService) {}

  @Post()
  async createInvitation(@Body() newInvitation: CreateInvitationDto) {
    return await this.invitationService.createInvitation(newInvitation);
  }

  @Get()
  async getInvitationsByEmail(@TokenFromReq(TokenType.ACCESS) accessToken: string) {
    return await this.invitationService.getInvitationsByEmail(accessToken);
  }
}
