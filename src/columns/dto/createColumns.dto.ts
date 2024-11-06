import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateColumnsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  position: number;

  @IsNumber()
  @IsNotEmpty()
  dashboardId: number;
}
