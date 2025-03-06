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
import { TagService, TagServiceToken } from '../../tags/service';
import { TodoTagService, TodoTagServiceToken } from '../../tags/todo-tags/service';
import { DBConnectionService } from '../../db/db.service';

@Injectable()
export class TodosServiceImpl implements TodosService {
  constructor(
    @Inject(StorageServiceToken)
    private storageService: StorageService<S3Params>,

    @Inject(TodosRepositoryToken)
    private todosRepository: TodosRepository,

    @Inject(TagServiceToken)
    private readonly tagService: TagService,

    @Inject(TodoTagServiceToken)
    private readonly todoTagsService: TodoTagService,

    private dbService: DBConnectionService,

    private authService: AuthService,
  ) {}

  async create(accessToken: string, createTodoDto: CreateTodoDto, imgFile?: Express.Multer.File) {
    const { email } = await this.authService.verify(accessToken, TokenType.ACCESS);
    const { tags, ...rest } = createTodoDto;

    const tagEntityList = TagMapper.toEntityList(tags.map((tag) => ({ tag })));
    const todoEntity = TodoMapper.toEntity(rest);
    if (!!imgFile) {
      const imageUrl = await this.storageService.uploadOne({
        email,
        file: imgFile,
      });
      todoEntity.imageUrl = imageUrl;
    }

    const queries = async () => {
      const newTodo = await this.todosRepository.create(todoEntity);
      const newTags = await this.tagService.create(tagEntityList);
      await this.todoTagsService.link(newTodo.id!, newTags);
      newTodo.tags = newTags;
      return newTodo;
    };

    return await this.dbService.transaction(queries);
  }

  async findManyBy(columnId: number) {
    return await this.todosRepository.findManyBy(columnId);
  }

  async deleteOneBy(id: number) {
    return await this.todosRepository.deleteOneBy(id);
  }
}
