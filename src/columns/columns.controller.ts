import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { appendTeamIdTo } from '../common/utils/routeGenerator';
import { ColumnsService } from './columns.service';
import { CreateColumnsDto } from './dto/createColumns.dto';
import { SwapColumnPositionDto } from './dto/swapColumnPosition.dto';

@Controller(appendTeamIdTo('columns'))
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @Post()
  async createColumn(@Body() createColumnsDto: CreateColumnsDto) {
    return await this.columnsService.createColumn(createColumnsDto);
  }

  @Get()
  async getColumnsByDashboardId(@Query('dashboardId') dashboardId: number) {
    return await this.columnsService.getColumnsByDashboardId(dashboardId);
  }

  @Put('swap/:dashboardId')
  async swapColumnsPosition(@Param('dashboardId') dashboardId: string, @Body() swapColumnsDto: SwapColumnPositionDto) {
    return await this.columnsService.swapColumnsPosition(
      parseInt(dashboardId, 10),
      swapColumnsDto.from,
      swapColumnsDto.to,
    );
  }
}
