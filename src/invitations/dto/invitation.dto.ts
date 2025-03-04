import { Exclude, Expose } from 'class-transformer';
import { BaseDTO } from '../../common/dto';
import { UserDTO } from '../../users/dto/user.dto';
import { Invitation, InvitationEntity, InvitationStatus } from '../invitations.entity';
import { InternalServerException } from '../../common/exceptions/exceptions';

export interface TInvitationDTO extends Invitation {}

export class InvitationDto extends BaseDTO implements Required<TInvitationDTO> {
  @Exclude()
  private _status: InvitationStatus;

  @Exclude()
  private _dashboardId: number;

  @Exclude()
  private _inviteeEmail: string;

  @Exclude()
  private _inviterId: number;

  @Exclude()
  private _dashboardTitle: string;

  @Exclude()
  private _inviterNickname: string;

  constructor(invitation: InvitationEntity) {
    if (!invitation.id || !invitation.createdAt || !invitation.updatedAt) {
      throw InternalServerException('invitationDTO.constructor: invalid invitation entity');
    }
    super({
      id: invitation.id,
      createdAt: invitation.createdAt,
      updatedAt: invitation.updatedAt,
    });

    this._status = invitation.status;
    this._dashboardId = invitation.dashboardId;
    this._inviteeEmail = invitation.inviteeEmail;
    this._inviterId = invitation.inviterId;
    this._dashboardTitle = invitation.dashboardTitle;
    this._inviterNickname = invitation.inviterNickname;
  }

  @Expose()
  get status(): InvitationStatus {
    return this._status;
  }

  @Expose()
  get dashboardId(): number {
    return this._dashboardId;
  }

  @Expose()
  get dashboardTitle(): string {
    return this._dashboardTitle;
  }

  @Expose()
  get inviterNickname(): string {
    return this._inviterNickname;
  }

  @Exclude()
  get inviteeEmail(): string {
    return this._inviteeEmail;
  }

  @Exclude()
  get inviterId(): number {
    return this._inviterId;
  }
}
