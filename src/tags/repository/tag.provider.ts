import { Provider } from '@nestjs/common';
import { TagRepositoryImpl } from './tag.repository';
import { Tag, TagEntity } from '../tag.entity';

export interface TagRepository {
  create: (tags: Tag[]) => Promise<TagEntity[]>;
  findOneBy: (tag: string) => Promise<TagEntity | null>;
}

export const TagRepositoryToken = Symbol('TagRepository');

export const TagRepositoryProvider: Provider<TagRepository> = {
  provide: TagRepositoryToken,
  useClass: TagRepositoryImpl,
};
