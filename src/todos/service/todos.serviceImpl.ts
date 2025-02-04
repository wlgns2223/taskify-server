import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../dto/createTodo.dto';
import { AuthService } from '../../auth/auth.service';
import { TokenType } from '../../auth/types/type';
import { StorageService, StorageServiceToken } from '../../storage';
import { S3Params } from '../../storage/s3.service';
import { TodosRepository, TodosRepositoryToken } from '../repository';
import { TodosService } from './todo.provider';
import { TodoMapper } from '../dto/todo.mapper';

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
    const todoEntity = TodoMapper.toEntity(createTodoDto);
    if (!!imgFile) {
      const imageUrl = await this.storageService.uploadOne({
        email,
        file: imgFile,
      });
      todoEntity.imageUrl = imageUrl;
    }

    return await this.todosRepository.create(todoEntity);
  }

  async findManyBy(columnId: number) {
    return await this.todosRepository.findManyBy(columnId);
  }

  async deleteOneBy(id: number) {
    return await this.todosRepository.deleteOneBy(id);
  }
}
