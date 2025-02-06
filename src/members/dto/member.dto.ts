import { Exclude, Expose } from 'class-transformer';
import { BaseDTO } from '../../common/dto';
import { InternalServerException } from '../../common/exceptions/exceptions';
import { Member } from '../members.entity';

export class MemberDTO extends BaseDTO implements Required<Member> {
  @Exclude()
  private readonly _dashboardId: number;

  @Exclude()
  private readonly _memberId: number;

  constructor(member: Member) {
    if (!member.id || !member.createdAt || !member.updatedAt) {
      throw InternalServerException('MemberDTO.constructor: invalid member entity');
    }
    super({
      id: member.id,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
    });
    this._dashboardId = member.dashboardId;
    this._memberId = member.memberId;
  }

  @Expose()
  get dashboardId(): number {
    return this._dashboardId;
  }

  @Expose()
  get memberId(): number {
    return this._memberId;
  }
}
