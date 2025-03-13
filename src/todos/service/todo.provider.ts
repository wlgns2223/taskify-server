import { Provider } from '@nestjs/common';
import { PlainOf } from '../../common/types';
import { CreateTodoDto } from '../dto/createTodo.dto';
import { Todo, TodoEntity } from '../todos.entity';
import { TodosServiceImpl } from './todos.serviceImpl';
import { OffsetPaginationRequestDto } from '../../dashboard/dto/offsetPagination.dto';

export interface TodosService {
  create(accessToken: string, createTodoDto: CreateTodoDto, imgFile?: Express.Multer.File): Promise<TodoEntity>;
  findManyBy(columnId: number): Promise<TodoEntity[]>;
  findOneBy(id: number): Promise<TodoEntity>;
  deleteOneBy(id: number): Promise<TodoEntity>;
  findManyWithPagination: (
    offsetPaginationRequest: OffsetPaginationRequestDto,
    columnId: number,
  ) => Promise<{
    totalNumberOfTodos: number;
    todos: TodoEntity[];
  }>;
}

export const TodoServiceToken = Symbol('TodoService');

export const TodoServiceProvider: Provider<TodosService> = {
  provide: TodoServiceToken,
  useClass: TodosServiceImpl,
};
