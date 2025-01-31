import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column } from '../columns.entity';
import { Type } from 'class-transformer';

export class CreateColumnsDto implements Pick<Column, 'name' | 'dashboardId'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  dashboardId: number;
}
