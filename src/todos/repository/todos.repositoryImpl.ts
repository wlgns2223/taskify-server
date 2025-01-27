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
        dashboard_id as dashboardId,
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
    insert into todos (assignee_user_id, assigner_user_id, dashboard_id, column_id, title, content, due_date, image_url, position)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await this.dbService.insert(query, [
      newTodo.assigneeUserId,
      newTodo.assignerUserId,
      newTodo.dashboardId,
      newTodo.columnId,
      newTodo.title,
      newTodo.content,
      newTodo.dueDate,
      newTodo.imageUrl,
      newTodo.position,
    ]);
    const insertedTodo = await this.getData(result.insertId);

    return TodoMapper.toEntity(insertedTodo[0]);
  }

  async findManyBy(columnId: string) {
    const query = `SELECT 
        id, 
        assignee_user_id as asigneeUserId,
        assigner_user_id as assignerUserId,
        dashboard_id as dashboardId,
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
}
