import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  providers: [TodosRepository, TodosService],
})
export class TodosModule {}
