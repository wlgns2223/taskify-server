import { Injectable } from '@nestjs/common';
import { TodoTag, TodoTagEntity } from '../todo-tags.entity';
import { DBConnectionService } from '../../../db/db.service';
import { TodoTagRepository } from './todo-tag.provider';
import { TodoTagMapper } from '../todo-tags.mapper';

@Injectable()
export class TodoTagRepositoryImpl implements TodoTagRepository {
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `
            SELECT id, todo_id as todoId, tag_id as tagId
            FROM todo_tags
            WHERE id = ?
        `;

    const result = await this.dbService.select<TodoTag>(query, [id]);
    return result;
  }

  async create(newTodoTag: TodoTag) {
    const query = `
                INSERT INTO todo_tags (todo_id, tag_id)
                VALUES (?, ?)
            `;
    const result = await this.dbService.mutate(query, [newTodoTag.todoId, newTodoTag.tagId]);
    const insertedTodoTag = await this.getData(result.insertId);

    return TodoTagMapper.toEntity(insertedTodoTag[0]);
  }

  async findOneBy(todoId: number, tagId: number) {
    const query = `
            SELECT id, todo_id as todoId, tag_id as tagId
            FROM todo_tags
            WHERE todo_id = ? AND tag_id = ?
            limit 1
        `;

    const result = await this.dbService.select<TodoTag>(query, [todoId, tagId]);
    return result.length !== 0 ? TodoTagMapper.toEntity(result[0]) : null;
  }
}
