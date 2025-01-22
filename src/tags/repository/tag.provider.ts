import { Provider } from '@nestjs/common';
import { Tag } from '../tag.model';
import { TagRepositoryImpl } from './tag.repository';

export interface TagRepository {
  create: (tag: Tag) => Promise<Tag>;
  find: (tag: string) => Promise<Tag | null>;
}

export const TagRepositoryToken = Symbol('TagRepository');

export const TagRepositoryProvider: Provider<TagRepository> = {
  provide: TagRepositoryToken,
  useClass: TagRepositoryImpl,
};
