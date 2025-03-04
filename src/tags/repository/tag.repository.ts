import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../../db/db.service';
import { TagRepository } from './tag.provider';
import { Tag, TagEntity } from '../tag.entity';
import { TagMapper } from '../tag.mapper';

@Injectable()
export class TagRepositoryImpl implements TagRepository {
  constructor(private readonly dbService: DBConnectionService) {}

  private async getData(tags: string[]) {
    const query = `
      SELECT id, tag, created_at as createdAt, updated_at as updatedAt
      FROM tags
      WHERE tag IN (${tags.map(() => '?').join(',')})
    `;

    const result = await this.dbService.select<Tag>(query, tags);
    return result;
  }

  async create(tags: Tag[]) {
    // bulk insert
    const query = `
      INSERT IGNORE INTO tags (tag)
      VALUES ${tags.map(() => '(?)').join(',')}
    `;
    const tagValues = tags.map((tag) => tag.tag);
    await this.dbService.mutate(query, tagValues);

    const insertedTag = await this.getData(tags.map((tag) => tag.tag));

    return TagMapper.toEntityList(insertedTag);
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
