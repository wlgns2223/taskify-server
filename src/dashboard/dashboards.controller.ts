import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { appendTeamIdTo } from '../common/utils/routeGenerator';
import { DashboardsService } from './dashboards.service';
import { CreateDashBoardDto } from './dto/createDashBoard.dto';
import { TokenFromReq } from '../auth/decorators/tokenFromReq.decorator';
import { TokenType } from '../auth/types/type';
import { CursorPaginationDirection } from './dashboards.repository';

@Controller(appendTeamIdTo('dashboards'))
export class DashboardsController {
  private logger = new Logger(DashboardsController.name);
  constructor(private dashBoardService: DashboardsService) {}

  @Post()
  async createDashboard(
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
    @Body() createDashBoardDto: CreateDashBoardDto,
  ) {
    return await this.dashBoardService.createDashboard(createDashBoardDto.title, createDashBoardDto.color, accessToken);
  }

  @Get()
  async getDashboards(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
  ) {
    const res = await this.dashBoardService.getDashboards(
      { page: parseInt(page, 10), pageSize: parseInt(pageSize, 10) },
      accessToken,
    );
    return res;
  }

  @Get(':id')
  async getDashboardById(@Param('id') id: string) {
    return await this.dashBoardService.getDashboardById(parseInt(id, 10));
  }
}
