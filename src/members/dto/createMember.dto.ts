import { Member } from '../members.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Base } from '../../common/entity';

export class CreateMemberDto implements Omit<Member, keyof Base> {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  dashboardId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  memberId: number;

  @IsNotEmpty()
  @IsString()
  nickname: string;
}
