import { Inject, Injectable } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { TagService, TagServiceToken } from './service';
import { TodoTagService, TodoTagServiceToken } from './todo-tags/service';
import { TagManagerService } from './tag-manager.provider';

@Injectable()
export class TagManagerServiceImpl implements TagManagerService {
  constructor(
    @Inject(TagServiceToken)
    private readonly tagService: TagService,

    @Inject(TodoTagServiceToken)
    private readonly todoTagsService: TodoTagService,
    private dbService: DBConnectionService,
  ) {}

  async createTagAndLinkToTodo(todoId: number, tag: string) {
    const queries = async () => {
      const newTag = await this.tagService.create(tag);
      const newTodoTag = await this.todoTagsService.link(todoId, newTag.id);

      return { tag: newTag, todoTag: newTodoTag };
    };

    return await this.dbService.transaction(queries);
  }
}
