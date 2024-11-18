import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { appendTeamIdTo } from '../common/utils/routeGenerator';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/createTodo.dto';

@Controller(appendTeamIdTo('todos'))
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return await this.todosService.createTodo(createTodoDto);
  }

  @Get()
  async getTodosByColumnId(@Query('columnId') columnId: string) {
    return await this.todosService.getTodosByColumnId(columnId);
  }
}
