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
    return InvitationsMapper.toDTO(invitationEntity, userDTO);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getInvitationsByEmailWithPagination(
    @Query() paginationQuery: InvitationOffsetPaginationWithSearchRequestDto,
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
  ) {
    return await this.invitationService.findAllByWithPagination(paginationQuery, accessToken);
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
