import { Provider } from '@nestjs/common';
import { Tag } from '../tag.model';
import { TagServiceImpl } from './tag.service';

export interface TagService {
  create: (tag: string) => Promise<Tag>;
}

export const TagServiceToken = Symbol('TagService');

export const TagServiceProvider: Provider<TagService> = {
  provide: TagServiceToken,
  useClass: TagServiceImpl,
};
