import { PickType } from '@nestjs/swagger';
import { Invitation, InvitationStatus, InvitationStatusEnum } from '../invitations.model';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateInvitationDto extends PickType(Invitation, ['status']) {
  @IsNotEmpty()
  @IsEnum(InvitationStatusEnum)
  status: InvitationStatus;
}
