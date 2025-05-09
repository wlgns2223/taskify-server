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
import { OffsetPaginationRequestDto, OffsetPaginationResponse } from '../dashboard/dto/offsetPagination.dto';
import { OffsetPaginationMapper } from '../dashboard/dto/offsetPagination.mapper';
import { TodoDTO } from './dto/todo.dto';

@Controller('todos')
export class TodosController {
  constructor(
    @Inject(TodoServiceToken)
    private todosService: TodosService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createTodo(
    @TokenFromReq(TokenType.ACCESS) accessToken: string,
    @Body() createTodoDto: CreateTodoDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const todo = await this.todosService.create(accessToken, createTodoDto, image);
    return TodoMapper.toDTO(todo);
  }

  @Get(':id')
  async findOneBy(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todosService.findOneBy(id);
    return !!todo ? TodoMapper.toDTO(todo) : todo;
  }

  @Get()
  async getTodosByColumnId(@Query('columnId', ParseIntPipe) columnId: number) {
    const todos = await this.todosService.findManyBy(columnId);
    return TodoMapper.toDTOList(todos);
  }

  @Delete(':id')
  async deleteOneBy(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todosService.deleteOneBy(id);
    return TodoMapper.toDTO(todo);
  }

  @Get('/column/:columnId/pagination')
  async getTodosWithPagination(
    @Param('columnId', ParseIntPipe) columnId: number,
    @Query() offsetPaginationRequestDto: OffsetPaginationRequestDto,
  ) {
    const { totalNumberOfTodos, todos } = await this.todosService.findManyWithPagination(
      offsetPaginationRequestDto,
      columnId,
    );
    const offsetPaginationResponse: OffsetPaginationResponse<TodoDTO> = {
      currentPage: offsetPaginationRequestDto.page,
      data: TodoMapper.toDTOList(todos),
      totalNumberOfData: totalNumberOfTodos,
      pageSize: offsetPaginationRequestDto.pageSize,
    };
    return OffsetPaginationMapper.toDTO(offsetPaginationResponse);
  }
}
