import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
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
    @Query('cursor') cursor: string,
    @Query('limit') limit: string,
    @Query('direction') direction: CursorPaginationDirection,
  ) {
    return await this.dashBoardService.getDashboards(cursor, limit, direction);
  }
}
