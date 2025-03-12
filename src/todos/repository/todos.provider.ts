import { Provider } from '@nestjs/common';
import { Todo, TodoEntity } from '../todos.entity';
import { TodosRepositoryImpl } from './todos.repositoryImpl';
import { OffsetPaginationRequestDto } from '../../dashboard/dto/offsetPagination.dto';

export interface TodosRepository {
  create: (todo: Todo) => Promise<TodoEntity>;
  findManyBy: (columnId: number) => Promise<TodoEntity[]>;
  deleteOneBy: (id: number) => Promise<TodoEntity>;
  findOneBy: (id: number) => Promise<TodoEntity>;
  findManyWithPagination: (
    offsetPaginationRequest: OffsetPaginationRequestDto,
    columnId: number,
  ) => Promise<TodoEntity[]>;
}

export const TodosRepositoryToken = Symbol('TodosRepository');

export const TodosRepositoryProvider: Provider<TodosRepository> = {
  provide: TodosRepositoryToken,
  useClass: TodosRepositoryImpl,
};
