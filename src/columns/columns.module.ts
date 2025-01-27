import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsRepositoryProvider } from './repository';
import { ColumnsServiceProvider } from './service';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsRepositoryProvider, ColumnsServiceProvider],
})
export class ColumnsModule {}
