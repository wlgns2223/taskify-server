import { Inject, Injectable } from '@nestjs/common';
import { CreateInvitationDto } from '../dto/createInvitation.dto';
import { Invitation, InvitationStatus } from '../invitations.entity';
import { EmailService } from '../email.service';
import { OffsetPaginationResponse, OffsetPaginationResponseDto } from '../../dashboard/dto/offsetPagination.dto';
import { instanceToPlain } from 'class-transformer';
import { InvitationOffsetPaginationWithSearchRequestDto } from '../dto/readhInvitation.dto';
import { DBConnectionService } from '../../db/db.service';
import { InvitationsService } from './invitations.service.provider';
import { InvitationsRepository, InvitationsRepositoryToken } from '../repository';
import { MemberServiceToken, MembersService } from '../../members/service';
import { UsersService, UsersServiceToken } from '../../users/service/users.provider';
import { EntityNotFoundException, InternalServerException } from '../../common/exceptions/exceptions';
import { InvitationsMapper } from '../invitations.mapper';
import { AuthService } from '../../auth/auth.service';
import { OffsetPaginationMapper } from '../../dashboard/dto/offsetPagination.mapper';
import { MembersMapper } from '../../members/members.mapper';
import { DashboardsService, DashboardsServiceToken } from '../../dashboard/service';
import { CreateEmailDTO } from '../dto/createEmail.dto';

@Injectable()
export class InvitationsServiceImpl implements InvitationsService {
  constructor(
    @Inject(InvitationsRepositoryToken)
    private invitationRepository: InvitationsRepository,

    @Inject(MemberServiceToken)
    private memberService: MembersService,

    @Inject(UsersServiceToken)
    private usersService: UsersService,

    @Inject(DashboardsServiceToken)
    private dashboardsService: DashboardsService,

    private authService: AuthService,
    private dbService: DBConnectionService,
    private emailService: EmailService,
  ) {}

  async create(createInvitationDto: CreateInvitationDto) {
    const invitation = InvitationsMapper.toEntity(createInvitationDto);
    const targetDashboard = await this.dashboardsService.findOneBy(invitation.dashboardId);
    const userEntity = await this.usersService.findOneBy(invitation.inviterId);
    if (!userEntity) {
      throw EntityNotFoundException(`User with id ${invitation.inviterId} not found`);
    }

    const creatEmailDTO = CreateEmailDTO.from(invitation.inviteeEmail, targetDashboard.title);

    const res = await this.emailService.sendInvitationEmail(creatEmailDTO);
    if (!res) {
      throw InternalServerException('Failed to send email');
    }
    const invitationEntity = await this.invitationRepository.create(invitation);
    return {
      userEntity,
      invitationEntity,
    };
  }

  async findAllByWithPagination(
    offsetPaginationRequestDto: InvitationOffsetPaginationWithSearchRequestDto,
    accessToken: string,
  ) {
    const decodedToken = this.authService.decode(accessToken);
    const user = await this.usersService.findOneBy(decodedToken.email);
    if (!user) {
      throw EntityNotFoundException(`User with email ${decodedToken.email} not found`);
    }
    const totalNumberOfInvitations = await this.invitationRepository.countAllBy(user.email);
    const invitations = await this.invitationRepository.findAllByWithPagination(offsetPaginationRequestDto, user.email);

    const offsetPaginationResponse: OffsetPaginationResponse<Invitation> = {
      currentPage: offsetPaginationRequestDto.page,
      data: invitations,
      totalNumberOfData: totalNumberOfInvitations,
      pageSize: offsetPaginationRequestDto.pageSize,
    };

    return OffsetPaginationMapper.toResponseDTO(offsetPaginationResponse);
  }

  async updateOneBy(id: number, status: InvitationStatus, accessToken: string) {
    const decodedToken = this.authService.decode(accessToken);
    const user = await this.usersService.findOneBy(decodedToken.email);
    if (!user) {
      throw EntityNotFoundException(`User with email ${decodedToken.email} not found`);
    }

    const queries = async () => {
      const invitation = await this.invitationRepository.updateOneBy(id, status);
      const newMember = MembersMapper.toEntity({ dashboardId: invitation.id!, memberId: user.id! });
      await this.memberService.create(newMember);
      return invitation;
    };
    return await this.dbService.transaction(queries);
  }
}
