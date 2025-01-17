import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { Tag } from './tag.model';

@Injectable()
export class TagRepository {
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `
      SELECT id, tag, created_at as createdAt
      FROM tags
      WHERE id = ?
    `;

    const result = await this.dbService.select<Tag>(query, [id]);
    return result;
  }

  async createTag(newTag: Tag) {
    const query = `
      INSERT INTO tags (tag)
      VALUES (?)
    `;
    const result = await this.dbService.insert(query, [newTag.tag]);
    const insertedTag = await this.getData(result.insertId);

    return Tag.from(insertedTag[0]);
  }
}
