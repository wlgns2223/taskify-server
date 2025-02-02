import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Invitation, InvitationStatus, InvitationStatusEnum } from '../invitations.entity';
import { Base } from '../../common/entity';
import { Transform, Type } from 'class-transformer';

export class CreateInvitationDto implements Omit<Invitation, keyof Base> {
  @IsEmail()
  @IsNotEmpty()
  inviteeEmail: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  inviterId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  dashboardId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @Transform(({ value }) => value ?? InvitationStatusEnum.PENDING)
  status: InvitationStatus = InvitationStatusEnum.PENDING;
}
