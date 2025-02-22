import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../../db/db.service';
import { TodosRepository } from './todos.provider';
import { TodoMapper } from '../dto/todo.mapper';
import { PlainOf } from '../../common/types';
import { Todo, TodoEntity } from '../todos.entity';

@Injectable()
export class TodosRepositoryImpl implements TodosRepository {
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `SELECT 
        id, 
        assignee_user_id as asigneeUserId,
        assigner_user_id as assignerUserId,
        column_id as columnId,
        title, 
        content,
        due_date as dueDate,
        image_url as imageUrl,
        position,
        created_at as createdAt, 
        updated_at as updatedAt 
        FROM todos 
        WHERE id = ?`;

    const result = await this.dbService.select<Todo>(query, [id]);
    return result;
  }

  async create(newTodo: Todo): Promise<TodoEntity> {
    const query = `
    insert into todos (assignee_user_id, assigner_user_id, column_id, title, content, due_date, image_url)
    values (?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await this.dbService.mutate(query, [
      newTodo.assigneeUserId,
      newTodo.assignerUserId,
      newTodo.columnId,
      newTodo.title,
      newTodo.content,
      newTodo.dueDate,
      newTodo.imageUrl,
    ]);
    const insertedTodo = await this.getData(result.insertId);

    return TodoMapper.toEntity(insertedTodo[0]);
  }

  async findManyBy(columnId: number) {
    const query = `SELECT 
        id, 
        assignee_user_id as asigneeUserId,
        assigner_user_id as assignerUserId,
        column_id as columnId,
        title, 
        content,
        due_date as dueDate,
        image_url as imageUrl,
        position,
        created_at as createdAt, 
        updated_at as updatedAt 
        FROM todos 
        WHERE column_id = ?`;

    const result = await this.dbService.select<Todo>(query, [columnId]);

    return TodoMapper.toEntityList(result);
  }

  async deleteOneBy(id: number) {
    const todo = await this.getData(id);
    const quries = async () => {
      const query = `DELETE FROM todos WHERE id = ?`;
      await this.dbService.mutate(query, [id]);
      await this.reorderPosition(todo[0].columnId, todo[0].position!);
    };
    await this.dbService.transaction(quries);

    return TodoMapper.toEntity(todo[0]);
  }

  private async reorderPosition(columnId: number, position: number) {
    const query = `UPDATE todos
    SET position = position - 1
    WHERE column_id = ? AND position > ?`;
    await this.dbService.mutate(query, [columnId, position]);
  }
}
