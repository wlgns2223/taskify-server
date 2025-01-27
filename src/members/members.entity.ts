import { Base, BaseEntity } from '../common/entity';

export interface Member extends Base {
  dashboardId: number;
  memberId: number;
}

export class MemberEntity extends BaseEntity implements Member {
  private _dashboardId: number;
  private _memberId: number;

  constructor(param: Member) {
    super({
      id: param.id,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
    this._dashboardId = param.dashboardId;
    this._memberId = param.memberId;
  }

  get dashboardId() {
    return this._dashboardId;
  }

  get memberId() {
    return this._memberId;
  }
}
