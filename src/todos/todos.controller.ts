import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { appendTeamIdTo } from '../common/utils/routeGenerator';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/createTodo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TokenFromReq } from '../auth/decorators/tokenFromReq.decorator';
import { TokenType } from '../auth/types/type';

@Controller(appendTeamIdTo('todos'))
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imageFile'))
  async createTodo(
    @UploadedFile() file: Express.Multer.File,
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return await this.todosService.createTodo(accessToken, file, createTodoDto);
  }

  @Get()
  async getTodosByColumnId(@Query('columnId') columnId: string) {
    return await this.todosService.getTodosByColumnId(columnId);
  }
}
