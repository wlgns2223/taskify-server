import { Provider } from '@nestjs/common';
import { TagManagerServiceImpl } from './tag-manager.service';
import { Tag, TagEntity } from './tag.entity';
import { TodoEntity } from '../todos/todos.entity';

export interface TagManagerService {
  createTagAndLinkToTodo: (todoId: number, tags: Tag[]) => Promise<TagEntity[]>;
}

export const TagManagerServiceToken = Symbol('TagManagerService');

export const TagManagerServiceProvider: Provider<TagManagerService> = {
  provide: TagManagerServiceToken,
  useClass: TagManagerServiceImpl,
};
