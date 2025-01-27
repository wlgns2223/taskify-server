import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../../db/db.service';
import { TagRepository } from './tag.provider';
import { Tag, TagEntity } from '../tag.entity';
import { TagMapper } from '../tag.mapper';

@Injectable()
export class TagRepositoryImpl implements TagRepository {
  constructor(private readonly dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `
      SELECT id, tag, created_at as createdAt, updated_at as updatedAt
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

    return TagMapper.toEntity(insertedTag[0]);
  }

  async findOneBy(tag: string) {
    const query = `
      SELECT id, tag, created_at as createdAt, updated_at as updatedAt
      FROM tags
      WHERE tag = ?
      limit 1
    `;

    const result = await this.dbService.select<Tag>(query, [tag]);
    return result.length > 0 ? TagMapper.toEntity(result[0]) : null;
  }
}
