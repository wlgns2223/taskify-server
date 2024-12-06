import { PickType } from '@nestjs/swagger';
import { Member } from '../members.model';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMemberDto extends PickType(Member, ['dashboardId', 'memberId']) {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  dashboardId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  memberId: number;
}
