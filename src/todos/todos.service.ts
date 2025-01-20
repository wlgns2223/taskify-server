import { Inject, Injectable } from '@nestjs/common';
import { TodosRepository } from './todos.repository';
import { CreateTodoDto } from './dto/createTodo.dto';
import { Todo } from './todos.model';
import { AuthService } from '../auth/auth.service';
import { TokenType } from '../auth/types/type';
import { StorageService, StorageServiceToken } from '../storage';
import { S3Params } from '../storage/s3.service';

@Injectable()
export class TodosService {
  constructor(
    @Inject(StorageServiceToken)
    private storageService: StorageService<S3Params>,
    private todosRepository: TodosRepository,
    private authService: AuthService,
  ) {}

  async createTodo(accessToken: string, imgFile: Express.Multer.File, createTodoDto: CreateTodoDto) {
    const { email } = await this.authService.verify(accessToken, TokenType.ACCESS);
    const imgS3Url = await this.storageService.uploadOne({
      email,
      file: imgFile,
    });

    const newTodo = Todo.from({ ...createTodoDto, imageUrl: imgS3Url });
    const todo = await this.todosRepository.createTodo(newTodo);
    return todo.toJSON();
  }

  async getTodosByColumnId(columnId: string) {
    return await this.todosRepository.getTodosByColumnId(columnId);
  }
}
