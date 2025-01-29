import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDashBoardDto } from './dto/createDashBoard.dto';
import { TokenFromReq } from '../auth/decorators/tokenFromReq.decorator';
import { TokenType } from '../auth/types/type';
import { OffsetPaginationRequestDto } from './dto/offsetPagination.dto';
import { DashboardsService, DashboardsServiceToken } from './service';
import { DashboardMapper } from './dashboard.mapper';

@Controller('dashboards')
export class DashboardsController {
  private logger = new Logger(DashboardsController.name);
  constructor(
    @Inject(DashboardsServiceToken)
    private dashBoardService: DashboardsService,
  ) {}

  @Post()
  async createDashboard(
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
    @Body() createDashBoardDto: CreateDashBoardDto,
  ) {
    const dashboardEntity = await this.dashBoardService.create(createDashBoardDto, accessToken);
    return DashboardMapper.toDTO(dashboardEntity);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getDashboards(
    @Query() paginationQuery: OffsetPaginationRequestDto,
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
  ) {
    const res = await this.dashBoardService.findAllByWithPagination(paginationQuery, accessToken);
    return res;
  }

  @Get(':id')
  async getDashboardById(@Param('id', ParseIntPipe) id: number) {
    return await this.dashBoardService.findOneBy(id);
  }
}
