import { Controller, Get, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { MemberServiceToken, MembersService } from './service';

@Controller('members')
export class MembersController {
  constructor(
    @Inject(MemberServiceToken)
    private membersService: MembersService,
  ) {}

  @Get()
  async getMembersByDashboardId(@Query('dashboardId', ParseIntPipe) dashboardId: number) {
    return await this.membersService.findAllBy(dashboardId);
  }
}
