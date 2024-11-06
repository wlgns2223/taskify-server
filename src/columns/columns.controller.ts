import { Body, Controller, Post } from '@nestjs/common';
import { appendTeamIdTo } from '../common/utils/routeGenerator';
import { ColumnsService } from './columns.service';
import { CreateColumnsDto } from './dto/createColumns.dto';

@Controller(appendTeamIdTo('columns'))
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @Post()
  async createColumn(@Body() createColumnsDto: CreateColumnsDto) {
    return await this.columnsService.createColumn(createColumnsDto);
  }
}
