import { Inject, Injectable } from '@nestjs/common';
import { TodoTag } from '../todo-tags.model';
import { InvalidInputException } from '../../../common/exceptions/exceptions';
import { TodoTagRepository, TodoTagRepositoryToken } from '../repository';
import { TodoTagService } from './todo-tags.provider';

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

    const newTodoTag = TodoTag.from({ todoId, tagId });

    return await this.todoTagRepository.create(newTodoTag);
  }
}
