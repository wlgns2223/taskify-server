import { IsNotEmpty, IsNumber } from 'class-validator';

export class SwapColumnPositionDto {
  @IsNumber()
  @IsNotEmpty()
  from: number;

  @IsNumber()
  @IsNotEmpty()
  to: number;
}
