import { Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { TodoTagRepository } from './todo-tags.repository';
import { Tag } from './tag.model';
import { TodoTag } from './todo-tags.model';
import { DBConnectionService } from '../db/db.service';
import { InvalidInputException } from '../common/exceptions/exceptions';

@Injectable()
export class TagManagerService {
  constructor(
    private tagRepository: TagRepository,
    private todoTagRepository: TodoTagRepository,
    private dbService: DBConnectionService,
  ) {}

  async createTag(tag: string) {
    if (!tag || tag.trim() === '') {
      InvalidInputException('Tag must have a tag');
    }

    const newTag = Tag.from({ tag });

    return await this.tagRepository.createTag(newTag);
  }

  async linkTodoTag(todoId: number, tagId: number) {
    if (!todoId || !tagId) {
      InvalidInputException('TodoTag must have a todoId and tagId');
    }

    const newTodoTag = TodoTag.from({ todoId, tagId });

    return await this.todoTagRepository.createTodoTag(newTodoTag);
  }

  async createTagAndLink(todoId: number, tag: string) {
    const queries = async () => {
      const newTag = await this.createTag(tag);
      const newTodoTag = await this.linkTodoTag(todoId, newTag.id);

      return { tag: newTag, todoTag: newTodoTag };
    };

    return await this.dbService.transaction(queries);
  }
}
