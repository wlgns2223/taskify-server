import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateColumnsDto } from './dto/createColumns.dto';
import { SwapColumnPositionDto } from './dto/swapColumnPosition.dto';
import { ColumnsService, ColumnsServiceProvider, ColumnsServiceToken } from './service';
import { UpdateColumnsDto } from './dto/updateColumns.dto';

@Controller('columns')
export class ColumnsController {
  constructor(
    @Inject(ColumnsServiceToken)
    private columnsService: ColumnsService,
  ) {}

  @Post()
  async createColumn(@Body() createColumnsDto: CreateColumnsDto) {
    return await this.columnsService.create(createColumnsDto);
  }

  @Get()
  async getColumnsByDashboardId(@Query('dashboardId') dashboardId: number) {
    return await this.columnsService.findAllBy(dashboardId);
  }

  @Put('swap/:dashboardId')
  async swapColumnsPosition(
    @Param('dashboardId', ParseIntPipe) dashboardId: number,
    @Body() swapColumnsDto: SwapColumnPositionDto,
  ) {
    return await this.columnsService.swapColumnsPosition(dashboardId, swapColumnsDto);
  }

  @Put(':columnId')
  async updateColumn(@Param('columnId', ParseIntPipe) columnId: number, @Body() columnDto: UpdateColumnsDto) {
    return await this.columnsService.updateOneBy(columnId, columnDto);
  }

  @Delete(':columnId')
  async deleteAndReorderColumns(
    @Param('columnId', ParseIntPipe) columnId: number,
    @Query('dashboardId', ParseIntPipe) dashboardId: number,
  ) {
    return await this.columnsService.deleteOneAndReorder(dashboardId, columnId);
  }
}
