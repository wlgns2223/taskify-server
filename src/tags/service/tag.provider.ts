import { Provider } from '@nestjs/common';
import { TagServiceImpl } from './tag.service';
import { TagEntity } from '../tag.entity';

export interface TagService {
  create: (tag: string) => Promise<TagEntity>;
}

export const TagServiceToken = Symbol('TagService');

export const TagServiceProvider: Provider<TagService> = {
  provide: TagServiceToken,
  useClass: TagServiceImpl,
};
