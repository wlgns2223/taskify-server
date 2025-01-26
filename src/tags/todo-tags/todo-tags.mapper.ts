import { instanceToPlain } from 'class-transformer';
import { TodoTag, TodoTagEntity } from './todo-tags.entity';

export class TodoTagMapper {
  static toEntity(plain: TodoTag) {
    return TodoTagEntity.from<TodoTagEntity, TodoTag>(TodoTagEntity, plain);
  }
}
