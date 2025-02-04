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
  UseInterceptors,
} from '@nestjs/common';
import { CreateDashBoardDto } from './dto/createDashBoard.dto';
import { TokenFromReq } from '../auth/decorators/tokenFromReq.decorator';
import { TokenType } from '../auth/types/type';
import { OffsetPaginationRequestDto } from './dto/offsetPagination.dto';
import { DashboardsService, DashboardsServiceToken } from './service';
import { DashboardMapper } from './dashboard.mapper';
import { OffsetPaginationMapper } from './dto/offsetPagination.mapper';
import { LoggingInterceptor } from '../common/interceptors/log.interceptor';

@Controller('dashboards')
// @UseInterceptors(LoggingInterceptor)
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
  async getDashboards(
    @Query() paginationQuery: OffsetPaginationRequestDto,
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
  ) {
    const res = await this.dashBoardService.findAllByWithPagination(paginationQuery, accessToken);
    return OffsetPaginationMapper.toResponseDTO(res);
  }

  @Get(':id')
  async getDashboardById(@Param('id', ParseIntPipe) id: number) {
    const dashboard = await this.dashBoardService.findOneBy(id);
    return DashboardMapper.toDTO(dashboard);
  }
}
