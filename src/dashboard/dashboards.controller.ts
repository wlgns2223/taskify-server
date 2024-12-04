import { Body, Controller, Get, Logger, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { appendTeamIdTo } from '../common/utils/routeGenerator';
import { DashboardsService } from './dashboards.service';
import { CreateDashBoardDto } from './dto/createDashBoard.dto';
import { TokenFromReq } from '../auth/decorators/tokenFromReq.decorator';
import { TokenType } from '../auth/types/type';
import { OffsetPaginationRequestDto } from './dto/offsetPagination.dto';

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
  @UsePipes(new ValidationPipe({ transform: true }))
  async getDashboards(
    @Query() paginationQuery: OffsetPaginationRequestDto,
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
  ) {
    const res = await this.dashBoardService.getDashboards(paginationQuery, accessToken);
    return res;
  }

  @Get(':id')
  async getDashboardById(@Param('id') id: string) {
    return await this.dashBoardService.getDashboardById(parseInt(id, 10));
  }
}
