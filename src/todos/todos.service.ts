import { Injectable } from '@nestjs/common';
import { TodosRepository } from './todos.repository';
import { CreateTodoDto } from './dto/createTodo.dto';
import { Todo } from './todos.model';
import { S3Service } from '../aws/s3.service';
import { AuthService } from '../auth/auth.service';
import { TokenType } from '../auth/types/type';

@Injectable()
export class TodosService {
  constructor(
    private s3Service: S3Service,
    private todosRepository: TodosRepository,
    private authService: AuthService,
  ) {}

  async createTodo(accessToken: string, imgFile: Express.Multer.File, createTodoDto: CreateTodoDto) {
    const { email } = await this.authService.verify(accessToken, TokenType.ACCESS);
    const imgS3Url = await this.s3Service.updateOne(imgFile, email);

    const newTodo = Todo.from({ ...createTodoDto, imageUrl: imgS3Url });
    const todo = await this.todosRepository.createTodo(newTodo);
    return todo.toJSON();
  }

  async getTodosByColumnId(columnId: string) {
    return await this.todosRepository.getTodosByColumnId(columnId);
  }
}
