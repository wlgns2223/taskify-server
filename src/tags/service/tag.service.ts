import { Inject, Injectable } from '@nestjs/common';
import { InvalidInputException } from '../../common/exceptions/exceptions';
import { Tag } from '../tag.model';
import { TagRepository, TagRepositoryToken } from '../repository';
import { TagService } from './tag.provider';

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

    const existingTag = await this.tagRepository.find(tag);
    if (existingTag) {
      return existingTag;
    }

    const newTag = Tag.from({ tag });

    return await this.tagRepository.create(newTag);
  }
}
