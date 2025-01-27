import { instanceToPlain } from 'class-transformer';
import { Todo, TodoEntity } from '../todos.entity';
import { TodoDTO } from './todo.dto';
import { PlainOf } from '../../common/types';

export class TodoMapper {
  static toDTO(entity: TodoEntity): PlainOf<TodoDTO> {
    const todoDTO = TodoDTO.from(entity);
    return instanceToPlain(todoDTO) as PlainOf<TodoDTO>;
  }

  static toDTOArray(entities: TodoEntity[]): PlainOf<TodoDTO>[] {
    return entities.map((entity) => TodoMapper.toDTO(entity));
  }

  static toEntity(plain: Todo): TodoEntity {
    return TodoEntity.from<TodoEntity, Todo>(TodoEntity, plain);
  }

  static toEntityList(plain: Todo[]): TodoEntity[] {
    return plain.map((todo) => TodoEntity.from<TodoEntity, Todo>(TodoEntity, todo));
  }
}
