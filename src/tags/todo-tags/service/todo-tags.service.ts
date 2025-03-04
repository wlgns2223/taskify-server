import { Inject, Injectable } from '@nestjs/common';
import { TodoTag, TodoTagEntity } from '../todo-tags.entity';
import { InvalidInputException } from '../../../common/exceptions/exceptions';
import { TodoTagRepository, TodoTagRepositoryToken } from '../repository';
import { TodoTagService } from './todo-tags.provider';
import { TodoTagMapper } from '../todo-tags.mapper';
import { Tag } from '../../tag.entity';

@Injectable()
export class TodoTagServiceImpl implements TodoTagService {
  constructor(
    @Inject(TodoTagRepositoryToken)
    private readonly todoTagRepository: TodoTagRepository,
  ) {}

  async link(todoId: number, tags: Tag[]) {
    if (!todoId) {
      InvalidInputException('TodoTag must have a todoId and tagId');
    }

    if (tags.length === 0) {
      return {} as any;
    }

    return await this.todoTagRepository.create(todoId, tags);
  }
}
