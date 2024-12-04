export type InvitationStatus = 'pending' | 'accepted' | 'declined';
export enum InvitationStatusEnum {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export class Invitation {
  private _id: number;
  private _inviteeEmail: string | null;
  private _inviterId: number;
  private _dashboardId: number;
  private _status: InvitationStatus;
  private _createdAt: string;
  private _updatedAt: string;

  constructor(param: {
    inviterId: number;
    dashboardId: number;
    inviteeEmail: string;
    inviteeId?: number;
    status?: InvitationStatus;
    id?: number;
    createdAt?: string;
    updatedAt?: string;
  }) {
    this._id = param.id;
    this._inviteeEmail = param.inviteeEmail;
    this._inviterId = param.inviterId;
    this._dashboardId = param.dashboardId;
    this._status = param.status ?? 'pending';
    this._createdAt = param.createdAt;
    this._updatedAt = param.updatedAt;
  }

  get id() {
    return this._id;
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

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set status(status: InvitationStatus) {
    this._status = status;
  }

  set updatedAt(updatedAt: string) {
    this._updatedAt = updatedAt;
  }

  set inviteeEmail(inviteeEmail: string) {
    this._inviteeEmail = inviteeEmail;
  }

  set id(id: number) {
    this._id = id;
  }

  set createdAt(createdAt: string) {
    this._createdAt = createdAt;
  }

  set dashboardId(dashboardId: number) {
    this._dashboardId = dashboardId;
  }

  set inviterId(inviterId: number) {
    this._inviterId = inviterId;
  }

  toJson() {
    return {
      id: this._id,
      inviteeEmail: this._inviteeEmail,
      inviterId: this._inviterId,
      dashboardId: this._dashboardId,
      status: this._status,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
