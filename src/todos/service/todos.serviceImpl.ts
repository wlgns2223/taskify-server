import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../dto/createTodo.dto';
import { AuthService } from '../../auth/auth.service';
import { TokenType } from '../../auth/types/type';
import { StorageService, StorageServiceToken } from '../../storage';
import { S3Params } from '../../storage/s3.service';
import { TodosRepository, TodosRepositoryToken } from '../repository';
import { TodosService } from './todo.provider';
import { TodoMapper } from '../dto/todo.mapper';
import { TagMapper } from '../../tags/tag.mapper';
import { TagManagerService, TagManagerServiceToken } from '../../tags/tag-manager.provider';

@Injectable()
export class TodosServiceImpl implements TodosService {
  constructor(
    @Inject(StorageServiceToken)
    private storageService: StorageService<S3Params>,

    @Inject(TodosRepositoryToken)
    private todosRepository: TodosRepository,

    @Inject(TagManagerServiceToken)
    private tagManagerService: TagManagerService,

    private authService: AuthService,
  ) {}

  async create(accessToken: string, createTodoDto: CreateTodoDto, imgFile?: Express.Multer.File) {
    const { email } = await this.authService.verify(accessToken, TokenType.ACCESS);
    const tagEntityList = TagMapper.toEntityList(createTodoDto.tags.map((tag) => ({ tag })));

    const todoEntity = TodoMapper.toEntity({ ...createTodoDto, tags: tagEntityList });
    if (!!imgFile) {
      const imageUrl = await this.storageService.uploadOne({
        email,
        file: imgFile,
      });
      todoEntity.imageUrl = imageUrl;
    }

    const newTodo = await this.todosRepository.create(todoEntity);
    const tags = await this.tagManagerService.createTagAndLinkToTodo(newTodo.id!, tagEntityList);
    newTodo.tags = tags;

    return newTodo;
  }

  async findManyBy(columnId: number) {
    return await this.todosRepository.findManyBy(columnId);
  }

  async deleteOneBy(id: number) {
    return await this.todosRepository.deleteOneBy(id);
  }
}
