import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateTodoDto } from './dto/createTodo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TokenFromReq } from '../auth/decorators/tokenFromReq.decorator';
import { TokenType } from '../auth/types/type';
import { TodosService } from './service/todo.provider';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imageFile'))
  async createTodo(
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
    @Body() createTodoDto: CreateTodoDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.todosService.create(accessToken, createTodoDto, file);
  }

  @Get()
  async getTodosByColumnId(@Query('columnId') columnId: string) {
    return await this.todosService.findManyBy(columnId);
  }
}
