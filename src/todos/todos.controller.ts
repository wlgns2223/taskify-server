import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/createTodo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TokenFromReq } from '../auth/decorators/tokenFromReq.decorator';
import { TokenType } from '../auth/types/type';
import { TodoServiceToken, TodosService } from './service/todo.provider';
import { TodoMapper } from './dto/todo.mapper';

@Controller('todos')
export class TodosController {
  constructor(
    @Inject(TodoServiceToken)
    private todosService: TodosService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('imageFile'))
  async createTodo(
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
    @Body() createTodoDto: CreateTodoDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const todo = await this.todosService.create(accessToken, createTodoDto, file);
    return TodoMapper.toDTO(todo);
  }

  @Get()
  async getTodosByColumnId(@Query('columnId', ParseIntPipe) columnId: number) {
    return await this.todosService.findManyBy(columnId);
  }

  @Delete(':id')
  async deleteOneBy(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todosService.deleteOneBy(id);
    return TodoMapper.toDTO(todo);
  }
}
