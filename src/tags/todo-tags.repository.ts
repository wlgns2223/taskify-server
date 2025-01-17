import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { TodoTag } from './todo-tags.model';

@Injectable()
export class TodoTagRepository {
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

  async createTodoTag(newTodoTag: TodoTag) {
    const query = `
                INSERT INTO todo_tags (todo_id, tag_id)
                VALUES (?, ?)
            `;
    const result = await this.dbService.insert(query, [newTodoTag.todoId, newTodoTag.tagId]);
    const insertedTodoTag = await this.getData(result.insertId);

    return TodoTag.from(insertedTodoTag[0]);
  }
}
