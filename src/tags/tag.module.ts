import { Module } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { TodoTagRepository } from './todo-tags.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [TagRepository, TodoTagRepository],
})
export class TagModule {}
