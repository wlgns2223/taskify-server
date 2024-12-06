import { Injectable } from '@nestjs/common';
import { InvitationsRepository } from './invitations.repository';
import { CreateInvitationDto } from './dto/createInvitation.dto';
import { Invitation, InvitationStatus } from './invitations.model';
import { EmailService } from './email.service';
import { TokenService } from '../auth/token.service';
import { OffsetPaginationResponseDto } from '../dashboard/dto/offsetPagination.dto';
import { UsersService } from '../users/users.service';
import { instanceToPlain } from 'class-transformer';
import { InvitationOffsetPaginationWithSearchRequestDto } from './dto/readhInvitation.dto';
import { DBConnectionService } from '../db/db.service';
import { Member } from '../members/members.model';
import { MembersService } from '../members/members.service';

@Injectable()
export class InvitationsService {
  constructor(
    private invitationRepository: InvitationsRepository,
    private memberService: MembersService,
    private dbService: DBConnectionService,
    private emailService: EmailService,
    private tokenService: TokenService,
    private usersService: UsersService,
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

  async getInvitationsByEmailWithPagination(
    offsetPaginationRequestDto: InvitationOffsetPaginationWithSearchRequestDto,
    accessToken: string,
  ) {
    const decodedToken = this.tokenService.decodeToken(accessToken);
    const user = await this.usersService.findUserByEmail(decodedToken.email);
    const totalNumberOfInvitations = await this.invitationRepository.getTotalNumberOfInvitations(user.email);
    const invitations = await this.invitationRepository.getInvitationsByEmailWithPagination(
      offsetPaginationRequestDto,
      user.email,
    );

    const offsetPaginationResponseDto = new OffsetPaginationResponseDto({
      currentPage: offsetPaginationRequestDto.page,
      data: invitations,
      totalNumberOfData: totalNumberOfInvitations,
      pageSize: offsetPaginationRequestDto.pageSize,
    });

    return instanceToPlain(offsetPaginationResponseDto);
  }

  async updateInvitationStatus(id: number, status: InvitationStatus, accessToken: string) {
    const decodedToken = this.tokenService.decodeToken(accessToken);
    const user = await this.usersService.findUserByEmail(decodedToken.email);
    const queries = async () => {
      const invitation = await this.invitationRepository.updateInvitationStatus(id, status);
      const newMember = new Member(invitation.dashboardId, user.id);
      await this.memberService.createMember(newMember);
      return invitation;
    };
    return await this.dbService.transaction(queries);
  }
}
