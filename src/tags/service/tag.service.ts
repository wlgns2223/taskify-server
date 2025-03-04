import { Inject, Injectable } from '@nestjs/common';
import { TagRepository, TagRepositoryToken } from '../repository';
import { TagService } from './tag.provider';
import { Tag, TagEntity } from '../tag.entity';

@Injectable()
export class TagServiceImpl implements TagService {
  constructor(
    @Inject(TagRepositoryToken)
    private readonly tagRepository: TagRepository,
  ) {}

  async create(tags: Tag[]): Promise<TagEntity[]> {
    return await this.tagRepository.create(tags);
  }
}
