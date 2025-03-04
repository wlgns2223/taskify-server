import { Inject, Injectable } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { TagService, TagServiceToken } from './service';
import { TodoTagService, TodoTagServiceToken } from './todo-tags/service';
import { TagManagerService } from './tag-manager.provider';
import { Tag, TagEntity } from './tag.entity';

@Injectable()
export class TagManagerServiceImpl implements TagManagerService {
  constructor(
    @Inject(TagServiceToken)
    private readonly tagService: TagService,

    @Inject(TodoTagServiceToken)
    private readonly todoTagsService: TodoTagService,
    private dbService: DBConnectionService,
  ) {}

  async createTagAndLinkToTodo(todoId: number, tags: Tag[]) {
    const queries = async () => {
      const newTags = await this.tagService.create(tags);
      await this.todoTagsService.link(todoId, newTags);
      return newTags;
    };

    return await this.dbService.transaction(queries);
  }
}
