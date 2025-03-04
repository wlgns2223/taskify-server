import { Injectable } from '@nestjs/common';
import { TodoTag, TodoTagEntity } from '../todo-tags.entity';
import { DBConnectionService } from '../../../db/db.service';
import { TodoTagRepository } from './todo-tag.provider';
import { TodoTagMapper } from '../todo-tags.mapper';
import { Tag } from '../../tag.entity';

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

  async create(todoId: number, tags: Tag[]) {
    const query = `
                INSERT INTO todo_tags (todo_id, tag_id)
                VALUES ${tags.map(() => '(?, ?)').join(',')}
            `;
    const values = tags.flatMap((tag) => [todoId, tag.id]);
    await this.dbService.mutate(query, values);
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
