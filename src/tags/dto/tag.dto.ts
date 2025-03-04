import { Exclude, Expose } from 'class-transformer';
import { BaseDTO } from '../../common/dto';
import { Tag, TagEntity } from '../tag.entity';
import { InternalServerException } from '../../common/exceptions/exceptions';

export class TagDTO extends BaseDTO implements Required<Tag> {
  @Exclude()
  private readonly _tag: string;

  constructor(tag: TagEntity) {
    if (!tag.id || !tag.createdAt || !tag.updatedAt) {
      throw InternalServerException('TagDTO.constructor: invalid tag entity');
    }

    super({
      id: tag.id,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    });
    this._tag = tag.tag;
  }

  @Expose()
  get tag(): string {
    return this._tag;
  }
}
