import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { appendTeamIdTo } from '../common/utils/routeGenerator';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/createTodo.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller(appendTeamIdTo('todos'))
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imageFile'))
  async createTodo(@UploadedFile() file: Express.Multer.File, @Body() createTodoDto: CreateTodoDto) {
    // return await this.todosService.createTodo(createTodoDto);
    console.log({ file, createTodoDto });

    return '1';
  }

  @Get()
  async getTodosByColumnId(@Query('columnId') columnId: string) {
    return await this.todosService.getTodosByColumnId(columnId);
  }
}
