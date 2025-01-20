import { Inject, Injectable } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { TagService, TagServiceToken } from './service';
import { TodoTagService } from './todo-tags/service';

@Injectable()
export class TagManagerService {
  constructor(
    @Inject(TagServiceToken)
    private readonly tagService: TagService,
    private readonly todoTagsService: TodoTagService,
    private dbService: DBConnectionService,
  ) {}

  async createTagAndLink(todoId: number, tag: string) {
    const queries = async () => {
      const newTag = await this.tagService.create(tag);
      const newTodoTag = await this.todoTagsService.link(todoId, newTag.id);

      return { tag: newTag, todoTag: newTodoTag };
    };

    return await this.dbService.transaction(queries);
  }
}
