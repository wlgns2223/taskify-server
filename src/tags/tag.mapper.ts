import { Tag, TagEntity } from './tag.entity';

export class TagMapper {
  static toEntity(tag: Tag) {
    return TagEntity.from<TagEntity, Tag>(TagEntity, tag);
  }
}
