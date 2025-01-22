import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/createTodo.dto';
import { Todo, TodoProperties } from './todos.model';
import { AuthService } from '../auth/auth.service';
import { TokenType } from '../auth/types/type';
import { StorageService, StorageServiceToken } from '../storage';
import { S3Params } from '../storage/s3.service';
import { TodosRepository, TodosRepositoryToken } from './repository';
import { TodosService } from './service/todo.provider';

@Injectable()
export class TodosServiceImpl implements TodosService {
  constructor(
    @Inject(StorageServiceToken)
    private storageService: StorageService<S3Params>,

    @Inject(TodosRepositoryToken)
    private todosRepository: TodosRepository,
    private authService: AuthService,
  ) {}

  async create(accessToken: string, createTodoDto: CreateTodoDto, imgFile?: Express.Multer.File) {
    const { email } = await this.authService.verify(accessToken, TokenType.ACCESS);

    const imageUrl = await this.storageService.uploadOne({
      email,
      file: imgFile,
    });

    const properties: TodoProperties = {
      ...createTodoDto,
      imageUrl,
    };
    const newTodo = Todo.from<Todo, TodoProperties>(Todo, properties);
    const todo = await this.todosRepository.create(newTodo);
    return todo.serialize<Todo>();
  }

  async findManyBy(columnId: string) {
    const todos = await this.todosRepository.findManyBy(columnId);

    return todos.map((todo) => todo.serialize<Todo>());
  }
}
