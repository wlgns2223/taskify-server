import { Exclude, Expose } from 'class-transformer';
import { BaseDTO } from '../../common/dto';
import { UserDTO } from '../../users/dto/user.dto';
import { Invitation, InvitationStatus } from '../invitations.entity';
import { InternalServerException } from '../../common/exceptions/exceptions';

export interface TInvitationDTO extends Invitation {
  inviter: UserDTO;
}

export class InvitationDto extends BaseDTO implements Required<TInvitationDTO> {
  @Exclude()
  private _inviter: UserDTO;

  @Exclude()
  private _status: InvitationStatus;

  @Exclude()
  private _dashboardId: number;

  @Exclude()
  private _inviteeEmail: string;

  @Exclude()
  private _inviterId: number;

  constructor(invitation: TInvitationDTO) {
    if (!invitation.id || !invitation.createdAt || !invitation.updatedAt) {
      throw InternalServerException('invitationDTO.constructor: invalid invitation entity');
    }
    super({
      id: invitation.id,
      createdAt: invitation.createdAt,
      updatedAt: invitation.updatedAt,
    });
    this._inviter = invitation.inviter;
    this._status = invitation.status;
    this._dashboardId = invitation.dashboardId;
    this._inviteeEmail = invitation.inviteeEmail;
    this._inviterId = invitation.inviterId;
  }

  @Expose()
  get inviter(): UserDTO {
    return this._inviter;
  }

  @Expose()
  get status(): InvitationStatus {
    return this._status;
  }

  @Expose()
  get dashboardId(): number {
    return this._dashboardId;
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
