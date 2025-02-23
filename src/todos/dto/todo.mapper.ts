import { instanceToPlain } from 'class-transformer';
import { Todo, TodoEntity } from '../todos.entity';
import { TodoDTO } from './todo.dto';
import { PlainOf } from '../../common/types';

export class TodoMapper {
  static toDTO(entity: TodoEntity): TodoDTO {
    const todoDTO = TodoDTO.from(TodoDTO, entity);
    return instanceToPlain(todoDTO) as TodoDTO;
  }

  static toDTOList(entities: TodoEntity[]): TodoDTO[] {
    return entities.map((entity) => TodoMapper.toDTO(entity));
  }

  static toEntity(plain: Todo): TodoEntity {
    return TodoEntity.from<TodoEntity, Todo>(TodoEntity, plain);
  }

  static toEntityList(plain: Todo[]): TodoEntity[] {
    return plain.map((todo) => TodoEntity.from<TodoEntity, Todo>(TodoEntity, todo));
  }
}
