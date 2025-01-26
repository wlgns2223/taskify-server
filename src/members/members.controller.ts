import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get()
  async getMembersByDashboardId(@Query('dashboardId', ParseIntPipe) dashboardId: number) {
    return await this.membersService.getMembersByDashboardId(dashboardId);
  }
}
