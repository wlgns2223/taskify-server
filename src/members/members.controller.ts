import { Controller, Get, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { MemberServiceToken, MembersService } from './service';
import { MembersMapper } from './members.mapper';

@Controller('members')
export class MembersController {
  constructor(
    @Inject(MemberServiceToken)
    private membersService: MembersService,
  ) {}

  @Get()
  async getMembersByDashboardId(@Query('dashboardId', ParseIntPipe) dashboardId: number) {
    const members = await this.membersService.findAllBy(dashboardId);
    return MembersMapper.toDTOList(members);
  }
}
