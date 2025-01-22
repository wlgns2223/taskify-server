import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../../db/db.service';
import { Tag } from '../tag.model';
import { TagRepository } from './tag.provider';

@Injectable()
export class TagRepositoryImpl implements TagRepository {
  constructor(private readonly dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `
      SELECT id, tag, created_at as createdAt
      FROM tags
      WHERE id = ?
    `;

    const result = await this.dbService.select<Tag>(query, [id]);
    return result;
  }

  async create(newTag: Tag) {
    const query = `
      INSERT INTO tags (tag)
      VALUES (?)
    `;
    const result = await this.dbService.insert(query, [newTag.tag]);
    const insertedTag = await this.getData(result.insertId);

    return Tag.from(insertedTag[0]);
  }

  async find(tag: string) {
    const query = `
      SELECT id, tag, created_at as createdAt
      FROM tags
      WHERE tag = ?
    `;

    const result = await this.dbService.select<Tag>(query, [tag]);
    return result && result.length > 0 ? Tag.from(result[0]) : null;
  }
}
