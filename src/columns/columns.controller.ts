import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnsDto } from './dto/createColumns.dto';
import { SwapColumnPositionDto } from './dto/swapColumnPosition.dto';
import { UpdateColumnsDto } from './dto/updateColumns.dto';
import { Column } from './columns.model';

@Controller('columns')
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

  @Put(':columnId')
  async updateColumn(@Param('columnId') columnId: string, @Body() columnDto: Column) {
    return await this.columnsService.updateColumn(columnId, columnDto);
  }

  @Delete(':columnId')
  async deleteAndReorderColumns(@Param('columnId') columnId: string, @Query('dashboardId') dashboardId: number) {
    return await this.columnsService.deleteAndReorderColumns(dashboardId, parseInt(columnId, 10));
  }
}
