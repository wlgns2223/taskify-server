import { Base, BaseEntity } from '../common/entity';

export interface Tag extends Base {
  tag: string;
}

export class TagEntity extends BaseEntity implements Tag {
  private _tag: string;

  constructor(param: Tag) {
    super({ id: param.id, createdAt: param.createdAt, updatedAt: param.updatedAt });
    this._tag = param.tag;
  }

  get tag() {
    return this._tag;
  }
}
