import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Invitation } from '../invitations.model';

export class CreateInvitationDto extends PickType(Invitation, ['dashboardId', 'inviteeEmail', 'inviterId']) {
  @IsString()
  @IsNotEmpty()
  inviteeEmail: string;

  @IsNotEmpty()
  @IsNumber()
  inviterId: number;

  @IsNotEmpty()
  @IsNumber()
  dashboardId: number;
}
