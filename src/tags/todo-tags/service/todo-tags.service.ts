import { Inject, Injectable } from '@nestjs/common';
import { TodoTag } from '../todo-tags.entity';
import { InvalidInputException } from '../../../common/exceptions/exceptions';
import { TodoTagRepository, TodoTagRepositoryToken } from '../repository';
import { TodoTagService } from './todo-tags.provider';
import { TodoTagMapper } from '../todo-tags.mapper';

@Injectable()
export class TodoTagServiceImpl implements TodoTagService {
  constructor(
    @Inject(TodoTagRepositoryToken)
    private readonly todoTagRepository: TodoTagRepository,
  ) {}

  async link(todoId: number, tagId: number) {
    if (!todoId || !tagId) {
      InvalidInputException('TodoTag must have a todoId and tagId');
    }

    let todoTagEntity = await this.todoTagRepository.findOneBy(todoId, tagId);
    if (todoTagEntity) {
      return todoTagEntity;
    }

    todoTagEntity = TodoTagMapper.toEntity({ todoId, tagId });
    return await this.todoTagRepository.create(todoTagEntity);
  }
}
