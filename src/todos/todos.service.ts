import { Injectable } from '@nestjs/common';
import { TodosRepository } from './todos.repository';
import { CreateTodoDto } from './dto/createTodo.dto';
import { Todo } from './todos.model';
import { S3Service } from '../aws/s3.service';

@Injectable()
export class TodosService {
  constructor(
    private s3Service: S3Service,
    private todosRepository: TodosRepository,
  ) {}

  async createTodo(imgFile: Express.Multer.File, createTodoDto: CreateTodoDto) {
    const param = {
      file: imgFile,
      folderName: 'todo-images',
      todoId: '1',
      userEmail: 'userEmail',
    };
    const imgS3Url = await this.s3Service.updateOne(param);
    const newTodo = new Todo({
      ...createTodoDto,
      imageUrl: imgS3Url,
    });
    const plainTodo = await this.todosRepository.createTodo(newTodo);
    const todo = new Todo(plainTodo);
    return todo.toJSON();
  }

  async getTodosByColumnId(columnId: string) {
    return await this.todosRepository.getTodosByColumnId(columnId);
  }
}
