import { Module } from '@nestjs/common';
import { TagServiceProvider } from './service';
import { TodoTagRepositoryProvider } from './todo-tags/repository';
import { TagRepositoryProvider } from './repository';
import { TodoTagServiceProvider } from './todo-tags/service';

@Module({
  imports: [],
  controllers: [],
  providers: [TagServiceProvider, TodoTagServiceProvider, TagRepositoryProvider, TodoTagRepositoryProvider],
  exports: [TagServiceProvider, TodoTagServiceProvider],
})
export class TagModule {}
