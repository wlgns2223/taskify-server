import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateColumnsDto } from './dto/createColumns.dto';
import { SwapColumnPositionDto } from './dto/swapColumnPosition.dto';
import { ColumnsService, ColumnsServiceProvider, ColumnsServiceToken } from './service';
import { UpdateColumnsDto } from './dto/updateColumns.dto';
import { ColumnsMapper } from './columns.mapper';

@Controller('columns')
export class ColumnsController {
  constructor(
    @Inject(ColumnsServiceToken)
    private columnsService: ColumnsService,
  ) {}

  @Post()
  async createColumn(@Body() createColumnsDto: CreateColumnsDto) {
    const column = await this.columnsService.create(createColumnsDto);
    return ColumnsMapper.toDTO(column);
  }

  @Get()
  async getColumnsByDashboardId(@Query('dashboardId') dashboardId: number) {
    const columns = await this.columnsService.findAllBy(dashboardId);
    return ColumnsMapper.toDTOList(columns);
  }

  @Put('swap/:dashboardId')
  async swapColumnsPosition(
    @Param('dashboardId', ParseIntPipe) dashboardId: number,
    @Body() swapColumnsDto: SwapColumnPositionDto,
  ) {
    const columns = await this.columnsService.swapColumnsPosition(dashboardId, swapColumnsDto);
    return ColumnsMapper.toDTOList(columns);
  }

  @Put(':columnId')
  async updateColumn(@Param('columnId', ParseIntPipe) columnId: number, @Body() columnDto: UpdateColumnsDto) {
    const column = await this.columnsService.updateOneBy(columnId, columnDto);
    return ColumnsMapper.toDTO(column);
  }

  @Delete(':dashboardId/:columnId')
  async deleteAndReorderColumns(
    @Param('dashboardId', ParseIntPipe) dashboardId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
  ) {
    const column = await this.columnsService.deleteOneAndReorder(dashboardId, columnId);
    return ColumnsMapper.toDTO(column);
  }
}
