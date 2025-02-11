import { Base, BaseEntity } from '../common/entity';

export type InvitationStatus = 'pending' | 'accepted' | 'declined';
export enum InvitationStatusEnum {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export interface Invitation extends Base {
  inviteeEmail: string;
  inviterId: number;
  dashboardId: number;
  status: InvitationStatus;
  dashboardTitle: string;
  inviterNickname: string;
}

export class InvitationEntity extends BaseEntity implements Invitation {
  private _inviteeEmail: string;
  private _inviterId: number;
  private _dashboardId: number;
  private _status: InvitationStatus;
  private _dashboardTitle: string;
  private _inviterNickname: string;

  constructor(param: Invitation) {
    super({
      id: param.id,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
    this._inviteeEmail = param.inviteeEmail;
    this._inviterId = param.inviterId;
    this._dashboardId = param.dashboardId;
    this._status = param.status;
    this._dashboardTitle = param.dashboardTitle;
    this._inviterNickname = param.inviterNickname;
  }

  get inviteeEmail() {
    return this._inviteeEmail;
  }

  get inviterId() {
    return this._inviterId;
  }

  get dashboardId() {
    return this._dashboardId;
  }

  get status() {
    return this._status;
  }

  get dashboardTitle() {
    return this._dashboardTitle;
  }

  get inviterNickname() {
    return this._inviterNickname;
  }
}
