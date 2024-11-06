import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsRepository } from './columns.repository';
import { ColumnsService } from './columns.service';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsRepository, ColumnsService],
})
export class ColumnsModule {}
