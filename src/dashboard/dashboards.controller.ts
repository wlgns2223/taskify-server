import { Body, Controller, Logger, Post } from '@nestjs/common';
import { appendTeamIdTo } from '../common/utils/routeGenerator';
import { DashboardsService } from './dashboards.service';
import { CreateDashBoardDto } from './dto/createDashBoardDto';
import { TokenFromReq } from '../auth/decorators/tokenFromReq.decorator';
import { TokenType } from '../auth/types/type';

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
}
