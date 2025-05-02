import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../../db/db.service';
import { TodosRepository } from './todos.provider';
import { TodoMapper } from '../dto/todo.mapper';
import { Todo, TodoEntity } from '../todos.entity';
import { OffsetPaginationRequestDto } from '../../dashboard/dto/offsetPagination.dto';

@Injectable()
export class TodosRepositoryImpl implements TodosRepository {
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `
    SELECT
      td.id, 
      td.assignee_user_id as assigneeUserId,
      td.assigner_user_id as assignerUserId,
      json_object(
        'id', u.id, 
        'email', u.email, 
        'nickname', u.nickname,
        'password', u.password,
        'createdAt',u.created_at,
        'updatedAt',u.updated_at
        ) as assignee,
      td.column_id as columnId,
      td.title, 
      td.content,
      td.due_date as dueDate,
      td.image_url as imageUrl,
      td.position,
      CASE
        WHEN count(t.id) = 0 THEN JSON_ARRAY()
        ELSE JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'tag', t.tag))
      END as tags,
      td.created_at as createdAt, 
      td.updated_at as updatedAt 
    FROM Todos as td
    LEFT JOIN todo_tags as tt on tt.todo_id = td.id
    LEFT JOIN tags as t on t.id = tt.tag_id
    LEFT JOIN users as u on u.id = td.assignee_user_id
    group by td.id
    having td.id = ?
    order by td.position DESC
    `;

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

  async findOneBy(id: number) {
    const query = `
    SELECT
      td.id, 
      td.assignee_user_id as assigneeUserId,
      td.assigner_user_id as assignerUserId,
      json_object(
        'id', u.id, 
        'email', u.email, 
        'nickname', u.nickname,
        'password', u.password,
        'createdAt',u.created_at,
        'updatedAt',u.updated_at
        ) as assignee,
      td.column_id as columnId,
      td.title, 
      td.content,
      td.due_date as dueDate,
      td.image_url as imageUrl,
      td.position,
      CASE
        WHEN count(t.id) = 0 THEN JSON_ARRAY()
        ELSE JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'tag', t.tag))
      END as tags,
      td.created_at as createdAt, 
      td.updated_at as updatedAt 
    FROM Todos as td
    LEFT JOIN todo_tags as tt on tt.todo_id = td.id
    LEFT JOIN tags as t on t.id = tt.tag_id
    LEFT JOIN users as u on u.id = td.assignee_user_id
    group by td.id
    having td.id = ?
    order by td.position DESC
    `;

    const result = await this.dbService.select<Todo>(query, [id]);

    return result.length > 0 ? TodoMapper.toEntity(result[0]) : null;
  }

  async findManyBy(columnId: number) {
    const query = `SELECT
      td.id, 
      td.assignee_user_id as assigneeUserId,
      td.assigner_user_id as assignerUserId,
      json_object(
        'id', u.id, 
        'email', u.email, 
        'nickname', u.nickname,
        'password', u.password,
        'createdAt',u.created_at,
        'updatedAt',u.updated_at
        ) as assignee,
      td.column_id as columnId,
      td.title, 
      td.content,
      td.due_date as dueDate,
      td.image_url as imageUrl,
      td.position,
      CASE
        WHEN count(t.id) = 0 THEN JSON_ARRAY()
        ELSE JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'tag', t.tag))
      END as tags,
      td.created_at as createdAt, 
      td.updated_at as updatedAt 
    FROM Todos as td
    LEFT JOIN todo_tags as tt on tt.todo_id = td.id
    LEFT JOIN tags as t on t.id = tt.tag_id
    LEFT JOIN users as u on u.id = td.assignee_user_id
    group by td.id
    having td.column_id = ?
    order by td.position DESC
    `;

    const result = await this.dbService.select<Todo>(query, [columnId]);

    return TodoMapper.toEntityList(result);
  }

  async findManyWithPagination(offsetPaginationRequest: OffsetPaginationRequestDto, columnId: number) {
    const query = `SELECT
      td.id, 
      td.assignee_user_id as assigneeUserId,
      td.assigner_user_id as assignerUserId,
      json_object(
        'id', u.id, 
        'email', u.email, 
        'nickname', u.nickname,
        'password', u.password,
        'createdAt',u.created_at,
        'updatedAt',u.updated_at
        ) as assignee,
      td.column_id as columnId,
      td.title, 
      td.content,
      td.due_date as dueDate,
      td.image_url as imageUrl,
      td.position,
      CASE
        WHEN count(t.id) = 0 THEN JSON_ARRAY()
        ELSE JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'tag', t.tag))
      END as tags,
      td.created_at as createdAt, 
      td.updated_at as updatedAt 
    FROM Todos as td
    LEFT JOIN todo_tags as tt on tt.todo_id = td.id
    LEFT JOIN tags as t on t.id = tt.tag_id
    LEFT JOIN users as u on u.id = td.assignee_user_id
    group by td.id
    having td.column_id = ?
    order by td.position DESC
    LIMIT ? OFFSET ?
    `;
    const limit = offsetPaginationRequest.pageSize;
    const offset = (offsetPaginationRequest.page - 1) * offsetPaginationRequest.pageSize;
    const param = [columnId, limit, offset].map((v) => v.toString());
    const result = await this.dbService.select<Todo>(query, param);

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

  async countAllBy(columnId: number) {
    const query = `select count(*) as total from todos where column_id = ?`;
    const result = await this.dbService.select<{ total: number }>(query, [columnId]);
    return result[0].total;
  }
}
