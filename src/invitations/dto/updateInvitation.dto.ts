import { Invitation, InvitationStatus, InvitationStatusEnum } from '../invitations.entity';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateInvitationDto implements Pick<Invitation, 'status'> {
  @IsNotEmpty()
  @IsEnum(InvitationStatusEnum)
  status: InvitationStatus;
}
