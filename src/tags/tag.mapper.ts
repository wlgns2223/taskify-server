import { instanceToPlain } from 'class-transformer';
import { TagDTO } from './dto/tag.dto';
import { Tag, TagEntity } from './tag.entity';

export class TagMapper {
  static toEntity(tag: Tag) {
    return TagEntity.from<TagEntity, Tag>(TagEntity, tag);
  }

  static toEntityList(tags: Tag[]) {
    return tags.map((tag) => TagEntity.from<TagEntity, Tag>(TagEntity, tag));
  }

  static toDTO(tag: TagEntity) {
    const tagDTO = TagDTO.from(TagDTO, tag);
    return instanceToPlain(tagDTO) as TagDTO;
  }

  static toDTOList(tags: TagEntity[]) {
    return tags.map((tag) => TagMapper.toDTO(tag));
  }
}
