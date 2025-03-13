import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateInvitationDto } from './dto/createInvitation.dto';
import { TokenFromReq } from '../auth/decorators/tokenFromReq.decorator';
import { TokenType } from '../auth/types/type';
import { InvitationOffsetPaginationWithSearchRequestDto } from './dto/readhInvitation.dto';
import { UpdateInvitationDto } from './dto/updateInvitation.dto';
import { InvitationsService, InvitationsServiceToken } from './service';
import { InvitationsMapper } from './invitations.mapper';
import { UserMapper } from '../users/dto/user.mapper';
import { OffsetPaginationResponse } from '../dashboard/dto/offsetPagination.dto';
import { Invitation } from './invitations.entity';
import { OffsetPaginationMapper } from '../dashboard/dto/offsetPagination.mapper';

@Controller('invitations')
export class InvitationsController {
  constructor(
    @Inject(InvitationsServiceToken)
    private invitationService: InvitationsService,
  ) {}

  @Post()
  async createInvitation(@Body() newInvitation: CreateInvitationDto) {
    const { userEntity, invitationEntity } = await this.invitationService.create(newInvitation);
    const userDTO = UserMapper.toDTO(userEntity);
    return InvitationsMapper.toDTO(invitationEntity);
  }

  @Get()
  async getInvitationsByEmailWithPagination(
    @Query() paginationQuery: InvitationOffsetPaginationWithSearchRequestDto,
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
  ) {
    const { invitations, totalNumberOfInvitations } = await this.invitationService.findAllByWithPagination(
      paginationQuery,
      accessToken,
    );
    const offsetPaginationResponse: OffsetPaginationResponse<Invitation> = {
      currentPage: paginationQuery.page,
      data: InvitationsMapper.toDTOList(invitations),
      totalNumberOfData: totalNumberOfInvitations,
      pageSize: paginationQuery.pageSize,
    };
    return OffsetPaginationMapper.toDTO(offsetPaginationResponse);
  }

  @Put(':id')
  async updateInvitationStatus(
    @Param('id', ParseIntPipe) dashboardId: number,
    @Body() body: UpdateInvitationDto,
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
  ) {
    return await this.invitationService.updateOneBy(dashboardId, body.status, accessToken);
  }
}
