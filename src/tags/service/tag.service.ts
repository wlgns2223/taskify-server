import { Inject, Injectable } from '@nestjs/common';
import { InvalidInputException } from '../../common/exceptions/exceptions';
import { TagRepository, TagRepositoryToken } from '../repository';
import { TagService } from './tag.provider';
import { TagMapper } from '../tag.mapper';
import { TagEntity } from '../tag.entity';

@Injectable()
export class TagServiceImpl implements TagService {
  constructor(
    @Inject(TagRepositoryToken)
    private readonly tagRepository: TagRepository,
  ) {}

  async create(tag: string) {
    if (!tag || tag.trim() === '') {
      InvalidInputException('Tag must have a tag');
    }
    let tagEntity: TagEntity | null = await this.tagRepository.findOneBy(tag);

    if (tagEntity) {
      return tagEntity;
    }

    tagEntity = TagMapper.toEntity({ tag: tag });
    return await this.tagRepository.create(tagEntity);
  }
}
