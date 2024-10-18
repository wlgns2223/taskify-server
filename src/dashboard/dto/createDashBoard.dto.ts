import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDashBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}
